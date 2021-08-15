<script lang="ts">
  import ConversionCanvas from "./ConversionCanvas.svelte";

  import FileUpload from "./FileUpload.svelte";
  import Options from "./Options.svelte";
  import Slider from "./Slider.svelte";
  let image: HTMLImageElement;
  let downscaledImage: Uint8Array;

  function send() {
    fetch("/image", {
      method: "post",
      body: downscaledImage,
    });
  }

  let options;
</script>

<div class="center">
  <main>
    <h1>Sus Frame</h1>
    <ConversionCanvas {image} bind:downscaledImage {options} />
    <FileUpload bind:image />

    <Options bind:options disabled={!image} />

    <button on:click={send} disabled={!image}>Display Image</button>
  </main>
</div>

<style>
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  main {
    display: flex;
    flex-direction: column;
  }
</style>
