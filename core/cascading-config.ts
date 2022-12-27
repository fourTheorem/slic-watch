'use strict'

const MAX_DEPTH = 10

/**
 * Accept an object configuration with multiple levels. Return an applied version of this object
 * with default parameters from parent nodes cascaded to child objects where no override is present.
 *
 * @param {object} node hierarchical configuration
 * @param {object} parentNode The configuration from the parent node to be applied to the current node where no conflict occurs
 */
export function cascade (node:object, parentNode: object = {}, depth = 0) {
  if (depth > 10) {
    throw new Error(`Maximum configuration depth of ${MAX_DEPTH} reached`)
  }
  const childNodes = {}
  const compiledNode = {}
  for (const [key, value] of Object.entries({ ...parentNode, ...node })) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      childNodes[key] = value
    } else {
      compiledNode[key] = value
    }
  }

  const compiledChildren = {}
  for (const [key, value] of Object.entries(childNodes)) {
    compiledChildren[key] = cascade(value, compiledNode, depth + 1)
  }
  return {
    ...compiledNode,
    ...compiledChildren
  }
}
