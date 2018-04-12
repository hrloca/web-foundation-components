/**
 * list functions
 */
import { diff } from './foundation'

export const greaterThan = num => (item, i) => i < num

/* sort */
export const inAscendingOrder = diff

/* reducer */
export const toFlattenWithoutNull = (a, b) => (b ? a.concat(b) : a)
