<script>
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  export let labels = []
  export let labelName = `label`
  export let init = ``
  export let selected

  $: selected = $page.query[labelName] || init
  const changeTag = (newLabel) => {
    selected = newLabel
    goto(`${$page.path}?${labelName}=${newLabel}`)
  }
</script>

<div>
  {#each labels as label}
    <button on:click={() => changeTag(label)} class={selected === label && `active`}>
      {label}
    </button>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1ex;
    place-content: center;
    margin-bottom: 2em;
  }
  button {
    font-size: 0.8em;
    background: teal;
    color: white;
    padding: 3pt 1ex;
  }
  button.active {
    background: orange;
  }
</style>
