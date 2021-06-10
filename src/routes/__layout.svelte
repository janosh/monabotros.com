<script>
  import Header from '../components/Header.svelte'
  import Footer from '../components/Footer.svelte'
  import GoogleAnalytics from '../components/GoogleAnalytics.svelte'
  import { title } from './stores'
  // image source: https://pixabay.com/photos/1432660
</script>

<svelte:head>
  <title>Mona Botros | {$title}</title>
</svelte:head>

<GoogleAnalytics />
<Header />
<hgroup>
  <img src="/images/pacific-sunset.jpg" alt="Mountains" />
  <h1>
    Pacific Spotlight<br />
    <hr />
    <small>Journalism and Film</small>
  </h1>
</hgroup>
<main>
  <slot />
</main>
<Footer />

<style>
  main {
    padding: 5vw;
    box-sizing: border-box;
    width: 100%;
    max-width: 70em;
    margin: 0 auto auto;
  }
  hgroup {
    position: relative;
    height: max-content;
  }
  img {
    width: 100%;
    max-height: 400px;
  }
  h1 {
    color: white;
    background: rgba(0, 0, 0, 0.2);
    padding: 5pt 1ex;
    border-radius: 1ex;
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: min-content;
    white-space: nowrap;
  }
  hr {
    height: 1px;
    margin: 4pt auto;
    width: 70%;
    border: 0;
    background: white;
  }
  small {
    font-weight: 200;
    font-size: 1em;
  }
</style>
