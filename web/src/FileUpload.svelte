<script lang="ts">
  export let image: HTMLImageElement;

  function change() {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      let i = new Image();
      i.src = e.target.result as string;
      i.onload = () => {
        image = i;
      };
    };
    reader.readAsDataURL(input.files[0]);
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
