<script>
  import ButtonFilter from 'components/ButtonFilter.svelte'
  import IndexCard from 'components/IndexCard.svelte'
  import Masonry from 'components/Masonry.svelte'
  import films from 'content/films.yml'
  import { title } from '../stores'
  let tag
  let tags = [`Alle`, ...new Set(films.map((f) => f.tag))]
  $: filteredFilms = tag === `Alle` ? films : films.filter((f) => f.tag === tag)

  $title = `Filme`
</script>

<h1>{$title}</h1>

<ButtonFilter labels={tags} labelName="tag" bind:selected={tag} init="Alle" />

<Masonry items={filteredFilms} let:item>
  <IndexCard {item} />
</Masonry>
