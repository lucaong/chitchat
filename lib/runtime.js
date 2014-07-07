var runtime = {
  Util: {
    merge: function() {
      var args = ([]).slice.call( arguments )
      var obj = {}
      for ( i in args ) {
        for ( key in args[ i ] ) {
          obj[ key ] = args[ i ][ key ]
        }
      }
      return obj
    }
  },

  AST: {
    Expressions: (function() {
      var klass = function( expressions ) {
        this.expressions = expressions
      }

      klass.prototype.eval = function( scope ) {
        var _return
        var returned = false
        this.expressions.forEach(function( expression ) {
          if ( returned === false ) {
            _return = expression.eval( scope )
          if ( expression.isReturn )
            returned = true
          }
        })
        return _return
      }

      return klass
    })(),

    Integer: (function() {
      var klass = function( str ) {
        this.value = Number( str )
      }

      klass.prototype.eval = function() {
        return this.value
      }

      return klass
    })(),

    String: (function() {
      var klass = function( str ) {
        this.value = str
      }

      klass.prototype.eval = function() {
        return this.value
      }

      return klass
    })(),

    MethodCall: (function() {
      var klass = function( receiver, message, args ) {
        this.receiver = receiver
        this.message  = message
        this.args     = args
      }

      klass.prototype.eval = function( scope ) {
        var args = this.args.reduce(function( obj, arg ) {
          obj[ arg.name ] = arg.value.eval( scope )
          return obj
        }, {})
        var receiver = this.receiver.eval( scope )
        return receiver[ this.message ]( runtime.Util.merge( args, { __self: receiver } ) )
      }

      return klass
    })(),

    Operator: (function() {
      var klass = function( left, operator, right ) {
        this.left     = left
        this.operator = operator
        this.right    = right
      }

      klass.prototype.eval = function( scope ) {
        switch ( this.operator ) {
          case '||':
            return this.left.eval( scope ) || this.right.eval( scope )
          case '&&':
            return this.left.eval( scope ) && this.right.eval( scope )
          case '=':
            return this.left.eval( scope ) == this.right.eval( scope )
          case '!=':
            return this.left.eval( scope ) != this.right.eval( scope )
          case '>':
            return this.left.eval( scope ) > this.right.eval( scope )
          case '>=':
            return this.left.eval( scope ) >= this.right.eval( scope )
          case '<':
            return this.left.eval( scope ) < this.right.eval( scope )
          case '<=':
            return this.left.eval( scope ) <= this.right.eval( scope )
          case '*':
            return this.left.eval( scope ) * this.right.eval( scope )
          case '/':
            return this.left.eval( scope ) / this.right.eval( scope )
          case '+':
            return this.left.eval( scope ) + this.right.eval( scope )
          case '-':
            return this.left.eval( scope ) - this.right.eval( scope )
          default:
            throw "Unknown operator " + this.operator
        }
      }

      return klass
    })(),

    GetVar: (function() {
      var klass = function( name ) {
        this.name = name
      }

      klass.prototype.eval = function( scope ) {
        return scope[ this.name ]
      }

      return klass
    })(),

    SetVar: (function() {
      var klass = function( name, value ) {
        this.name  = name
        this.value = value
      }

      klass.prototype.eval = function( scope ) {
        var value = this.value.eval( scope )
        scope[ this.name ] = value
        return value
      }

      return klass
    })(),

    SetProp: (function() {
      var klass = function( object, property, value ) {
        this.object   = object
        this.property = property
        this.value    = value
      }

      klass.prototype.eval = function( scope ) {
        var object = this.object.eval( scope )
        var value  = this.value.eval( scope )
        object[ this.property ] = value
        return value
      }

      return klass
    })(),

    GetProp: (function() {
      var klass = function( object, property ) {
        this.object   = object
        this.property = property
      }

      klass.prototype.eval = function( scope ) {
        return this.object.eval( scope )[ this.property ]
      }

      return klass
    })(),

    MethodDef: (function() {
      var klass = function( className, message, args, body ) {
        this.className = className
        this.message   = message
        this.args      = args
        this.body      = body
      }

      klass.prototype.eval = function( scope ) {
        var _class = scope[ this.className ]
        var self = this
        if ( _class == null )
          throw "Undefined class " + this.className
        _class.prototype[ this.message ] = function( callArgs ) {
          var callNames = Object.keys( callArgs ).sort().filter(function( a ) { return a != '__self' })
          if ( !self.args.sort().every( function( arg, i ) { return arg == callNames[i] } ) )
            throw 'Invalid arguments. Expected: ' + self.args.join(', ') + '. given: ' + callNames.join(', ')
          return self.body.eval( runtime.Util.merge( scope, callArgs ) )
        }
        return _class
      }

      return klass
    })(),

    ClassDef: (function() {
      var klass = function( name, superclass ) {
        this.name       = name
        this.superclass = superclass
      }

      klass.prototype.eval = function( scope ) {
        var _class     = function() {}
        var superclass = this.superclass.eval( scope )
        _class.prototype = Object.create( superclass.prototype )
        scope[ this.name ] = _class
        return _class
      }

      return klass
    })(),

    NewObject: (function() {
      var klass = function( _class ) {
        this._class = _class
      }

      klass.prototype.eval = function( scope ) {
        var _class = this._class.eval( scope )
        return new _class()
      }

      return klass
    })(),

    If: (function() {
      var klass = function( condition, thenBlock, elseBlock ) {
        this.condition = condition
        this.thenBlock = thenBlock
        this.elseBlock = elseBlock
      }

      klass.prototype.eval = function( scope ) {
        if ( this.condition.eval( scope ) )
          return this.thenBlock.eval( scope )
        else
          return this.elseBlock.eval( scope )
      }

      return klass
    })(),

    Self: (function() {
      var klass = function() {}

      klass.prototype.eval = function( scope ) {
        return scope.__self
      }

      return klass
    })(),

    Return: (function() {
      var klass = function( expression ) {
        this.expression = expression
      }

      klass.prototype.eval = function( scope ) {
        return this.expression.eval( scope )
      }
      
      klass.prototype.isReturn = true

      return klass
    })()
  }
}

module.exports = runtime
