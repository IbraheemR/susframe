<script lang="ts">
  import ConversionCanvas from "./ConversionCanvas.svelte";

  import FileUpload from "./FileUpload.svelte";
  let image: Blob;
  let downscaledImage: Uint8Array;

  function send() {
    fetch("/image", {
      method: "post",
      body: downscaledImage,
    });
  }
</script>

<main>
  <ConversionCanvas {image} bind:downscaledImage />
  <FileUpload bind:image />
  <button on:click={send} disabled={!image}>Display Image</button>
</main>
