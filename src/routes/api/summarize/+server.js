import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { getSubtitles } from "youtube-captions-scraper";
import OpenAI from "openai";

async function getVideoDetails(videoId) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${env.YOUTUBE_API_KEY}&part=snippet`
    );
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const { title, description } = data.items[0].snippet;
      return { title, description };
    }

    return { title: "", description: "" };
  } catch (error) {
    console.error("Error fetching video details:", error);
    return { title: "", description: "" };
  }
}

export async function POST({ request, locals: { supabase } }) {
  let { url, segments, length, type, points } = await request.json();
  let summary = "";

  let outputLength = "250";

  switch (length) {
    case "short":
      outputLength = "100 - 200";
      break;
    case "medium":
      outputLength = "250 - 350";
      break;
    case "long":
      outputLength = "400 - 600";
      break;
    default:
      outputLength = "300";
      break;
  }

  try {

		const { data: { user } } = await supabase.auth.getUser()

    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    if (!videoIdMatch || !videoIdMatch[1]) {
      return json({ error: "Invalid YouTube URL" }, { status: 400 });
    }

    const videoId = videoIdMatch[1];
    // const { title, description } = await getVideoDetails(videoId);

    const captions = await getSubtitles({
      videoID: videoId,
      lang: "en",
    });

    const allText = captions.map((entry) => entry.text.replace("\n", " ")).join(" ");

    const openai = new OpenAI({
      apiKey: env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    const systemPrompt = `
		You are an expert content analyzer specialized in creating concise, informative summaries of YouTube videos. 
		You excel at identifying key points and presenting them in a structured, readable format while maintaining the original tone and intent of the content.`;

    let prompt = `
            Please summarize the following YouTube video (type: ${type}).
            ${points.length > 0 ? `The user asked for these points to be included as well: ${points.join(", ")}` : ""}
            Summary guidelines:
            - Create a summary of approximately ${outputLength} words
            - Structure the content with clear sections and headings
            - Use bullet points for key takeaways and important facts
            - Adapt your tone based on content type:
              * For academic videos: Use technical language, include important concepts, and use LaTeX formatting for mathematical expressions if needed
              * For programming videos: Use technical language, include important concepts, and use \`\`\` formatting for code snippets, and provide relevant examples and code blocks
              * For entertainment videos: Focus on main storyline and highlights in a more casual tone
            - Be objective and focus on the most important information from the video
            - Include specific details that are central to understanding the content
            - Don't refer to the video as "this video" or "the video" or "the transcript", just talk about it as if you are the one explaining it
			      - ONLY GIVE THE SUMMARY, DO NOT INCLUDE ANY OTHER TEXT, don't say "Here is the summary" or anything like that.

            Here is the transcript:
            ${allText}`;

    const response = await openai.chat.completions.create({
      // model: "gemini-2.5-flash-preview-04-17",
      // model: "gemini-2.0-flash",
      model: user ? "gemini-2.0-flash" : "gemini-2.0-flash-lite",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    });

    summary = response.choices[0].message.content;

    // Return all data including title and description
    return json({ summary, allText });
  } catch (error) {
    console.error("Error processing YouTube video:", error);
    return json({ error: "Failed to process video", details: error.message }, { status: 500 });
  }
}
