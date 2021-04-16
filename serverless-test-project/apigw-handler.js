'use strict'

module.exports = {
  handleGet,
}

async function handleGet(event) {
  const qs = event.queryStringParameters || {}
  const timeout = Number(qs.timeout) || 1000
  const statusCode = Number(qs.statusCode) || 200

  await new Promise((resolve) => {
    setTimeout(() => resolve(), timeout)
  })

  return { statusCode }
}
