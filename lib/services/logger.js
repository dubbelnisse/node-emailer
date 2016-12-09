'use strict'

const chalk = require('chalk')
const moment = require('moment')
const levels = ['none', 'error', 'warn', 'info', 'debug']

function logLevel (level) {
  process.env.LOG_LEVEL = process.env.LOG_LEVEL || 'info'
  return levels.indexOf(level) <= levels.indexOf(process.env.LOG_LEVEL)
}

function time () {
  return chalk.blue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)
}

function debug (component, msg) {
  if (!logLevel('debug')) { return }
  component = chalk.gray(`[${component}]`)
  msg = chalk.gray(Array.from(arguments).slice(1).join(' | '))
  console.log(`${time()} ${component} ${msg}`)
}

function info (component, msg) {
  if (!logLevel('info')) { return }
  component = chalk.white(`[${component}]`)
  msg = chalk.white(Array.from(arguments).slice(1).join(' | '))
  console.info(`${time()} ${component} ${msg}`)
}

function warn (component, msg) {
  if (!logLevel('warn')) { return }
  component = chalk.yellow(`[${component}]`)
  msg = chalk.yellow(Array.from(arguments).slice(1).join(' | '))
  console.warn(`${time()} ${component} ${msg}`)
}

function error (component, err) {
  if (!logLevel('error')) { return }
  component = chalk.red(`[${component}]`)
  if (err.message) {
    const msg = chalk.red(`${err.message}\n\t${err.stack}`)
    console.error(`${time()} ${component} ${msg}`)
  } else {
    console.error(`${time()} ${component} ${err}`)
  }
}

module.exports = (component) => {
  return {
    debug: debug.bind(null, component),
    info: info.bind(null, component),
    warn: warn.bind(null, component),
    error: error.bind(null, component)
  }
}
