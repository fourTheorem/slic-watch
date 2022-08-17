const lambda = require('../index.js')
// test
const template = require('./event.json')

// const event = { fragment: JSON.stringify(template) }
const event = { fragment: template }
const result = lambda.handler(event, null)

console.log(result)
