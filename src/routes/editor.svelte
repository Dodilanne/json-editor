<script lang="ts">
  import Self from "./editor.svelte";

  let { value = $bindable() }: { key?: string; value: unknown } = $props();
</script>

{#if typeof value === "object"}
  {#if Array.isArray(value)}
    {@const arr = value}
    {@const lastItem = value.at(-1)}
    <ul>
      <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars I think there is a LSP bug here -->
      {#each value as _v, idx}
        <li>{idx} <Self bind:value={value[idx]} /></li>
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
{:else if typeof value === "string" || typeof value === "number"}
  <input type={typeof value === "string" ? "text" : "number"} bind:value />
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
