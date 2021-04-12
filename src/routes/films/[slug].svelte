<script>
  import { page } from '$app/stores'
  import films from './films.yml'
  import DetailPage from '../../components/DetailPage.svelte'

  const item = films.find((el) => el.slug === $page.path)
</script>

<DetailPage {item} />
