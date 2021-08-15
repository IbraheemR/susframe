<script lang="ts">
  import { onMount } from "svelte";

  import { processImage } from "./process-image";
  import type { ProcessImageOptions } from "./process-image";

  export let image: HTMLImageElement;
  export let downscaledImage: Uint8Array;
  export let options: ProcessImageOptions;

  let canvas: HTMLCanvasElement;
  let ctx;

  onMount(() => {
    ctx = canvas.getContext("2d");
    ctx.fillStyle = options?.bgColor ?? "white";
    ctx.fillRect(0, 0, 264, 176);
  });

  $: if (image) downscaledImage = processImage(image, ctx, options);
</script>

<canvas bind:this={canvas} width={264} height={176} />

<style>
  canvas {
    border: 1px solid grey;
    margin: 0.5rem;
  }
</style>
