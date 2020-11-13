<script>
  import films from 'content/films.yml'
  import DetailPage from 'components/DetailPage.svelte'
  import { stores } from '@sapper/app'
  const { page } = stores()
  const item = films.find((el) => el.slug === $page.path)
</script>

<DetailPage {item} />
