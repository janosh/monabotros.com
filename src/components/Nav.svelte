<script>
  import links from 'content/nav.yml'
  import { stores } from '@sapper/app'
  const { page } = stores()
</script>

<nav>
  {#each links as { title, slug }}
    <a
      rel="prefetch"
      aria-current={slug === $page.path ? `page` : undefined}
      href={slug}>{title}</a>
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
