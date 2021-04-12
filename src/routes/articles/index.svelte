<script>
  import ButtonFilter from '../../components/ButtonFilter.svelte'
  import IndexCard from '../../components/IndexCard.svelte'
  import articles from './articles.yml'
  import { title } from '../stores'
  let publisher
  let publishers = [`Alle`, ...new Set(articles.map((p) => p.publisher))]
  $: filteredArticles =
    publisher === `Alle` ? articles : articles.filter((f) => f.publisher === publisher)

  $title = `Artikel`
</script>

<h1>{$title}</h1>

<ButtonFilter
  labels={publishers}
  labelName="publisher"
  bind:selected={publisher}
  init="Alle" />

<div class="grid">
  {#each filteredArticles as item}
    <IndexCard {item} />
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
    gap: 1em;
  }
</style>
