<script>
  import ButtonFilter from 'components/ButtonFilter.svelte'
  import IndexCard from 'components/IndexCard.svelte'
  import Masonry from 'components/Masonry.svelte'
  import articles from 'content/articles.yml'
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

<Masonry items={filteredArticles} let:item>
  <IndexCard {item} />
</Masonry>
