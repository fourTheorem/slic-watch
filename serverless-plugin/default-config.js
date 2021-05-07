'use strict'

const { join } = require('path')
const { readFileSync } = require('fs')
const YAML = require('yaml')

const yamlConfigSource = readFileSync(join(__dirname, 'default-config.yaml'), 'utf-8')

module.exports = YAML.parse(yamlConfigSource)
