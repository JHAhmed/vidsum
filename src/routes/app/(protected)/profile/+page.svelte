<script>
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';

	function handleLogout() {
		fetch('/auth/logout')
			.then((response) => {
				if (response.ok) {
					// Redirect to the login page
					window.location.href = '/app';
				} else {
					console.error('Logout failed');
				}
			})
			.catch((error) => {
				console.error('Error during logout:', error);
			});
	}
</script>

<svelte:head>
	<title>Profile | VidSum</title>
	<meta name="description" content="View and edit your profile information." />
	<link rel="canonical" href="https://vidsum-one.vercel.app/app/profile" />
	<script type="application/ld+json">
		{
			"@context": "http://schema.org",
			"@type": "WebPage",
			"name": "Profile | VidSum",
			"url": "https://vidsum-one.vercel.app/app/profile"
		}
	</script>

	<meta property="og:title" content="Profile | VidSum" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://vidsum-one.vercel.app/ogimage.png" />
	<meta property="og:image:alt" content="VidSum - Summarize videos using AI" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:url" content="https://vidsum-one.vercel.app/app/profile" />

	<meta property="og:description" content="View and edit your profile information." />
</svelte:head>

<div class="flex flex-col items-center justify-center py-24">
	<div
		class="mx-12 w-full max-w-6xl space-y-8 rounded-xl bg-gray-100 p-4 py-8 shadow-xl backdrop-blur-md sm:p-6 md:p-10 dark:bg-slate-900 dark:shadow-slate-800/20"
	>
		<header class="text-center">
			<h1 class="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-50">VidSum</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">Paste a YouTube link, get a summary!</p>
		</header>

		<section class="flex flex-col items-center gap-6 py-6">
			<div class="max-w-3xl space-y-4 text-center">
				<p class="text-xl text-slate-700 dark:text-slate-200">
					View and edit your profile information. You can update your email, password, and other
					details here.
				</p>
				<p class="text-base text-slate-600 dark:text-slate-400">
					This page is under construction. We are working on adding more features to enhance your
					profile management experience.
				</p>
				<button
					class="inline-flex cursor-pointer items-center rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-red-600"
					on:click={handleLogout}
				>
					<Icon icon="mdi:logout" class="mr-2" />
					Log Out
				</button>
			</div>
			<!-- <div class="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a href="/app" class="inline-flex items-center px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition">
                Go to App
                <Icon icon="mdi:arrow-right" class="ml-2" />
            </a>
            <a href="/auth/" class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 text-sky-600 font-semibold shadow hover:bg-gray-300 transition dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700">
                Login
                <Icon icon="mdi:login" class="ml-2" />
            </a>
        </div> -->
		</section>
	</div>
</div>
<footer class="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
	<p>© {new Date().getFullYear()} VidSum by Jamal Haneef. Keep innovating!</p>
</footer>
