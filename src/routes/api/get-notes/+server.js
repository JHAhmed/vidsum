import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	try {
		console.log('Getting data from Supabase...');
		const { data: supabaseResult, error: supabaseError } = await supabase.from('notes').select();

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
