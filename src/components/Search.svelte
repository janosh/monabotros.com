<script>
  import { onMount } from 'svelte'
  import { session } from '$app/stores'
  import Search from '@svicons/fa-solid/search.svelte'

  import SearchHit from './SearchHit.svelte'
  import { onClickOutside } from '../utils/actions'

  const { ALGOLIA_APP_ID: appId, ALGOLIA_SEARCH_KEY: searchKey } = $session

  export let indices = []
  let client, input, query
  let allHits = []
  let hasFocus = false

  onMount(() => {
    client = window.algoliasearch(appId, searchKey)
  })

  const processResults = (hits) =>
    hits.map((hit) => {
      for (const [key, val] of Object.entries(hit)) {
        hit[key] =
          hit?._snippetResult?.[key]?.value || hit?._highlightResult?.[key]?.value || val
      }
      return hit
    })

  // Fires on each keyup in form
  async function search() {
    const { results } = await client.multipleQueries(
      indices.map((indexName) => ({ indexName, query }))
    )
    if (results) {
      allHits = results.map(({ hits, index }) => ({ hits: processResults(hits), index }))
    }
  }

  const src = `https://cdn.jsdelivr.net/npm/algoliasearch@latest/dist/algoliasearch-lite.umd.js`
</script>

<svelte:head>
  <script async defer {src}></script>
</svelte:head>

<aside use:onClickOutside={() => (hasFocus = false)}>
  <input
    type="text"
    bind:this={input}
    bind:value={query}
    on:keyup={search}
    placeholder="Suchen"
    aria-label="Suche"
    class:hasFocus />
  <button
    on:click={() => {
      hasFocus = true
      input.focus()
    }}
    title="Suche">
    <Search alt="Lupe" height="2ex" style="vertical-align: text-bottom; z-index: 0;" />
  </button>
  {#if hasFocus && allHits.some(({ hits }) => hits.length) && query}
    <div class="results">
      {#each allHits as { index, hits }}
        {#if hits.length}
          <section>
            <h2>{index}</h2>
            {#each hits as hit}
              <SearchHit {hit} clickHandler={() => (hasFocus = false)} />
            {/each}
          </section>
        {/if}
      {/each}
    </div>
  {/if}
</aside>

<style>
  aside {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
  }
  button {
    align-items: center;
    padding: 0;
    grid-area: search;
    color: var(--linkColor);
    position: relative;
  }
  h2 {
    color: var(--headingColor);
    border-bottom: 1px solid;
    text-align: center;
  }
  input {
    font-size: 1em;
    background: var(--shadowColor);
    border-radius: 5pt;
    color: var(--linkColor);
    border: 0;
    outline: none;
    width: 0;
    cursor: pointer;
    transition: 0.3s;
    opacity: 0;
  }
  input::placeholder {
    color: var(--headerColor);
  }
  input.hasFocus {
    opacity: 1;
    width: 4em;
    margin-left: -2.5ex;
    padding-left: 3ex;
  }
  input.hasFocus + button {
    color: var(--linkColor);
  }
  div.results {
    background: var(--bodyBg);
    top: 3ex;
    max-height: 60vh;
    position: absolute;
    max-width: 30em;
    overflow: scroll;
    width: 70vw;
    right: 0;
    box-shadow: 0 0 1ex black;
    padding: 1ex 1em;
    border-radius: 5pt;
    overscroll-behavior: none;
  }
  section {
    font-size: 0.7em;
    white-space: initial;
  }
  section :global(em) {
    background: var(--hoverColor);
    line-height: 1.2em;
    border-radius: 3pt;
    font-style: normal;
  }
</style>
