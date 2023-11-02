
/**
 * Filter an object to produce a new object with entries matching the supplied predicate
 *
 * @param {object} obj The object
 * @param {function} pred A function accepting value, key arguments and returning a boolean
 */
function filterObject (obj: object, predicate) {
  return Object.fromEntries(Object.entries(obj)
    .filter(([key, value]) => predicate(value, key)))
}

export {
  filterObject
}
