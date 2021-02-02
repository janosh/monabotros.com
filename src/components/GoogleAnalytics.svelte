<script>
  // https://analytics.google.com
  import { stores } from '@sapper/app'

  const { page } = stores()

  $: if (typeof gtag !== `undefined`) {
    window.gtag(`config`, `G-49SR7QQP2N`, { page_path: $page.path })
  }
</script>

<svelte:head>
  <script async src="https://googletagmanager.com/gtag/js?id=G-49SR7QQP2N"></script>
  <script>
    window.dataLayer = window.dataLayer || []
    function gtag(){
      dataLayer.push(arguments)
    }

    gtag('js', new Date())

    gtag('config', 'G-49SR7QQP2N')
  </script>
</svelte:head>