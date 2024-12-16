<script lang="ts">
  import Self from "./editor.svelte";
  let { value = $bindable() } = $props();
</script>

{#if typeof value === "object"}
  <!-- When encountering an array or object, we loop through the keys
      and recursively render the same editor comp until leafs (primitive values) are reached -->

  {#if Array.isArray(value)}
    {@const arr = value}
    {@const lastItem = value.at(-1)}
    <ul>
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars I think there is a LSP bug here... Disregard -->
      {#each value as _v, idx}
        <li>
          <span>{idx}</span>
          <!-- Deep state binding for free! -->
          <!-- Check the elements in devtools to see the magic of fine grained reactivity in action! -->
          <Self bind:value={value[idx]} />
        </li>
      {/each}
      {#if typeof lastItem === "string" || typeof lastItem === "number" || typeof lastItem === "boolean"}
        <button onclick={() => arr.push(lastItem)}>Add</button>
      {/if}
    </ul>
  {:else if value !== null}
    <ul>
      {#each Object.keys(value) as childKey}
        <li>
          <span>{childKey}</span>
          <Self bind:value={value[childKey as keyof typeof value]} />
        </li>
      {/each}
    </ul>
  {/if}
  <!-- When reaching the leafs, we bind deeply nested values to basic uncontrolled controls and 
       let svelte do its magic! -->
{:else if typeof value === "string"}
  <input bind:value />
{:else if typeof value === "number"}
  <input type="number" bind:value />
{:else if typeof value === "boolean"}
  <input type="checkbox" bind:checked={value} />
{/if}

<style>
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    list-style: none;
    width: 100%;
  }

  li {
    display: flex;
    gap: 0.25rem;
  }

  button {
    width: fit-content;
  }
</style>
