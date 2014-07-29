# ChitChat, an educational object oriented language

*ChitChat* is a toy language designed to explain basic object oriented
programming concepts to absolute beginners.

Its aim is not to be useful in real life, but to provide a smooth and playful
introduction to classes, objects, methods and properties before switching to a
real general-purpose language.

NOTE: _ChitChat_ is now still mainly an experiment. If you want to give it a try
is should not eat your laundry, but it might be buggy and generally not always
behaving as it is supposed to. I will try to make it better and well behaved if
there is interest in the project, and open-source contributions are more than
welcome!


## How does it look like:

This is a valid _ChitChat_ program, just to give an idea:

```
a cat is a kind of being

when a cat is told "get off the sofa!" it replies "meow :)"

Tandoori is a cat

tell Tandoori "get off the sofa!"
```

Running this program should return `"meow :)"`

For a more complete overview, read the [Introduction to the _ChitChat_
language](https://github.com/lucaong/chitchat/wiki)


## Getting started

There are currently three way to run a ChitChat program. In order from the
easiest from the more advanced:

  1. [Try ChitChat in your browser](http://lucaong.github.io/chitchat)

  2. Install it with `npm -g install chitchat-lang` and start the REPL with
     `chitchat-repl`

  3. Install it and require it as an `npm` package in your project:

     ```
     var chitchat = require('chitchat-lang')
     chitchat.eval('sum is 1 + 2')
     ```


## TODOs:

  - [x] More primitive types: `Float`, `Boolean`, `Nothing`
  - [x] Better comparison operator (maybe an `equals` keyword)
  - [x] `if` expression without an `else` clause
  - [ ] Support for arrays
