define(["jquery", "glutils"], function ($, GL) {
    var gl = new GL($('.gl-ide canvas')[0], {
        vertSource:
        "attribute vec4 a_vec4_combined;\n" +
            "varying vec2 v_vec2_texCoord;\n" +
            "void main() {\n" +
            "  v_vec2_texCoord = a_vec4_combined.zw;\n" +
            "  gl_Position = vec4(a_vec4_combined.xy, 0, 1);\n" +
            "}",
        fragSource:
        "precision mediump float;\n" +
        "varying vec2 v_vec2_texCoord;\n" +
            "void main() {\n" +
            "  gl_FragColor = vec4(0, 1, 0, 1);\n;" +
            "}",
        attributes: {combined: "a_vec4_combined"}

    });
    gl.draw();
});
