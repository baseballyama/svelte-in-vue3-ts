<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";

  export let count: Props["count"] = 1;
  export const reset = () => {
    count = 0;
  };

  const dispatch = createEventDispatcher<DispatcherPublisher>();

  $: doubled = count * 2;
  $: quadrupled = doubled * 2;
  $: dispatch("change", { type: "count", value: count });

  function handleClick() {
    count += 1;
  }
</script>

<div class="svelte">
  <h1>This is Svelte world</h1>

  <button on:click="{handleClick}">
    Count: {count}
  </button>

  <p>{count} * 2 = {doubled}</p>
  <p>{doubled} * 2 = {quadrupled}</p>
</div>

<style>
  .svelte {
    padding: 8px 32px;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
