#!/usr/bin/env node

var readline = require('readline')
var read     = readline.createInterface( process.stdin, process.stdout )
var prefix   = '> '
var chitchat = require('../lib/chitchat')
var scope    = { being: function() {} }

read.on('line', function( input ) {
  try {
    console.log( chitchat.eval( input, scope ) )
  } catch ( error ) {
    console.log( 'error: ' + error )
  } finally {
    read.setPrompt( prefix, prefix.length )
    read.prompt()
  }
}).on('close', function() {
  console.log('See you soon :)')
  process.exit(0)
})

console.log('Welcome to ChitChat REPL!')
read.setPrompt( prefix, prefix.length )
read.prompt()
