'use strict'

/**
 * Handle Kinesis stream event source mapping events
 */
module.exports.handle = async (event, context) => {
  for (const record of event.Records) {
    const item = JSON.parse(Buffer.from(record.kinesis.data, 'base64'))
    console.log(item)
    if (item.triggerError) {
      throw new Error('Error triggered')
    }
  }
  return {}
}
