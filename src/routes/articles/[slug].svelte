<script>
  import { page } from '$app/stores'
  import articles from './articles.yml'
  import DetailPage from '../../components/DetailPage.svelte'

  const item = articles.find((el) => el.slug === $page.path)
</script>

<DetailPage {item} />
