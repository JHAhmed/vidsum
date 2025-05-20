import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
	let { title, content, url, transcript } = await request.json();

	
	
	try {
		const { data: { user } } = await supabase.auth.getUser()

		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('notes')
			.insert([{ title: title, content: content, user_id: user.id, url: url, transcript: transcript }])
			.select()
			.eq('user_id', user.id)
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
