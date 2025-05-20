<!-- <form
	method="POST"
	action="?/login"
	class="mx-auto mt-24 max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg border border-gray-200"
>
	<h2 class="text-2xl font-bold text-center text-gray-800 mb-4 tracking-tight">Welcome Back</h2>
	<div>
		<label for="email" class="mb-2 block text-sm font-semibold text-gray-700">Email</label>
		<input
			name="email"
			type="email"
			autocomplete="username"
			required
			class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
			placeholder="you@email.com"
		/>
	</div>
	<div>
		<label for="password" class="mb-2 block text-sm font-semibold text-gray-700">Password</label>
		<input
			name="password"
			type="password"
			autocomplete="current-password"
			required
			class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
			placeholder="••••••••"
		/>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<input id="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
			<label for="remember" class="ml-2 block text-sm text-gray-600">Remember me</label>
		</div>
		<a href="/" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
	</div>
	<div class="flex gap-4 mt-6">
		<button
			type="submit"
			class="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-600 transition"
		>
			Login
		</button>
		<button
			formaction="?/signup"
			class="flex-1 rounded-lg border border-blue-600 py-3 text-blue-600 font-semibold bg-white hover:bg-blue-50 transition"
		>
			Sign up
		</button>
	</div>
</form> -->


  <!-- <form onsubmit={handleSubmit} class="space-y-6">
    <div>
      <label for="youtube-url" class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
        >YouTube Video URL</label>
      <input
        type="url"
        id="youtube-url"
        bind:value={youtubeUrl}
        placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        class="w-full rounded-lg border-gray-300 bg-gray-50 px-4 py-3 text-sm md:text-base text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500"
        required />
    </div>
    <div class="my-6 space-y-4 flex w-full flex-col sm:flex-row sm:space-x-2 md:space-x-4">
      <div class="w-full">
        <Tabs
          onValueChange={(newValue) => (summaryLength = newValue)}
          value={summaryLength}
          label="Summary Length"
          tabs={{
            short: "Short",
            medium: "Medium",
            long: "Long",
          }} />
      </div>

      <div class="w-full">
        <Tabs
          onValueChange={(newValue) => (summaryType = newValue)}
          value={summaryType}
          label="Video Type"
          tabs={{
            education: "Education",
            entertainment: "Entertainment",
            others: "Others",
          }} />
      </div>
    </div>
    <div class="w-full">
      <label for="title-input" class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
        >Note Title</label>
      <input
        id="title-input"
        type="text"
        placeholder="e.g., Java Week 1 Insights"
        bind:value={title}
        class="w-full rounded-lg border-gray-300 bg-gray-50 text-sm md:text-base px-4 py-3 text-gray-900 outline-none focus:border-sky-500 focus:ring focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500" />
    </div>
    <button
      type="submit"
      disabled={isLoading}
      class="flex w-full transform cursor-pointer items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3.5 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:from-sky-600 hover:to-cyan-600 hover:shadow-lg focus:ring-4 focus:ring-sky-500/50 focus:outline-none active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
      {#if isLoading}
        <Icon icon="line-md:loading-twotone-loop" class="mr-2 h-5 w-5 animate-spin" />
        <span>Summarizing...</span>
      {:else}
        <Icon icon="ph:magic-wand-duotone" class="mr-2 h-5 w-5" /> <span>Get Summary</span>
      {/if}
    </button>
  </form> -->


<form
	class="mx-auto mt-10 max-w-md space-y-8 rounded-xl bg-white/80 p-8 shadow-lg backdrop-blur-lg border border-gray-200 dark:bg-slate-800/90 dark:border-slate-700"
	method="POST"
	action="?/login"
>
	<h2 class="text-2xl font-bold text-center text-gray-800 mb-4 tracking-tight dark:text-gray-100">Welcome Back</h2>
	<div>
		<label for="email" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
		<input
			name="email"
			id="email"
			type="email"
			autocomplete="username"
			required
			class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
			placeholder="you@email.com"
		/>
	</div>
	<div>
		<label for="password" class="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
		<input
			name="password"
			id="password"
			type="password"
			autocomplete="current-password"
			required
			class="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-sky-500 focus:outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-gray-100"
			placeholder="••••••••"
		/>
	</div>
	<div class="flex items-center justify-between">
		<!-- <div class="flex items-center">
			<input id="remember" name="remember" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 dark:border-slate-700" />
			<label for="remember" class="ml-2 block text-sm text-gray-600 dark:text-gray-400">Remember me</label>
		</div> -->
		<a href="/" class="text-sm text-sky-600 hover:underline dark:text-sky-400">Forgot password?</a>
	</div>
	<div class="flex gap-4 mt-6">
		<button
			type="submit"
			class="flex-1 rounded-lg cursor-pointer bg-gradient-to-r from-sky-500 to-cyan-500 py-3 text-white font-semibold shadow hover:from-sky-600 hover:to-cyan-600 transition"
		>
			Login
		</button>
		<button
			formaction="?/signup"
			class="flex-1 rounded-lg cursor-pointer border border-sky-500 py-3 text-sky-600 font-semibold bg-white hover:bg-sky-50 transition dark:bg-slate-900 dark:text-sky-400 dark:border-sky-400 dark:hover:bg-slate-800"
		>
			Sign up
		</button>
	</div>
</form>