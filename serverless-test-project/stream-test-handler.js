'use strict'

const Kinesis = require('aws-sdk/clients/kinesis')
const kin = new Kinesis()

const { STREAM_NAME } = process.env

async function handleDrive (event) {
  console.log(`Sending events to ${STREAM_NAME}`)
  const items = [...new Array(500)].map((_, index) => ({
    index,
    createdAt: new Date().toISOString()
  }))
  await kin.putRecords({
    Records: items.map(item => ({
      Data: JSON.stringify(item),
      PartitionKey: 'a'
    })),
    StreamName: STREAM_NAME
  }).promise()
  console.log('Sent events')
}

module.exports = {
  handleDrive
}
