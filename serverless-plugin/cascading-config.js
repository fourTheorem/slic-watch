'use strict'

const MAX_DEPTH = 10

module.exports = {
  compile,
}

/**
 * Accept an object configuration with multiple levels. Return a compiled version of this object
 * with default parameters from parent nodes propagated to child objects where no override is present.
 *
 * @param {object} node hierarchical configuration
 * @param {object} parentConfig The configuration key-values from the parent node to be applied to the current node where no conflict occurs
 */
function compile(node, parentNode = {}, depth = 0) {
  if (depth > 10) {
    throw new Error(`Maximum configuration depth of ${MAX_DEPTH} reached`)
  }
  const childNodes = {}
  const compiledNode = {}
  for (const [key, value] of Object.entries({ ...parentNode, ...node })) {
    if (typeof value === 'object') {
      childNodes[key] = value
    } else {
      compiledNode[key] = value
    }
  }

  const compiledChildren = {}
  for (const [key, value] of Object.entries(childNodes)) {
    compiledChildren[key] = compile(value, compiledNode, depth + 1)
  }
  return {
    ...compiledNode,
    ...compiledChildren,
  }
}
