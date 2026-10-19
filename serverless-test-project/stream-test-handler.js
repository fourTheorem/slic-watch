'use strict'

const { KinesisClient, PutRecordsCommand } = require('@aws-sdk/client-kinesis')
const kin = new KinesisClient({})

const { STREAM_NAME } = process.env

async function handleDrive (event) {
  console.log(`Sending events to ${STREAM_NAME}`)
  const items = [...new Array(500)].map((_, index) => ({
    index,
    createdAt: new Date().toISOString(),
    ...event // Propagate event so the received can behave in required ways
  }))
  await kin.send(new PutRecordsCommand({
    Records: items.map(item => ({
      Data: Buffer.from(JSON.stringify(item)),
      PartitionKey: 'a'
    })),
    StreamName: STREAM_NAME
  }))
  console.log('Sent events')
}

module.exports = {
  handleDrive
}
