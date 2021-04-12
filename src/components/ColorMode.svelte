<script>
  import Modal from './Modal.svelte'
  import { colorMode, colorModeKey } from '../stores'
  import Sun from '@svicons/fa-solid/sun.svelte'
  import Moon from '@svicons/entypo/moon.svelte'
  import BrightnessAuto from '@svicons/material-sharp/brightness-auto.svelte'

  const colors = {
    darkBlue: `darkblue`,
    darkerBlue: `#061725`,
    darkestBlue: `#001d31`,
    lightBlue: `#00a1ff`,
    lighterBlue: `lightblue`,
  }

  const modeColors = {
    light: {
      textColor: `black`,
      linkColor: `darkblue`,
      bodyBg: `#f1f1f1`,
      accentBg: `white`,
      transparentBg: `rgba(255, 255, 255, 0.7)`,
      borderColor: `lightBlue`,
      shadowColor: `rgba(0, 0, 0, 0.1)`,
      headingColor: `teal`,
      darkYellow: `#e9c300`,
    },
    dark: {
      textColor: `white`,
      linkColor: colors.lightBlue,
      bodyBg: colors.darkerBlue,
      accentBg: colors.darkestBlue,
      transparentBg: `rgba(6, 23, 37, 0.7)`,
      borderColor: `orange`,
      shadowColor: `black`,
      headingColor: `orange`,
      darkYellow: `yellow`,
    },
  }

  const setModeFactory = (mode) => () => {
    open = false
    $colorMode = mode
    applyColors()
  }

  function applyColors() {
    // If colorMode is `auto` we pick dark or light depending on prefersDark media query.
    const prefersDark = window.matchMedia(`(prefers-color-scheme: dark)`).matches
    let activeMode
    if ($colorMode === `auto`) activeMode = prefersDark ? `dark` : `light`
    else activeMode = $colorMode

    // Define CSS vars for moded colors (both during SSR and in production).
    for (const [key, val] of Object.entries(modeColors[activeMode])) {
      if (val === undefined) console.error(`CSS variable ${key} is undefined`)
      document.body.style.setProperty(`--${key}`, val)
    }

    // Define CSS vars for non-moded colors as well while we're at it
    for (const [key, val] of Object.entries(colors)) {
      document.body.style.setProperty(`--${key}`, val)
    }
  }

  // boundFn and <svelte:head> below provide SSR support
  // we modify a stringified version of applyColors so it can run before hydration
  // and prevent color falshes on page load
  const boundFn = String(applyColors).replace(/\$colorMode/g, `colorMode`)

  // eslint-disable-next-line no-useless-escape
  const script = `
    <script>const colorMode = localStorage.${colorModeKey} ?? 'auto'
    const modeColors = ${JSON.stringify(modeColors)}
    const colors = ${JSON.stringify(colors)}
    window.addEventListener('DOMContentLoaded', ${boundFn})<\/script>`

  let open = false

  const handleKeydown = (event) => {
    if (!event.ctrlKey) return
    if (event.key === `1`) setModeFactory(`light`)()
    if (event.key === `2`) setModeFactory(`dark`)()
    if (event.key === `3`) setModeFactory(`auto`)()
  }
</script>

<button class="opener" on:click={() => (open = true)}>
  <Moon width="30px" style="vertical-align: text-bottom;" />
</button>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <Modal on:close={() => (open = false)} style="width: max-content; max-width: 90vw;">
    <div>
      <button on:click={setModeFactory(`light`)} class="choice light">
        <Sun />
        Hell</button>
      <button on:click={setModeFactory(`dark`)} class="choice dark">
        <Moon color="yellow" />
        Dunkel</button>
      <button on:click={setModeFactory(`auto`)} class="choice auto">
        <BrightnessAuto color="var(--bodyBg)" />
        Auto</button>
    </div>
  </Modal>
{/if}

<svelte:head>
  {@html script}
</svelte:head>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    place-content: center;
  }
  @media (max-width: 700px) {
    div {
      width: min-content;
    }
  }
  button.opener {
    background: transparent;
    color: var(--darkYellow);
  }
  button.choice {
    height: 7ex;
    width: 10ex;
    display: grid;
    place-items: center;
    font-size: 3ex;
    box-shadow: 0 0 1em var(--shadowColor);
  }
  button.choice.light {
    background: #f1f1f1;
    color: black;
  }
  button.choice.dark {
    background: #061725;
    color: white;
  }
  button.choice.auto {
    color: var(--textColor);
    background: linear-gradient(to right bottom, var(--textColor) 50%, var(--bodyBg) 50%);
  }
  button.choice :global(svg) {
    height: 3ex;
    padding-bottom: 12pt;
  }
</style>
