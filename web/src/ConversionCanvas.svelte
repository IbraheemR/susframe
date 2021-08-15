<script lang="ts">
  import { onMount } from "svelte";

  import { processImage } from "./process-image";

  export let image: HTMLImageElement;
  export let downscaledImage: Uint8Array;

  let canvas: HTMLCanvasElement;
  let ctx;

  onMount(() => {
    ctx = canvas.getContext("2d");
    ctx.filter = "contrast(3)";
  });

  $: if (image) downscaledImage = processImage(image, ctx);
</script>

<canvas bind:this={canvas} width={264} height={176} />
