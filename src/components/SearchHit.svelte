<script>
  export let data
  export let clickHandler = () => {}
  const { title, slug, excerpt, img, date, author } = data
</script>

{#if img}<img src={img} alt={title} />{/if}
<h3>
  <a href={slug} on:click={clickHandler}>{@html title}</a>
</h3>
{#if date}<span>{new Date(date).toLocaleDateString(`de`)}</span>{/if}
{#if author}<span>{author.name}</span>{/if}
{#if excerpt}
  <p>
    {@html excerpt}
  </p>
{/if}

<style>
  h3 :global(em) {
    color: white;
  }
  img {
    float: right;
    border-radius: 5pt;
    margin-top: 2ex;
    width: 100px;
  }
</style>
