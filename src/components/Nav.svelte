<script>
  import Filme from '@svicons/material-sharp/movie-filter.svelte'
  import Kontakt from '@svicons/material-sharp/alternate-email.svelte'
  import Artikel from '@svicons/fa-solid/newspaper.svelte'

  import links from './nav.yml'
  import { page } from '$app/stores'

  const icons = { Filme, Kontakt, Artikel }
</script>

<nav>
  {#each links as { title, slug }}
    <a
      sveltekit:prefetch
      aria-current={slug === $page.path ? `page` : undefined}
      href={slug}>
      <svelte:component
        this={icons[title]}
        style="height: 22px; vertical-align: -2px; padding-right: 4pt;" />
      {title}</a>
  {/each}
</nav>

<style>
  nav {
    display: contents;
  }
  a {
    text-decoration: none;
    transition: 0.4s;
    border-bottom: 3px solid transparent;
  }
  a:not(:first-child) {
    font-weight: lighter;
  }
  a:hover {
    color: orange;
  }
  a[aria-current] {
    border-bottom: 3px solid teal;
  }
</style>
