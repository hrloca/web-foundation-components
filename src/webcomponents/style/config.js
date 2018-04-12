/**
 * config
 * https://material.io/guidelines/
 * --------------------------------------------------/

/**
 * Breakpoints
 */
export const breakpoint = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptopM: '1024px',
  laptopL: '1440px',
}

export const customMedia = {
  viewportMobileS: `(min-width: ${breakpoint.mobileS})`,
  viewportMobileM: `(min-width: ${breakpoint.mobileM})`,
  viewportMobileL: `(min-width: ${breakpoint.mobileL})`,
  viewportTablet: `(min-width: ${breakpoint.tablet})`,
  viewportLaptopM: `(min-width: ${breakpoint.laptopM)`,
  viewportLaptopL: `(min-width: ${breakpoint.laptopL)`,
}

/**
 * layout
 */
export const grid = '8px'

export const depth = {
  fixed: 1000
}

/**
 * Easing
 * motion (https://material.io/guidelines/motion/duration-easing.html)
 */
export const bezier = {
  base: '.4, 0, .2, 1',
  deceleration: '0, 0, .2, 1',
  acceleration: '.4, 0, .6, 1',
  sharp: '.4, 0, .6, 1',
}

export const curves = {
  base: `cubic-bezier(${bezier.base})`,
  deceleration: `cubic-bezier(${bezier.deceleration})`,
  acceleration: `cubic-bezier(${bezier.acceleration})`,
  sharp: `cubic-bezier(${bezier.sharp})`,
}

/**
 * Duration
 */
export const duration = {
  tabletRate: 1.3,
  laptopRate: .5,
  base: 300,
  large: 375,
  entering: 225,
  leaving: 195,
  base: {
    base: duration.base,
    large: duration.large,
    entering: duration.entering,
    leaving: duration.leaving,
  },
  tablet: {
    base: duration.base * laptopRate,
    large: duration.large * laptopRate,
    entering: duration.entering * laptopRate,
    leaving: duration.leaving * laptopRate,
  },
  laptop: {
    base: duration.laptop * laptopRate,
    large: duration.laptop * laptopRate,
    entering: duration.laptop * laptopRate,
    leaving: duration.laptop * laptopRate,
  },
}

/**
 * ui
 */
export const paper = {
  d1: '0 0 2px 0 rgba(0, 0, 0, .14), 0 2px 2px 0 rgba(0, 0, 0, .12), 0 1px 3px 0 rgba(0, 0, 0, .2)',
  d2: '0 2px 4px 0 rgba(0, 0, 0, .14), 0 3px 4px 0 rgba(0, 0, 0, .12), 0 1px 5px 0 rgba(0, 0, 0, .2)',
  d3: '0 3px 3px 0 rgba(0, 0, 0, .14), 0 3px 4px 0 rgba(0, 0, 0, .12), 0 1px 8px 0 rgba(0, 0, 0, .2)',
  d4: '0 2px 4px 0 rgba(0, 0, 0, .14), 0 4px 5px 0 rgba(0, 0, 0, .12), 0 1px 10px 0 rgba(0, 0, 0, .2)',
  d6: '0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px 0 rgba(0, 0, 0, .2)',
  d8: '0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 3px rgba(0, 0, 0, .12), 0 4px 5px 0 rgba(0, 0, 0, .2)',
  d9: '0 9px 12px 1px rgba(0, 0, 0, .14), 0 3px 16px 2px rgba(0, 0, 0, .12), 0 5px 6px 0 rgba(0, 0, 0, .2);',
  d12: '0 12px 17px 2px rgba(0, 0, 0, .14), 0 5px 22px 4px rgba(0, 0, 0, .12), 0 7px 8px 0 rgba(0, 0, 0, .2);',
  d16: '0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px 0 rgba(0, 0, 0, .2);',
  d24: '0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12), 0 11px 15px 0 rgba(0, 0, 0, .2);',
}

export const edge = {
  tinted: '1px solid rgba(255,255,255,.2)',
  shaded: '1px solid rgba(0,0,0,.2)',
}
