export async function load({ fetch, params }) {
	const res = await fetch(`/api/get-notes`, {
		method: 'GET'
	});

	const notes = await res.json();
	return { notes };
}
