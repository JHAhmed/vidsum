import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals: { supabase } }) => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error signing out:", error);
    return new Response("Error signing out", { status: 500 });
  }

  // Redirect to app page after successful sign-out
  throw redirect(303, '/app');
};
