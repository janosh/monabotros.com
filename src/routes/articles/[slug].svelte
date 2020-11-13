<script>
  import articles from 'content/articles.yml'
  import DetailPage from 'components/DetailPage.svelte'
  import { stores } from '@sapper/app'
  const { page } = stores()
  const item = articles.find((el) => el.slug === $page.path)
</script>

<DetailPage {item} />
