'use strict'

module.exports.hello = async (event) => {
  if (event.sleepSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, event.sleepSeconds * 1000)
    })
  }
  if (event.triggerError) {
    throw new Error('Error triggered')
  }
  return {}
}
