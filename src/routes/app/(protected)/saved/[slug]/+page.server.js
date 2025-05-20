import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function load({ params, locals: { supabase } }) {
	const { data: { user } } = await supabase.auth.getUser();
	const id = params.slug.split('/').pop();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('notes')
			.select()
			.eq('id', id)
			.eq('user_id', user.id)
			.single();

		if (supabaseError) {
			console.error('Supabase insert error:', supabaseError);
			throw new Error(`Failed to save data to database: ${supabaseError.message}`);
		}

		return supabaseResult;
	} catch (err) {
		console.error('Error fetching post from Supabase:', err);
		throw error(500, 'Failed to load post');
	}
}
