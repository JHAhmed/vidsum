import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	let { id, content } = await request.json();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('notes_personal')
			.update({ content: content })
			.eq('id', id);

		if (supabaseError) {
			console.error('Supabase update error:', supabaseError);
			throw new Error(`Failed to update data to database: ${supabaseError.message}`);
		}

		return json({ supabaseResult }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Failed to update notes' }, { status: 500 });
	}
}
