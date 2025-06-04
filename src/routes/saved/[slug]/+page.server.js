import { supabase } from '$lib/supabaseClient';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id = params.slug.split('/').pop();

	try {
		const { data: supabaseResult, error: supabaseError } = await supabase
			.from('notes_personal')
			.select('id, title, content')
			.eq('id', id)
			.single();

		if (supabaseError) {
			console.error('Supabase error:', supabaseError);
			throw new Error(`Failed to fetch data from database: ${supabaseError.message}`);
		}

		return supabaseResult;
	} catch (err) {
		console.error('Error fetching post from Supabase:', err);
		throw error(500, 'Failed to load post');
	}
}
