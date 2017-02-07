define(["jquery", "glutils"], function ($, GL) {
    var gl = new GL($('.gl-ide canvas')[0], {
        vertSource:
"attribute vec4 a_vec4_combined;\
varying vec2 v_vec2_texCoord;\
void main() {\
  v_vec2_texCoord = a_vec4_combined.zw;\
  gl_Position = vec4(a_vec4_combined.xy, 0, 1);\
}",
        fragSource:
"precision mediump float;\
varying vec2 v_vec2_texCoord;\
void main() {\
  gl_FragColor = vec4(0, 0, 1, 1);\
}",
        attributes: {combined: "a_vec4_combined"}

    });
    gl.draw();
});
