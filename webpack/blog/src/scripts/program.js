import $ from 'jquery';
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);


console.log("program run");

// import '../style/style.css';
window.$ = $; // TODO: for development only


let circle = Snap("svg circle");
$("svg")
  .on("mouseover", "circle", function() {
    circle.animate({r: 100}, 400);
  })
  .on("mouseout", "circle", function() {
    circle.animate({r: 20}, 400);
  });




// import 'imports-loader?this=>window!mathjax/MathJax.js';

let message = "Hello worlds from JQuery";

$.map([1, 2, 3],
      (e)=>(
	$(`<h${e} />`,{
	  text: `Header: ${Math.sqrt(e+1)}.`
	}).appendTo($('body'))
      ));
[1, 2,"67",  3, 4].map(x=>console.log(x));
