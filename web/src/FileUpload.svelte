<script lang="ts">
  export let image: Blob;

  function change(inputEvent) {
    image = (inputEvent.target as HTMLInputElement).files[0];
  }
</script>

<input type="file" accept=".jpg, .jpeg, .png, .webp" on:change={change} />
