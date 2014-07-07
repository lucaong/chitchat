var Lexer = require('lex')

var lexer = new Lexer

var keywords = ['a', 'an', 'has', 'when', 'is', 'told',
                'given', 'it', 'replies', 'her', 'his', 'its',
                'tell', 'kind', 'of', 'if', 'then', 'else']

var keywordAliases = { an: 'a', her: 'its', his: 'its' }

lexer.addRule(/a kind of/, function( lexeme ) {
  this.yytext = lexeme
  return "KINDOF"
})

lexer.addRule(/is told/, function( lexeme ) {
  this.yytext = lexeme
  return "TOLD"
})

lexer.addRule(/(she|he|it) replies/, function( lexeme ) {
  this.yytext = lexeme
  return "REPLIES"
})

lexer.addRule(/when (a|an)/, function( lexeme ) {
  this.yytext = lexeme
  return "WHEN"
})

lexer.addRule(/and|,/, function( lexeme ) {
  this.yytext = lexeme
  return "SEPARATOR"
})

lexer.addRule(/[a-z]\w*/i, function( lexeme ) {
  if ( keywords.indexOf( lexeme ) != -1 ) {
    var keyword = keywordAliases[ lexeme ] || lexeme
    return keyword.toUpperCase()
  } else {
    this.yytext = lexeme
    return "IDENTIFIER"
  }
})

lexer.addRule(/\d+/, function( lexeme ) {
  this.yytext = lexeme
  return "INTEGER"
})

lexer.addRule(/"([^"]*)"/, function( lexeme, str ) {
  this.yytext = str
  return "STRING"
})

lexer.addRule(/\n+/, function( lexeme ) {
  this.yytext = lexeme
  return "EOL"
})

lexer.addRule(/&&|\|\||!=|<=|>=/, function( lexeme ) {
  this.yytext = lexeme
  return lexeme
})

lexer.addRule(/\s+/, function() { /* ignore spaces */ })

lexer.addRule(/'s?/, function( lexeme ) {
  this.yytext = lexeme
  return "SQUOTE"
})

lexer.addRule(/\{/, function( lexeme ) {
  this.yytext = lexeme
  return "BLOCKSTART"
})

lexer.addRule(/\}/, function( lexeme ) {
  this.yytext = lexeme
  return "BLOCKEND"
})

lexer.addRule(/\+|\*|\-|\/|:|\(|\)|!|;|=|>|</, function( lexeme ) {
  this.yytext = lexeme
  return lexeme
})

module.exports = lexer
