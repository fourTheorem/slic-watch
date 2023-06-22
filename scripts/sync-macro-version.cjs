#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

/**
 * Script to update the major version used in the CloudFormation macro
 * name when the Node.js package major version is updated
 */
const { version } = require('../package.json')
const majorVer = version.split('.')[0]

const templatePath = path.resolve(__dirname, '..', 'cf-macro', 'template.yaml')
const template = fs.readFileSync(templatePath).toString('utf8')

const updatedTemplate = template.replace(/SlicWatch-v\d+/g, `SlicWatch-v${majorVer}`).replace(/SemanticVersion: .*(\s)/g, `SemanticVersion: ${version}$1`)
fs.writeFileSync(templatePath, updatedTemplate)
