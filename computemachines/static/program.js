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
            attributes.combined = gl.getAttribLocation(program, "a_vec4_combined");
            uniforms.mouse = gl.getUniformLocation(program, "u_vec2_mouse");
            return program;
        }();

        var buffer = function() {
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

            return buffer;
        }();

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
        };

    });

    //draw();
});
