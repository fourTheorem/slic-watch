'use strict'

module.exports = {
  handleGet
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
