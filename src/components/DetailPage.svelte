<script>
  import VideoEmbed from './VideoEmbed.svelte'
  import { reduceMeta } from '../utils'

  export let item

  $: ({ title, date, img, html, tag, collaborator, channel, videoId, press } = item)
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div>
  <h1>{title}</h1>
  <p>{reduceMeta(date, channel, tag, collaborator && `Mit: ${collaborator}`)}</p>

  {#if videoId}
    <VideoEmbed {videoId} />
  {:else if img}<img src={img} alt={title} />{/if}
  {#if press}
    <h3>Pressestimmen</h3>
    {#each press as { publisher, author, md, url }}
      <h4>{author || ``}{publisher && author ? ` | ` : ``}{publisher}</h4>
      <blockquote>
        {@html md}
      </blockquote>
      {#if url}<a href={url}>Link</a>{/if}
    {/each}
  {/if}
  {#if html}
    {@html html}
  {/if}
</div>

<style>
  div {
    max-width: 40em;
    margin: auto;
    display: grid;
    justify-items: center;
  }
  img {
    width: 100%;
    border-radius: 1ex;
  }
  p {
    background: var(--accentBg);
    border-radius: 1ex;
    padding: 1pt 1ex;
  }
</style>
