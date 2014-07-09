# ChitChat, an educational object oriented language

*ChitChat* is a toy language designed to explain basic object oriented
programming concepts to absolute beginners.

NOTE: ChitChat is now still mainly an experiment. If you want to give it a try
is should not eat your laundry, but it might be buggy and generally not always
behaving as it is supposed to. I will try to make it better and well behaved if
there is interest in the project.


## Installation

`npm -g install chitchat-lang`


## How does it look like:

This is a valid ChitChat program:

```
a cat is a kind of being

when a cat is told "get off the sofa!" it replies "meow :)"

Tandoori is a cat

tell Tandoori "get off the sofa!"
```

Running this program should return `"meow :)"`

Another slightly more complex example:

```
a kid is a kind of being

when a kid is told "how old will you be in x years?" given x it replies its age + x

Jim is a kid

Jim's age is 7

tell Jim "how old will you be in x years?" given x: 3
```

This time the program should return `10`


## Getting started

There are currently three way to run a ChitChat program:

  1. The ChitChat REPL: just run `chitchat-repl`

  2. The web REPL: just open `web_repl/index.html` in the browser and type in
     your code

  3. Use it as an `npm` package:

     ```
     var chitchat = require('chitchat-lang')
     chitchat.eval('sum is 1 + 2')
     ```


## TODOs:

  - [x] More primitive types: `Float`, `Boolean`, `Nothing`
  - [x] Better comparison operator (maybe an `equals` keyword)
  - [x] `if` expression without an `else` clause
  - [ ] Support for arrays
