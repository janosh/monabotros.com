<script>
  import Impressum from '@svicons/material-sharp/privacy-tip.svelte'
  import Twitter from '@svicons/fa-brands/twitter.svelte'
  import LinkedIn from '@svicons/fa-brands/linkedin.svelte'

  import social from './social.yml'

  social.push({ name: `Impressum`, url: `/imprint` })

  const icons = { Impressum, Twitter, LinkedIn }
</script>

<footer>
  <span>© 2020 Pacific Spotlight – Journalism & Film</span>
  <div>
    {#each social as { name, url }}
      <a sveltekit:prefetch href={url}>
        <svelte:component
          this={icons[name]}
          style="height: 20px; vertical-align: -2px;" />
        {name}</a>
    {/each}
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid lightblue;
    padding: 2em;
    text-align: center;
    display: grid;
    gap: 1em;
  }
  footer div {
    margin: auto;
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
  }
</style>
