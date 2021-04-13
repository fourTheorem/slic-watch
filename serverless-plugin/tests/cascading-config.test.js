'use strict'

const { test } = require('tap')

const { compile } = require('../cascading-config')

test('No overrides cascades everything down', (t) => {
  const input = {
    a: 1,
    b: 2,
    sub1: {
      c: 3,
      sub2_1: {
        d: 100,
      },
    },
    sub2: {
      c: 4,
    },
  }
  const expected = {
    a: 1,
    b: 2,
    sub1: {
      a: 1,
      b: 2,
      c: 3,
      sub2_1: {
        a: 1,
        b: 2,
        c: 3,
        d: 100,
      },
    },
    sub2: {
      a: 1,
      b: 2,
      c: 4,
    },
  }
  const compiled = compile(input)
  t.same(compiled, expected)
  t.end()
})

test('Overrides prevent cascading', (t) => {
  const input = {
    a: 1,
    b: 2,
    c: 7,
    sub1: {
      c: 3,
      sub2_1: {
        c: 100,
      },
    },
    sub2: {
      c: 4,
    },
  }
  const expected = {
    a: 1,
    b: 2,
    c: 7,
    sub1: {
      a: 1,
      b: 2,
      c: 3,
      sub2_1: {
        a: 1,
        b: 2,
        c: 100,
      },
    },
    sub2: {
      a: 1,
      b: 2,
      c: 4,
    },
  }
  const compiled = compile(input)
  t.same(compiled, expected)
  t.end()
})

test('Circular dependencies cause an error', (t) => {
  const input = {
    a: 1,
    b: 2,
    c: 7,
    sub1: {
      c: 3,
      sub2_1: {},
    },
    sub2: {
      c: 4,
    },
  }
  input.sub1.sub2_1.sub_2_1_circ = input

  t.throws(() => compile(input))
  t.end()
})
