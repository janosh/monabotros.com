export const colors = {
  darkBlue: `darkblue`,
  darkerBlue: `#061725`,
  darkestBlue: `#001d31`,
  lightBlue: `#00a1ff`,
  lighterBlue: `lightblue`,
}

export const modeColors = {
  light: {
    textColor: `black`,
    linkColor: `darkblue`,
    bodyBg: `#f1f1f1`,
    accentBg: `white`,
    transparentBg: `rgba(255, 255, 255, 0.7)`,
    borderColor: `lightBlue`,
    shadowColor: `gray`,
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
