<script lang="ts">
  import fileData from "$lib/data.json";
  import { readFile, writeFile, type ReadFileEvent } from "$lib/io";
  import Editor from "./editor.svelte";

  // The only piece of state driving the entire app!
  let data = $state(fileData as unknown);

  async function handleFileChange(event: ReadFileEvent) {
    data = await readFile(event);
  }

  function handleDownload() {
    writeFile($state.snapshot(data));
  }
</script>

<h1>Svelte JSON Editor</h1>

<section>
  <input type="file" onchange={handleFileChange} accept="application/json" />
  <Editor bind:value={data} />
  <button onclick={handleDownload}>Download</button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  button {
    width: fit-content;
  }
</style>
