<script lang="ts">
  export let image: Blob;

  function change() {
    image = input.files[0];
  }

  let input: HTMLInputElement;
</script>

<button on:click={() => input.click()}>{image ? "Change" : "Add"} image</button>

<input
  type="file"
  bind:this={input}
  accept=".jpg, .jpeg, .png, .webp"
  on:change={change}
  style="display: none;"
/>
