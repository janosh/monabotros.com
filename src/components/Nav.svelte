<script>
  import Filme from '@svg-icons/material-sharp/movie-filter.svg'
  import Kontakt from '@svg-icons/material-sharp/alternate-email.svg'
  import Artikel from '@svg-icons/fa-solid/newspaper.svg'

  import links from 'content/nav.yml'
  import { stores } from '@sapper/app'
  const { page } = stores()

  const icons = { Filme, Kontakt, Artikel }
</script>

<nav>
  {#each links as { title, slug }}
    <a sapper:prefetch aria-current={slug === $page.path ? `page` : undefined} href={slug}
      ><svelte:component
        this={icons[title]}
        style="height: 22px; vertical-align: -2px; padding-right: 4pt;" />{title}</a>
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
