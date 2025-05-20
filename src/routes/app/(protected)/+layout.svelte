<script>
  // let { children } = $props();
  let { data, children } = $props();

  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  onMount(() => {
    if (!data.user) {
      goto("/auth/");
    }
  });
</script>

{#if data.user}
  {@render children()}
{:else}
  <div class="flex h-screen items-center justify-center"></div>
{/if}
