<script lang="ts">
  import type { ProcessImageOptions } from "./process-image";
  import Slider from "./Slider.svelte";

  let hueAngle,
    contrast = 1,
    saturation,
    imageMode,
    bgColor;

  export let options: ProcessImageOptions;

  $: options = {
    saturation,
    contrast,
    hueAngle,
    imageMode,
    bgColor,
  };

  export let disabled = false;
</script>

<Slider min={0} max={360} initial={0} bind:value={hueAngle} {disabled}>
  Hue Rotate
</Slider>

<!-- <Slider min={0} max={10} initial={4} bind:value={contrast} {disabled}>
  Contrast
</Slider> -->
<!-- NOTE: removed contrast since it didn't seem to do much once I fixed a bug that set green = blue and blue = alpha -->

<Slider min={0} max={5} initial={1} bind:value={saturation} {disabled}>
  Saturation
</Slider>

<div class="select">
  <select bind:value={imageMode} {disabled}>
    <option value="stretch">Stretch</option>
    <option value="fit" selected>Fit</option>
    <option value="fill">Fill</option>
  </select>

  <select bind:value={bgColor} {disabled}>
    <option value="white" selected>White</option>
    <option value="red">Red</option>
    <option value="black">Black</option>
  </select>
</div>

<style>
  .select {
    display: flex;
    justify-content: space-evenly;
  }
</style>
