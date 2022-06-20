'use strict'
const https = require('https')
const MessageValidator = require('sns-validator')

module.exports = {
  handleGet,
  handleSubscription
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

/**
 * This Lambda function handler allows us to provide an HTTP endpoint for SNS HTTP(S) subscriptions.
 * It handles two event types:
 *  - Message subscription confirmation flow, where SNS requires the HTTPS endpoint to validate the subscription.
 *  - Message delivery
 *
 * In the case of message delivery, we can also simulate message delivery failures. If the message payload has `fail: true`,
 * we will return a 500 status code.
 *
 * @param {object} event The Lambda event
 * @returns The API Gateway Lambda Proxy response
 */
async function handleSubscription (event) {
  console.log(event)
  const validator = new MessageValidator()
  const promise = new Promise(function (resolve, reject) {
    const eventBody = JSON.parse(event.body)
    validator.validate(eventBody, (err, message) => {
      if (err) {
        console.error(err)
        return reject(err)
      }
      validator.encoding = 'utf8'
      if (message.Type === 'SubscriptionConfirmation') {
        https.get(message.SubscribeURL, (res) => {
          resolve({ statusCode: res.statusCode })
        }).on('error', (e) => {
          reject(e)
        })
      } else {
        const messageBody = JSON.parse(eventBody.Message)
        if (messageBody.fail === true) {
          return resolve({ statusCode: 500 })
        }
        resolve({ statusCode: 200 })
      }
    })
  })

  const result = await promise
  console.log('Result', result)
  return result
}
