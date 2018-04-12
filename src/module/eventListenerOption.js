export default () => {
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true
      },
    })
    window.addEventListener('test', null, opts)
    /* eslint-disable */
  } catch (e) {}
  return opt => (supportsPassive ? opt : opt.capture)
}
