import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function POST({ request, fetch }) {

	let { url } = await request.json();
    try {

		const videoIdMatch = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		);

		if (!videoIdMatch || !videoIdMatch[1]) {
			return json({ error: 'Invalid YouTube URL' }, { status: 400 });
		}

		const videoId = videoIdMatch[1];
		const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const response = await fetch(`${env.BACKEND_URL}/info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: youtubeUrl
            })
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch info: ${response.statusText}`);
        }

        const data = await response.json();
        return json({ data });
    } catch (error) {
        console.error('Error:', error);
        return json({ error: 'Failed to fetch info' }, { status: 500 });
    }
}
