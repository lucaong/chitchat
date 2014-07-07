var parser   = require('./parser').parser
parser.lexer = require('./lexer')
parser.yy    = require('./runtime')

module.exports = {
  parse: function( code ) {
    return parser.parse( code )
  },
  eval: function( code, scope ) {
    if ( scope == null )
      scope = { being: function() {} }
    return parser.parse( code ).eval( scope )
  }
}
