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
  try {
    if (eventBody.Type === 'SubscriptionConfirmation') {
      const res = await axios.get(eventBody.SubscribeURL)
      console.log({ statusCode: res.statusCode })
      return res
    } else {
      const messageBody = JSON.parse(eventBody.Message)
      if (messageBody.fail === true) {
        console.error({ statusCode: 500 })
      }
      const result = { statusCode: 200 }
      console.log(result)
      return result
    }
  } catch (err) {
    console.error(err)
  }
}
