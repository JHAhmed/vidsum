import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { getSubtitles } from 'youtube-captions-scraper';
import OpenAI from 'openai';

export async function POST({ request }) {
	let { url, segments, length, type } = await request.json();
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
		const videoIdMatch = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		);

		if (!videoIdMatch || !videoIdMatch[1]) {
			return json({ error: 'Invalid YouTube URL' }, { status: 400 });
		}

		const videoId = videoIdMatch[1];

		// Fetch English captions
		const captions = await getSubtitles({
			videoID: videoId,
			lang: 'en'
		});

		// Extract text and join into a single string
		const allText = captions.map((entry) => entry.text.replace('\n', ' ')).join(' ');

		const openai = new OpenAI({
			apiKey: env.GEMINI_API_KEY,
			baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/'
		});

		// let prompt = `
		// 		Summarize the following YouTube transcript.
		// 		The output summary needs to be about ${outputLength} words long. 
		// 		Don't give me any extra text, just give me the summary. Here is the transcript:
		// 		${allText}`;

		let prompt = `
				Summarize the following YouTube transcript. The type of the video is ${type}.
				The output summary needs to be about ${outputLength} words long. 
				If the video is of type 'academic', please provide a summary that is more technical and detailed, use LaTeX formatting if required.
				If the video is of type 'entertainment', please provide a summary that is more casual.

				You don't need to be funny or entertaining, just provide a summary of the content objectively.
				Break the summary into sections if possible, and use bullet points to highlight key points, especially if it's important or educational.
				Please make sure to include the most important points and details.
				Don't give me any extra text, just give me the summary. Here is the transcript:
				${allText}`;

		const response = await openai.chat.completions.create({
			model: 'gemini-2.0-flash',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{
					role: 'user',
					content: prompt
				}
			]
		});

		summary = response.choices[0].message.content;

		return json({ summary });
	} catch (error) {
		console.error('Error fetching YouTube transcript:', error);
		return json({ error: 'Failed to fetch transcript' }, { status: 500 });
	}
}
