<script lang="ts">
  export let initial: number, min: number, max: number;
  export let value: number = initial;
  export let disabled = false;
</script>

<div class="slider">
  <div class="name"><slot /></div>
  <div class="value">({value})</div>
  <button on:click={() => (value = initial)} {disabled}>Reset</button>
  <input type="range" {min} {max} step={0.1} bind:value {disabled} />
</div>

<style>
  .slider {
    display: grid;
    grid-template-areas: "name value reset" "slider slider slider";
    grid-template-columns: 2fr 1fr auto;

    align-items: center;
  }

  .slider .name {
    grid-area: name;
  }

  .slider .value {
    grid-area: value;
  }

  .slider button {
    grid-area: reset;
  }

  .slider input {
    grid-area: slider;
  }
</style>
