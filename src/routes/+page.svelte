<script lang="ts">
  import file from "$lib/data.json";
  import Editor from "./editor.svelte";

  let data = $state(file);

  $inspect(data);
</script>

<h1>Svelte JSON Editor</h1>

<section>
  <Editor bind:value={data} />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
