<script lang="ts">
  import { Switch } from "bits-ui";
  let { tabs, label = "IITM BS", value = "", onValueChange = () => {} } = $props();
</script>

<div class="">
  <label for={`${label}-tabs`} class="mb-1.5 block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
  <div class="flex items-center space-x-3">
    <Switch.Root
      id={`${label}-switch`}
      name="hello"
      class="peer h-10 w-18  rounded-full bg-gray-200 px-0.5 inline-flex items-center cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 data-[state=checked]:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:data-[state=checked]:bg-blue-500 dark:data-[state=unchecked]:bg-gray-700">
      <Switch.Thumb
        class="size-8 rounded-full bg-white block transition-transform data-[state=checked]:translate-x-9 data-[state=unchecked]:translate-x-0 pointer-events-none shadow-sm dark:bg-gray-100" />
    </Switch.Root>
  </div>
</div>
