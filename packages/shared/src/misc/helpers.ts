import _isEmpty from 'lodash/isEmpty'

export function isEmpty(value: unknown): boolean {
  return (
    // eslint-disable-next-line unicorn/no-null
    value == null ||
    value === 0 ||
    // has length and it's zero
    (Object.prototype.hasOwnProperty.call(value, 'length') &&
      (value as [] | string).length === 0) ||
    // is an Object and has no keys
    _isEmpty(value)
  )
}

export function vd<V, D>(value: V, defaultValue: D): V | D {
  return isEmpty(value) ? defaultValue : value
}
