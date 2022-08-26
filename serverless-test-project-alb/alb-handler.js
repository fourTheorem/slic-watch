'use strict'

module.exports = {
  handleALB
}

async function handleALB (event, context) {
  console.log(event)
  const body = JSON.parse(event.body || '{}')
  console.log(body)
  if (body.triggerError) {
    throw new Error('Error triggered')
  } else {
    console.log('Successful event delivery')
    return {
      statusCode: 200,
      statusDescription: 'HTTP OK',
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify('Hello from Lambda!')
    }
  }
}
