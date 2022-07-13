'use strict'

module.exports.handleRule = async (event) => {
  console.log(event)
  if (event.detail.triggerError) {
    throw new Error('Error triggered')
  } else {
    console.log('Successful event delivery')
  }
}
