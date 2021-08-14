<script lang="ts">
  import FileUpload from "./FileUpload.svelte";
  import { processImage } from "./process-image";
  let image: Blob;

  let downscaledImage: Uint8Array;
  $: (async () => {
    if (image) downscaledImage = await processImage(image);
  })();

  function send() {
    //TODO: rip out the websockets, they are unecessary. 1436 limit on esp32
    fetch("http://192.168.1.87/image", {
      method: "post",
      body: downscaledImage.slice(0, 66),
    });
  }
</script>

<main>
  <FileUpload bind:image />
  <button on:click={send}>Upload</button>
</main>
