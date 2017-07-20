import $ from 'jquery'
import _ from 'lodash'
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

function circle_verts(radius, center=[0, 0], num=10) {
  let angles = _.range(num).map(i => i*2*Math.PI/num)
  return _.map(angles, angle => [
    radius*Math.cos(angle) + center[0],
    radius*Math.sin(angle) + center[1]
  ])
}

function draw_verts(snap, verts) {
  for (let [x, y] of verts) {
    snap.circle(x, y, 5).attr({fill: "black", strokeWidth: 0})
  }
}

function init_visual() {
  let s1 = Snap('#triangulated')

  let verts = circle_verts(100, [150, 150], 20)
  
  s1.polygon(
    verts
  ).attr({
    fill: "white",
    stroke: "black",
    strokeWidth: 1
  })
  draw_verts(s1, verts)
}

function register() {
  init_visual()
}

export {register}
