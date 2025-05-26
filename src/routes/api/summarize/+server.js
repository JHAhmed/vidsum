import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { getSubtitles } from 'youtube-captions-scraper';
import { getCaptions } from '@dofy/youtube-caption-fox';
import { dev } from '$app/environment';

import OpenAI from 'openai';

async function getSubtitlesYCF({ videoId, lang = 'en' }) {
	// Removed default videoId to ensure it's passed
	if (!videoId) {
		throw new Error('Video ID is required for getSubtitlesYCF');
	}

	let fetchedCaptionsData;
	try {
		fetchedCaptionsData = await getCaptions(videoId); // Directly await the result
	} catch (error) {
		console.error('Error fetching captions with @dofy/youtube-caption-fox:', error);
		throw new Error(`Failed to fetch captions for video ID ${videoId}: ${error.message}`);
	}

	const captionsList = fetchedCaptionsData.captions; // Access the captions array from the resolved object

	if (!captionsList || captionsList.length === 0) {
		throw new Error('No captions found for the provided video ID');
	}

	let allText = '';
	captionsList.forEach((entry) => {
		if (entry.text) {
			allText = allText ? `${allText} \n ${entry.text}` : entry.text;
		}
	});

	return allText; // Return the concatenated text string
}

async function getSubtitlesYCS({ videoId, lang = 'en' }) {
	// Removed default videoId to ensure it's passed
	if (!videoId) {
		throw new Error('Video ID is required for getSubtitlesYCS');
	}

	let fetchedCaptionsData;
	try {
		fetchedCaptionsData = await getSubtitles({
			videoId: videoId
		});
	} catch (error) {
		console.error('Error fetching captions with @dofy/youtube-caption-fox:', error);
		throw new Error(`Failed to fetch captions for video ID ${videoId}: ${error.message}`);
	}

	const captionsList = fetchedCaptionsData.captions; // Access the captions array from the resolved object

	if (!captionsList || captionsList.length === 0) {
		throw new Error('No captions found for the provided video ID');
	}

	let allText = '';
	captionsList.forEach((entry) => {
		if (entry.text) {
			allText = allText ? `${allText} \n ${entry.text}` : entry.text;
		}
	});

	return allText; // Return the concatenated text string
}

export async function POST({ request, fetch, locals: { supabase } }) {
	let { url, segments, length, type, points } = await request.json();
	let summary = '';

	const isOpenAI = false;

	let outputLength = '250';

	switch (length) {
		case 'short':
			outputLength = '100 - 200';
			break;
		case 'medium':
			outputLength = '250 - 350';
			break;
		case 'long':
			outputLength = '400 - 600';
			break;
		default:
			outputLength = '300';
			break;
	}

	try {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		const videoIdMatch = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		);

		if (!videoIdMatch || !videoIdMatch[1]) {
			return json({ error: 'Invalid YouTube URL' }, { status: 400 });
		}

		const videoId = videoIdMatch[1];
		const captions = await getSubtitlesYCF({ videoId: videoId });

		// const allText = await captions.map((entry) => entry.text.replace('\n', ' ')).join(' ');

		const openai = new OpenAI({
			apiKey: isOpenAI ? env.OPENAI_API_KEY : env.GEMINI_API_KEY,
			baseURL: isOpenAI ? 'https://api.openai.com/v1/' : 'https://generativelanguage.googleapis.com/v1beta/openai/'
		});

		// * For academic videos: Use technical language, include important concepts, and use LaTeX formatting (which will be rendered using \`katex\` and \`marked-katex-extension\`) for mathematical expressions if needed

		// https://mdsvex-math-starter.vercel.app/ TO-DO: Add support for math rendering in summaries

		const systemPrompt = `
			You are an expert content analyzer specialized in creating concise, informative summaries of YouTube videos.
			You excel at identifying key points and presenting them in a structured, readable format while maintaining the original tone and intent of the content.`;

		let prompt = `
			Please summarize the following YouTube video (type: ${type}).
			${points.length > 0 ? `The user asked for these points to be included as well: ${points.join(', ')}` : ''}
			Summary guidelines:
				- Create a summary of approximately ${outputLength} words
				- Structure the content with clear sections and headings
				- Use bullet points for key takeaways and important facts
				- Adapt your tone based on content type:
					* For academic videos: Use technical language, include important concepts, and ALWAYS use proper LaTeX formatting for ALL mathematical expressions. Format inline math with single dollar signs ($x$) and display math with double dollar signs ($$x$$). Examples: $\sigma_i$, $A^T$, $\lambda_1$, etc.
					* For programming videos: Use technical language, include important concepts, and use \`\`\` formatting for code snippets, and provide relevant examples and code blocks
					* For entertainment videos: Focus on main storyline and highlights in a more casual tone
				- Be objective and focus on the most important information from the video
				- Include specific details that are central to understanding the content
				- Don't refer to the video as "this video" or "the video" or "the transcript", just talk about it as if you are the one explaining it
				- IMPORTANT: For mathematical content, ensure ALL variables, equations, and mathematical symbols are properly wrapped in LaTeX delimiters, like \`$x$\`. Never use plain text for mathematical notation
				- ONLY GIVE THE SUMMARY, DO NOT INCLUDE ANY OTHER TEXT, don't say "Here is the summary" or anything like that.

			Here is the transcript:
			${captions}`;

		const model = isOpenAI ? (user ? 'gpt-4.1-mini' : 'gpt-4.1-nano') : 'gemini-2.0-flash-lite';
		console.log(`Using model: ${model}`);
		const response = await openai.chat.completions.create({
			// model: "gemini-2.5-flash-preview-05-20",
			// model: "gemini-2.0-flash",
			// model: "gemini-2.0-flash-lite",
			model: model,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: prompt }
			]
		});

		summary = response.choices[0].message.content;
		return json({ summary, captions });
	} catch (error) {
		console.error('Error processing YouTube video:', error);
		return json({ error: 'Failed to process video', details: error.message }, { status: 500 });
	}
}
