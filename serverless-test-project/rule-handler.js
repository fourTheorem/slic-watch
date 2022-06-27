'use strict'

module.exports.handleRule = (event, context, callback) => {
  console.log(event)
  if (event.sleepSeconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, event.sleepSeconds * 1000)
    })
  }
  if (event.triggerError) {
    throw new Error('Error triggered')
  }
  console.log('Error occured')
  return Error
}
