'use strict'
const https = require('https')
const MessageValidator = require('sns-validator')

module.exports = {
  handleGet,
  handleSubcription
}

/**
 * A simple Lambda that can be used to test metrics and alarms for different status codes and response times
 */

async function handleGet (event) {
  const qs = event.queryStringParameters || {}
  const timeout = Number(qs.timeout) || 1000
  const statusCode = Number(qs.statusCode) || 200

  await new Promise((resolve) => {
    setTimeout(() => resolve(), timeout)
  })

  return { statusCode }
}

async function handleSubcription (event) {
  console.log(event)
  const validator = new MessageValidator()
  return new Promise(function (resolve, reject) {
    validator.validate(JSON.parse(event.body), (err, message) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      validator.encoding = 'utf8'
      if (message.Type === 'SubscriptionConfirmation') {
        https.get(message.SubscribeURL, (res) => {
          resolve({ statusCode: res.statusCode })
        }).on('error', (e) => {
          reject(e)
        }
        )
      } else {
        resolve({ statusCode: 200 })
      }
    })
  })
}
