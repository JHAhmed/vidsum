// +server.js
import { JSDOM } from 'jsdom';

export async function POST({ request }) {
	try {
		const { videoId } = await request.json();

		if (!videoId) {
			return new Response(JSON.stringify({ error: 'Video ID is required' }), {
				status: 400,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
		const response = await fetch(videoUrl);
		const html = await response.text();

		const dom = new JSDOM(html);
		const document = dom.window.document;

		// Extract title
		const title = document.querySelector('meta[name="title"]')?.content || '';

		// Extract description
		const description = document.querySelector('meta[name="description"]')?.content || '';

		// Extract captions URL
		const captionsUrlMatch = html.match(/https:\/\/www\.youtube\.com\/api\/timedtext\?([^"]+)/);

		if (!captionsUrlMatch) {
			return new Response(JSON.stringify({ error: 'Captions not found' }), {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}

		const captionsUrl = decodeURIComponent(captionsUrlMatch[0]);

		// Fetch captions
		const captionsResponse = await fetch(captionsUrl);
		const captionsXml = await captionsResponse.text();

		// Parse captions XML
		const captionsDom = new JSDOM(captionsXml, { contentType: 'text/xml' });
		const captionsDocument = captionsDom.window.document;
		const captions = Array.from(captionsDocument.querySelectorAll('text'))
			.map((text) => text.textContent)
			.join(' ');

		return new Response(
			JSON.stringify({
				title,
				description,
				captions
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}   
		);
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
