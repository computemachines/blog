// only for orientable surfaces
// there is no _DEdge#Flip()

import _ from 'lodash'

// represents a Directed Edge.
// has methods Onext, Rot
function DEdge(Onext, Rot) {
  this._Onext = Onext;
  this._Rot = Rot;
}
DEdge.prototype.onext = function() {
  return this._Onext
}
DEdge.prototype.rot = function() {
  return this._Rot
}


function QuadEdge() {}
QuadEdge.build = function (){
  let dedges = _.range(4).map(() => new DEdge())
  for (let i of _.range(4)) {
    dedges[i]._Rot = dedges[(i+1)%4]
  }
  return dedges
}


function splice(a, b) {
  
}

export {QuadEdge, DEdge as DEdge}
