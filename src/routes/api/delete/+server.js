import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	let { id } = await request.json();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from(env.SUPABASE_TABLE_NAME)
			.delete()
			.eq('id', id);

		if (supabaseError) {
			console.error('Supabase delete error:', supabaseError);
			throw new Error(`Failed to delete data to database: ${supabaseError.message}`);
		}

		return json({ supabaseResult }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Failed to delete notes' }, { status: 500 });
	}
}
