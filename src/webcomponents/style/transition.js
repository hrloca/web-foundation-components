import { curves, duration, customMedia } from './config'

const durationTemplate = media => `
  transition-duration: ${duration[media]}ms;
`

const transitionTemplate = bezierName => `
  transition-timing-function: ${curves[bezierName]};
`
/*
  @media (${customMedia.viewportTablet}) {
    transition-duration: ${duration.tablet[media]}ms;
  }
  @media (${customMedia.viewportLaptopM}) {
    transition-duration: ${duration.laptop[media]}ms;
  }
*/

export const durationProps = [
  'base',
  'large',
  'entering'
  'leaving'
].reduce((p, c) => {
  p[c] = durationTemplate(c)
  return p
}, {})

export const transitionProps = [
  'base',
  'deceleration',
  'acceleration'
  'sharp'
].reduce((p, c) => {
  p[c] = transitionTemplate(c)
  return p
}, {})
