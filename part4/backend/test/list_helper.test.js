const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../for_testing/list_helper')

describe('list helper', () => {
  test('list helper always return 1', () => {
    assert.strictEqual(listHelper.dummy([2]), 1)
  })
})