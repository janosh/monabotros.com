<script>
  export let cards = []
</script>

<div class="cards">
  {#each cards as { title, slug, color, data }}
    <div class="card" style="background: {color};">
      <a href={slug}>
        <h2>{title}</h2>
      </a>
      {#each data as { slug, title }}
        <a href={slug}>
          <h3>
            &bull;
            {@html title.split(` `).splice(0, 5).join(` `) + `&hellip;`}
          </h3>
        </a>
      {/each}
    </div>
  {/each}
</div>

<style>
  .cards {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 2em 0;
  }
  @media (max-width: 850px) {
    .cards {
      grid-template-columns: 1fr;
    }
  }
  .card {
    padding: 1ex 1em;
    border-radius: 4pt;
    transition: 0.5s;
  }
  .card a {
    color: white;
  }
  .card a:hover {
    color: black;
  }
  .card:hover {
    transform: scale(1.01);
  }
  h3 {
    font-size: 1.4ex;
  }
</style>
