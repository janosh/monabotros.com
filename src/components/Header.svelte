<script>
  import Nav from 'components/Nav.svelte'
  import ColorMode from 'components/ColorMode.svelte'
  import Search from 'components/Search.svelte'
</script>

<header>
  <Nav />
  <Search indices={[`Filme`, `Artikel`]} />
  <ColorMode />
</header>

<style>
  header {
    padding: 4pt 1ex 0;
    font-size: 1.2em;
    place-content: center;
    align-items: baseline;
    gap: 2vw;
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    background: var(--bodyBg);
    box-shadow: 0 0 1em black;
    z-index: 2;
  }
</style>
