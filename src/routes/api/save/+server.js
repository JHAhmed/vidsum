import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	let { title, content, url, transcript } = await request.json();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from(env.SUPABASE_TABLE_NAME)
			.insert([{ title: title, content: content, url: url, transcript: transcript }])
			.select()
			.single();

		if (supabaseError) {
			console.error('Supabase insert error:', supabaseError);
			throw new Error(`Failed to save data to database: ${supabaseError.message}`);
		}

		return json({ supabaseResult });
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Failed to save notes' }, { status: 500 });
	}
}
