define(["jquery", "codeflask"], function ($, CodeFlask) {
    var flask = new CodeFlask;
    flask.runAll('.gl-editor', {language: "glsl"});
});
