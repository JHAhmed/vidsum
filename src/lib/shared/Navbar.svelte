<script>
  import { page } from "$app/stores";
  import { animateIn } from "$lib";
  import Icon from "@iconify/svelte";
  import { Tooltip } from "bits-ui";
  import { browser } from "$app/environment";

  import { shared } from "$lib/state.svelte";

  let isLoggedIn = $derived(shared.isLoggedIn);

  let { isDark, onToggle } = $props();

  let links = $derived([
    { name: "Home", href: `${isLoggedIn ? "/" : "/"}`, icon: "heroicons:home" },
    { name: "Saved", href: "/saved", icon: "heroicons:document-duplicate" },
    { name: "Settings", href: "/settings", icon: "heroicons:cog-6-tooth" },
  ]);

  let selected = $derived(links.findIndex((link) => link.href === $page.url.pathname));
  const segments = $page.url.pathname.split("/").filter((segment) => segment !== "").length;
  const prevPage = $page.url.pathname.split("/").slice(0, -1).join("/");

</script>

<nav class="fixed inset-x-0 top-8 z-10 mx-auto w-fit rounded-xl backdrop-blur-md">
  <div
    class="mx-auto flex w-fit items-center justify-center rounded-xl p-1 shadow-lg dark:bg-white/20 dark:shadow-gray-800/20">
    {#if segments > 1}
      <Tooltip.Provider>
        <Tooltip.Root delayDuration={200}>
          <Tooltip.Trigger>
            <div
              use:animateIn={{ delay: 0.1, blur: 4, duration: 0.5 }}
              class="mr-1 flex size-12 items-center justify-center rounded-xl bg-red-400 hover:bg-red-500 md:size-14">
              <a href={prevPage} class="flex h-full w-full items-center justify-center text-black dark:text-white">
                <span class="flex size-5 items-center justify-center md:size-6">
                  <Icon icon="heroicons:arrow-uturn-left" width="28" height="28" />
                </span>
              </a>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content sideOffset={2}>
            <div
              class="z-20 mr-5 flex items-center justify-center rounded-xl bg-white p-3 text-sm font-medium outline-hidden">
              Back
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    {/if}

    <ul class="flex items-center justify-center space-x-1">
      {#each links as link, i}
        {#if selected === i}
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
              <Tooltip.Trigger>
                <li
                  use:animateIn={{ delay: 0.1, blur: 4, duration: 0.5 }}
                  class="flex size-12 items-center justify-center rounded-xl bg-black/10 md:size-14 dark:bg-white/20">
                  <a href={link.href} class="flex h-full w-full items-center justify-center text-black dark:text-white">
                    <span class="flex size-5 items-center justify-center md:size-6">
                      <Icon icon="{link.icon}-solid" width="28" height="28" />
                    </span>
                  </a>
                </li>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={2}>
                <div
                  class="z-20 flex items-center justify-center rounded-xl bg-white p-3 text-sm font-medium outline-hidden">
                  {link.name}
                </div>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        {:else}
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={200}>
              <Tooltip.Trigger>
                <li
                  class="flex size-12 items-center justify-center rounded-xl transition-all duration-100 hover:bg-black/5 md:size-14 dark:hover:bg-white/10">
                  <a href={link.href} class="flex h-full w-full items-center justify-center text-black dark:text-white">
                    <span class="flex size-5 items-center justify-center md:size-6">
                      <Icon icon={link.icon} width="28" height="28" />
                    </span>
                  </a>
                </li>
              </Tooltip.Trigger>
              <Tooltip.Content sideOffset={2}>
                <div
                  class="z-20 flex items-center justify-center rounded-xl bg-white p-3 text-sm font-medium outline-hidden">
                  {link.name}
                </div>
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        {/if}
      {/each}
      {#key isDark}
        <button
          onclick={onToggle}
          class="flex size-12 cursor-pointer items-center justify-center rounded-xl text-black transition-all duration-100 hover:bg-black/5 md:size-14 dark:text-white dark:hover:bg-white/10">
          <span class="flex size-5 items-center justify-center md:size-6">
            <Icon icon={isDark ? "heroicons:sun" : "heroicons:sun-solid"} width="28" height="28" />
          </span>
        </button>
      {/key}
    </ul>
  </div>
</nav>
