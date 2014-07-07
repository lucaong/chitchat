var expect = require('chai').expect
var cc     = require('../lib/chitchat')

describe('chitchat', function() {
  it('perform simple arithmetics', function() {
    expect( cc.eval('5 * 4 / 2 + 7 - 2') ).to.equal( 15 )
  })

  it('respect parenthesis', function() {
    expect( cc.eval('(3 * (2 + 5) + 4) / 5') ).to.equal( 5 )
  })

  it('defines classes', function() {
    expect( cc.eval('a cat is a kind of being') ).to.be.a('function')
  })

  it('defines methods', function() {
    expect(
      cc.eval('when a being is told "hello" it replies "hi"; Kit is a being; tell Kit "hello"')
    ).to.equal('hi')
  })

  it('defines methods with args', function() {
    expect(
      cc.eval('when a being is told "sum x and y" given x and y it replies x + y; Kit is a being; tell Kit "sum x and y" given x: 2 and y: 3')
    ).to.equal(5)
  })

  it('defines methods with blocks', function() {
    expect(
      cc.eval('when a being is told "sum x and y" given x and y { sum is x + y; it replies sum }; Kit is a being; tell Kit "sum x and y" given x: 2 and y: 3')
    ).to.equal(5)
  })

  it('extend classes', function() {
    expect(
      cc.eval('a cat is a kind of being; a nyan is a kind of cat; when a cat is told "hello" it replies "meow"; Kit is a nyan; tell Kit "hello"')
    ).to.equal('meow')
  })

  it('access properties', function() {
    expect(
      cc.eval("Kit is a being; Kat is a being; Kit's age is 3; Kat's friend is Kit; Kat's friend's age")
    ).to.equal(3)
  })

  it('defines variables', function() {
    expect(
      cc.eval("sum is 3 + 2; sum")
    ).to.equal(5)
  })

  it('provides if/then/else', function() {
    expect(
      cc.eval('if 3 = 2 then "hi" else "ho"')
    ).to.equal('ho')
  })
})
