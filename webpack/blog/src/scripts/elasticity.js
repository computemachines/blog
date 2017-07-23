import $ from 'jquery'
import _ from 'lodash'

import Delaunay from 'delaunay-fast'
window.Delaunay = Delaunay


const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

function circle_verts(radius, center=[0, 0], darc=10) {
  let verts = []
  let num_verts = Math.round(2*Math.PI*radius/darc)
  for (let i of _.range(num_verts)) {
    let angle = i*2*Math.PI/num_verts
    verts.push([
      radius*Math.cos(angle) + center[0],
      radius*Math.sin(angle) + center[1]
    ])
  }
  return verts
}

function draw_verts(snap, verts) {
  for (let [x, y] of verts) {
    snap.circle(x, y, 5).attr({fill: "black", strokeWidth: 0})
  }
}

function init_visual() {
  let s1 = Snap('#triangulated')

  let lineattr = {
    fill: "white",
    stroke: "black",
    strokeWidth: 1
  }
  
  // s1.polygon(
  //   verts
  // ).attr({
  //   fill: "white",
  //   stroke: "black",
  //   strokeWidth: 1
  // })
  // for (let [x, y] of verts) {
  //   s1.line(150, 150, x, y).attr(lineattr)
  // }
  s1.circle(150, 150, 5).attr(lineattr)

  let verts = _.flatMap(
    _.range(100, 50, -10),
    r => circle_verts(r, [150, 150], 10)
  )
  let edgeIndicies = Delaunay.triangulate(verts)

  for (let [i, j, k] of _.chunk(edgeIndicies, 3)) {
    s1.polygon(...verts[i], ...verts[j], ...verts[k]).attr(lineattr)
  }
  
  console.log(edgeIndicies.length, verts.length)
  //draw_verts(s1, verts)
}

function register() {
  init_visual()
}

export {register}
