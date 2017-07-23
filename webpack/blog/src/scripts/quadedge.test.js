import {assert} from 'chai'

import {QuadEdge, DEdge} from './quadedge'

//var assert = require('assert')

// topological tests
describe('Simple Edge', function() {
  let edge = QuadEdge.build()
  let dedge = edge[0]

  describe('QuadEdge', function() {
    it('should have 4 DEdges', function() {
      assert.lengthOf(edge, 4)
    })
  })
  describe('DEdge', function() {
    describe('.rot', function() {
      it('should be 4-cyclic', function() {
	assert.equal(dedge.rot().rot().rot().rot(), dedge)
      })
      it('should not return self (not self-dual)', function() {
	assert.notEqual(dedge.rot(), dedge)
      })
    })
  })
})
