$(function() {
    $(".gl-ide canvas.gl-canvas").each(function(index) {
        var canvas = $(this);
        var mouse = {x: 100, y: 100};
        canvas.mousemove(function(e) {
            // important: correct mouse position:
            var rect = this.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            i = 0, r;
            mouse.x = x;
            mouse.y = y;
            draw();
        });

        var gl = canvas[0].getContext("webgl");
        if (!gl.getExtension("OES_standard_derivatives")) {
            throw new Error("does not support OES_standard_derivatives");
        }
        var attributes = {};
        var uniforms = {};

        var createShader = function(source, type) {
            //type = gl.VERTEX_SHADER;
            //type = gl.FRAGMENT_SHADER;
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            var compileStatus = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compileStatus) {
                console.log("failed to compile: "+source);
                console.log(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return;
            }
            return shader;
        };

        var program = function() {
            var vertShader = createShader(
                $(".vert-shader.common-shader").text(), gl.VERTEX_SHADER);
            var fragShaderCommonSource = $(".frag-shader.common-shader").text();
            var fragShaderLocalSource = canvas.next().children(".frag-shader").text();
            var fragShader = createShader(
                fragShaderCommonSource + fragShaderLocalSource, gl.FRAGMENT_SHADER);
            var program = gl.createProgram();
            glerror();
            gl.attachShader(program, vertShader);
            glerror();
            gl.attachShader(program, fragShader);
            glerror();
            gl.linkProgram(program);
            glerror();
            var linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linkStatus) {
                console.log("program failed to link");
                return;
            }
            attributes.combined = gl.getAttribLocation(program, "a_vec4_combined");
            uniforms.mouse = gl.getUniformLocation(program, "u_vec2_mouse");
            return program;
        }();

        var buffer = function() {
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            var verts = [
                1., 1., 1., 1.,
                -1., 1., 0., 1.,
                1., -1., 1., 0.,
                -1, -1, 0, 0
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
            return buffer;
        }();
        gl.clearColor(0., 0., 0., 1.);

        var draw = function() {
            glerror();
            gl.useProgram(program);
            gl.enableVertexAttribArray(attributes.position);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            glerror();
            gl.vertexAttribPointer(attributes.combined, 4, gl.FLOAT, false, 0, 0);
            glerror();
            console.log("mouse: ", mouse);
            gl.uniform2f(uniforms.mouse, mouse.x/canvas[0].offsetWidth, 1-mouse.y/canvas[0].offsetHeight);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

    });

    //draw();
});
