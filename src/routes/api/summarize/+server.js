import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { shared } from '$lib/state.svelte.js';
// import { getSubtitles } from 'youtube-captions-scraper';
// import { getCaptions } from '@dofy/youtube-caption-fox';
import OpenAI from 'openai';

async function getFrames(videoId, interval) {
	try {
		const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

		const response = await fetch(`${env.BACKEND_URL}/frames`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				url: youtubeUrl,

				interval: interval
			})
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch frames: ${response.statusText}`);
		}

		const data = await response.json();
		return data.output || [];
	} catch (error) {
		console.error('Error fetching frames:', error);
		throw error;
	}
}

async function getCaptions(videoId, transcribe = false) {
	try {
		const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

		const response = await fetch(`${env.BACKEND_URL}/${transcribe ? 'transcribe' : 'captions'}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				url: youtubeUrl
			})
		});

		if (!response.ok) {
			console.error('Failed to fetch captions:', response.statusText);
			return '';
		}

		const data = await response.json();
		let captions = data.output || '';
		if (!captions) {
			console.error('No captions found in the response');
			return '';
		}
		return captions;
	} catch (error) {
		console.error('Error fetching captions:', error);
		throw error;
	}
}

export async function POST({ request, fetch }) {
	let {
		url,
		segments,
		length,
		type,
		points,
		transcribe,
		title,
		description,
		model = shared.model,
		screenshot = false,
		duration = 1800
	} = await request.json();
	let summary = '';

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
		const timerLabel = `FUNCTION summarize() - ${Date.now()}`;
		console.time(timerLabel); // START TIMER
		const videoIdMatch = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		);

		if (!videoIdMatch || !videoIdMatch[1]) {
			return json({ error: 'Invalid YouTube URL' }, { status: 400 });
		}

		const videoId = videoIdMatch[1];
		const captions = await getCaptions(videoId, transcribe);

		let finalFrames = [];

		if (screenshot) {
			const interval = Math.floor(duration / segments);
			console.log(`Fetching frames for video ${videoId} with interval ${interval} seconds`);
			const frames = await getFrames(videoId, interval);

			const base64Frames = frames
				.map((frame) => {
					if (frame) {
						return `data:image/jpeg;base64,${frame}`;
					}
					return null;
				})
				.filter((frame) => frame !== null);

			finalFrames = base64Frames.map((base64String) => ({
				type: 'image_url',
				image_url: {
					url: base64String
				}
			}));
		}

		const isOpenAI = shared.provider === 'openai';
		const openai = new OpenAI({
			apiKey: isOpenAI ? env.OPENAI_API_KEY : env.GEMINI_API_KEY,
			baseURL: isOpenAI
				? 'https://api.openai.com/v1/'
				: 'https://generativelanguage.googleapis.com/v1beta/openai/'
		});

		// https://mdsvex-math-starter.vercel.app/ TO-DO: Add support for math rendering in summaries

		const systemPrompt = `
			You are an expert content analyzer specialized in creating concise, informative summaries and/or notes of YouTube videos.
			You excel at identifying key points and presenting them in a structured, readable format while maintaining the original tone and intent of the content.`;

		let prompt = `
			Please summarize the following YouTube video (type: ${type}).
			Title: ${title}\n
			Description: ${description}\n
			${points.length > 0 ? `The user asked for these points to be included as well: ${points.join(', ')}` : ''}
			Summary guidelines:
				- Create a summary of approximately ${outputLength} words
				- Structure the content with clear sections and headings
				- Use bullet points for key takeaways and important facts
				- Adapt your tone based on content type:
					* For academic videos: Use technical language, include important concepts, and ALWAYS use proper LaTeX formatting for ALL mathematical expressions. Format inline math with single dollar signs ($x$) and display math with double dollar signs ($$x$$). Examples: $\sigma_i$, $A^T$, $\lambda_1$, etc.
					* For news videos: Use a neutral tone, focus on main events, and include relevant statistics or quotes
					* For academic/educational videos, you need to make notes as opposed to a summary, so include all important concepts, definitions, and explanations
					* For programming videos: Use technical language, include important concepts, and use \`\`\` formatting for code snippets, and provide relevant examples and code blocks
					* For entertainment videos: Focus on main storyline and highlights in a more casual tone
				- Be objective and focus on the most important information from the video
				- Include specific details that are central to understanding the content
				- Don't refer to the video as "this video" or "the video" or "the transcript", just talk about it as if you are the one explaining it
				- IMPORTANT: For mathematical content, ensure ALL variables, equations, and mathematical symbols are properly wrapped in LaTeX delimiters, like \`$x$\`. Never use plain text for mathematical notation
				- ONLY GIVE THE SUMMARY, DO NOT INCLUDE ANY OTHER TEXT, don't say "Here is the summary" or anything like that.

			I might have also attached some screenshots from the video to help you understand the content better. If you see any images, please use them to enhance your summary.

			Here is the transcript/captions:
			${captions}`;

		console.log(`Using model: ${model}`);

		const content = [{ type: 'text', text: prompt }];

		if (screenshot) {
			content.push(...finalFrames);
		}

		const response = await openai.chat.completions.create({
			// model: "gemini-2.5-flash-preview-05-20",
			// model: "gemini-2.0-flash",
			// model: "gemini-2.0-flash-lite",
			model: model,
			messages: [
				{ role: 'system', content: systemPrompt },
				{
					role: 'user',
					content: content
				}
			]
		});

		summary = response.choices[0].message.content;
		console.timeEnd(timerLabel); // END TIMER & LOG DURATION
		return json({ summary, captions });
	} catch (error) {
		console.error('Error processing YouTube video:', error);
		return json({ error: 'Failed to process video', details: error.message }, { status: 500 });
	}
}
