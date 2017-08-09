import $ from 'jquery';
import _ from 'lodash';

import {makeEdge, connect, deleteEdge, swap} from '@computemachines/subdivision';

const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);


const forwardTransform =
      p => [p[0]*100 + 150, p[1]*100 + 150];
const backwardTransform =
      p => [(p[0] - 150)/100, (p[1] - 150)/100];

const points = [
  [-0.50, 0.5],
  [0.75, 0.5],
  [0.50, -0.5],
  [-0.75, -0.5]
].map(forwardTransform);

const edges = [
  makeEdge(points[0], points[3]),
  makeEdge(points[1], points[2]).sym(),
];
edges.push(connect(edges[0], edges[1]));
edges.push(connect(edges[1], edges[0]));
edges.push(connect(edges[0], edges[3]));
swap(edges[4]);


function draw_verts(snap, verts) {
  for (let [x, y] of verts) {
    snap.circle(x, y, 5).attr({fill: "black", strokeWidth: 0});
  }
}

function average(a, b) {
  return [(a[0]+b[0])/2, (a[1]+b[1])/2];
}

// [a, b, c, d] => edge(a to b) + edge(c to d)
function draw_edges(snap, edges) {
  for (let edge of edges) {
    let line = snap.polyline(...edge.org(),
			     ...average(edge.org(), edge.dest()),
			     ...edge.dest());
    line.attr({
      stroke: 'black',
      strokeWidth: 3
    });
    $('polyline').attr("marker-mid", "url(#triangle)");
  }
}

function init_visual() {
  let s1 = Snap('#triangulated');
  draw_verts(s1, points);
  draw_edges(s1, edges);
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

  // let verts = _.flatMap(
  //   _.range(100, 50, -10),
  //   r => circle_verts(r, [150, 150], 10)
  // );
  
  //draw_verts(s1, verts)
}

function register() {
  init_visual();
}

export {register}
