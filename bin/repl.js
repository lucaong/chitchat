#!/usr/bin/env node

var chitchat = require('../lib/chitchat')
var scope    = { being: function() {} }

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdout.write('Welcome to ChitChat REPL!\n')
process.stdout.write('> ')

process.stdin.on('data', function ( input ) {
  if ( input === 'quit\n')
    done()
  try {
    console.log( chitchat.eval( input, scope ) )
  } catch ( error ) {
    console.log( 'error: ' + error )
  } finally {
    process.stdout.write('> ')
  }
});

function done() {
  console.log('See you soon :)')
  process.exit()
}
