<script>
  import ButtonFilter from '../../components/ButtonFilter.svelte'
  import IndexCard from '../../components/IndexCard.svelte'
  import films from './films.yml'
  import { title } from '../stores'
  let tag
  let tags = [`Alle`, ...new Set(films.map((f) => f.tag))]
  $: filteredFilms = tag === `Alle` ? films : films.filter((f) => f.tag === tag)

  $title = `Filme`
</script>

<h1>{$title}</h1>

<ButtonFilter labels={tags} labelName="tag" bind:selected={tag} init="Alle" />
<div class="grid">
  {#each filteredFilms as item}
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
