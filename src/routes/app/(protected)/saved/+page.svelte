<script>
  import { Note } from "$components";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let { data } = $props();
  let notes = $state(data.notes.supabaseResult);
</script>

<div class="w-full space-y-4 py-8 md:py-16 lg:space-y-2 lg:py-32 px-4 md:px-8 lg:px-16">
  <h1
    class="my-4 text-3xl leading-tight font-medium tracking-tighter text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
    Saved Notes
  </h1>

  <div class="py-16">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each notes as note, i}
        <Note {note} {i} />
      {/each}
    </div>
  </div>
</div>

<style>
</style>
