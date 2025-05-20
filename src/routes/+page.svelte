<script>
  import Icon from "@iconify/svelte";
import { animateIn } from "$lib";
  let { data }  = $props();
</script>

<svelte:head>
  <title>VidSum | Easy Notes & Video Summary</title>
  <meta name="description" content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds." />
  <link rel="canonical" href="https://vidsum-one.vercel.app/" />
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "VidSum",
      "url": "https://vidsum-one.vercel.app/"
    }
  </script>

  <meta property="og:title" content="VidSum | Easy Notes & Video Summary" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://vidsum-one.vercel.app/ogimage.png" />
  <meta property="og:image:alt" content="VidSum - Summarize videos using AI" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="https://vidsum-one.vercel.app/" />

  <meta
    property="og:description"
    content="Summarize videos using AI. Paste a YouTube URL and get a summary in seconds." />
</svelte:head>

<div animate-in use:animateIn={{ blur: 2, y: 2, delay: 0 }}
  class="mx-12 w-full max-w-6xl space-y-8 rounded-xl bg-gray-100 p-4 py-8 shadow-xl backdrop-blur-md sm:p-6 md:p-10 dark:bg-slate-900 dark:shadow-slate-800/20">
  <header animate-in use:animateIn={{ blur: 2, y: 2, delay: 0.2 }}
 class="text-center">
    <h1 class="mb-2 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-gray-50">VidSum</h1>
    <p class="text-lg text-slate-600 dark:text-slate-400">Paste a YouTube link, get a summary!</p>
  </header>

<section animate-in use:animateIn={{ blur: 2, y: 2, delay: 0.4 }} class="flex flex-col items-center gap-6 py-6">
    <div class="max-w-3xl text-center space-y-4">
        <p class="text-xl text-slate-700 dark:text-slate-200">
            VidSum lets you quickly summarize YouTube videos into easy-to-read notes using AI. Just paste a video link and get concise, actionable summaries in seconds.
        </p>
        <p class="text-base text-slate-600 dark:text-slate-400">
            Save your summaries, organize your notes, and boost your learning efficiency. Try it now — no signup required!
        </p>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-4">
        <a href="/app" class="inline-flex items-center px-6 py-3 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition">
            Go to App
            <Icon icon="mdi:arrow-right" class="ml-2" />
        </a>
        {#if !data.user}
        <a href="/auth/" class="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 text-sky-600 font-semibold shadow hover:bg-gray-300 transition dark:bg-slate-800 dark:text-blue-300 dark:hover:bg-slate-700">
          Login
          <Icon icon="mdi:login" class="ml-2" />
        </a>
        {/if}
    </div>
</section>
</div>
<footer animate-in use:animateIn={{ blur: 2, y: 2, delay: 0.6 }} class="my-8 text-center text-sm text-slate-500 dark:text-slate-400">
  <p>© {new Date().getFullYear()} VidSum by Jamal Haneef. Keep innovating!</p>
</footer>
