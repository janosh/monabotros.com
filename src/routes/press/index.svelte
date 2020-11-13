<script>
  import ButtonFilter from 'components/ButtonFilter.svelte'
  import IndexCard from 'components/IndexCard.svelte'
  import Masonry from 'components/Masonry.svelte'
  import press from 'content/press.yml'
  import { title } from '../stores'
  let publisher
  let publishers = [`Alle`, ...new Set(press.map((p) => p.publisher))]
  $: filteredPress =
    publisher === `Alle` ? press : press.filter((f) => f.publisher === publisher)
  $title = `Pressestimmen`
</script>

<h1>{$title}</h1>

<ButtonFilter
  labels={publishers}
  labelName="publisher"
  bind:selected={publisher}
  init="Alle" />

<Masonry items={filteredPress} let:item>
  <IndexCard {item} />
</Masonry>
