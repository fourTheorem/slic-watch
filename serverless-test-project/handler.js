'use strict'

module.exports.hello = async (event, context) => {
  const timeout = context.getRemainingTimeInMillis()

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
