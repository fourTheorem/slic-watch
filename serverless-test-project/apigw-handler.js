'use strict'
const axios = require('axios').default

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
  const eventBody = JSON.parse(event.body)
  const result = {}
  try {
    if (eventBody.Type === 'SubscriptionConfirmation') {
      const res = await axios.get(eventBody.SubscribeURL)
      console.log('Subscription confirmation response', { statusCode: res.status, statusText: res.statusText })
      result.statusCode = res.status
    } else {
      let messageBody
      try {
        // Support JSON messages
        messageBody = JSON.parse(eventBody.Message)
      } catch (err) {
        // Fallback to plain text
        messageBody = eventBody.Message
      }

      if (messageBody.fail === true) {
        console.log('fail is set to true, simulating message delivery failure')
        result.statusCode = 500
      } else {
        console.log('Successful message delivery')
        result.statusCode = 200
      }
    }
  } catch (err) {
    console.error('Unexpected error received', err)
    result.statusCode = 500
  }
  console.log('Returning result', result)
  return result
}
