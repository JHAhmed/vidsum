import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	let { title, content } = await request.json();

	try {
		console.log('Saving initial data to Supabase...');
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('notes')
			.insert([{ title: title, content: content }])
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
