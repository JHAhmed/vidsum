<script>
	let { point, i, pointsList, examplePoints } = $props();
</script>

<button
	type="button"
	onclick={() => {
		pointsList = [...pointsList, point];
		examplePoints.splice(i, 1);
	}}
	class="cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-slate-800 dark:text-slate-300"
>
	{point}
</button>
