<script>
  import press from 'content/press.yml'
  import DetailPage from 'components/DetailPage.svelte'
  import { stores } from '@sapper/app'
  const { page } = stores()
  const item = press.find((el) => el.slug === $page.path)
</script>

<DetailPage {item} />
