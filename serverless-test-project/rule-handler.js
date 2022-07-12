'use strict'

module.exports.handleRule = async (event) => {
  console.log(event)
  const e = Boolean(event.detail.triggerError)
  if (e) {
    throw new Error('Error triggered')
  } else {
    console.log('Successful event delivery')
  }
}
