/**
 * GL Utils module.
 * @module glutils
 */
define(['jquery'], function ($) {
    "use strict";
    // Module globals
    // var ...


    function init_config_default(config) {
        config = config || {};
        config.extenstions = config.extensions || [];
        config.attributes = config.attributes || {}; // name => source name
        config.uniforms    = config.uniforms || {};
        /**
         * only for debugging this module.
         * these should not ever be undefined
         */
        config.vertSource    = config.vertSource || "";
        config.fragSource    = config.fragSource || "";

        return config;
    }

    function glerror(gl) {
        var error = gl.getError();
        switch (error) {
        case gl.NO_ERROR:
            return;
            break;
        case gl.INVALID_ENUM:
            throw new Error("gl.INVALID_ENUM");
            break;
        case gl.INVALID_VALUE:
            throw new Error("gl.INVALID_VALUE");
            break;
        case gl.INVALID_OPERATION:
            throw new Error("gl.INVALID_OPERATION");
            break;
        case gl.INVALID_FRAMEBUFFER_OPERATION:
            throw new Error("gl.INVALID_FRAMEBUFFER_OPERATION");
            break;
        case gl.OUT_OF_MEMORY:
            throw new Error("gl.OUT_OF_MEMORY");
            break;
        case gl.CONTEXT_LOST_WEBGL:
            throw new Error("gl.CONTEXT_LOST_WEBGL");
            break;
        default:
            throw new Error("unspecified webgl error");
        }
    }

    function createShader(gl, source, type) {
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
        glerror(gl);
        return shader;
    }

    function createProgram(gl, vertSource, fragSource) {
        var program = gl.createProgram();
        glerror(gl);

        var vertShader = createShader(gl, vertSource, gl.VERTEX_SHADER);
        var fragShader = createShader(gl, fragSource, gl.FRAGMENT_SHADER);

        gl.attachShader(program, vertShader);
        glerror(gl);

        gl.attachShader(program, fragShader);
        glerror(gl);

        gl.linkProgram(program);
        glerror(gl);

        var linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linkStatus) {
            console.log("program failed to link");
        }

        return program;
    }

    /**
     * Wrapper for a webgl context.
     * @constructor
     * @param {HTMLCanvasElement} canvas the source of the webgl context
     * @param {Array} config.extensions required webgl extensions
     * @param {Object} config.attributes map from attribute to name within shader source
     * @param {Object} config.uniforms map from uniform to name within shader source
     * @throws
     */
    function GL(canvas, config) {
        config = init_config_default(config);
        // instance private
        var gl;
        var attributes = {}; // name => compiled name
        var uniforms = {};
        var program;
        var buffer;

        // instance public method
        this.init = function (canvas, config) { // TODO add callback
            gl = canvas.getContext("webgl");
            if (!gl) {
                throw new {
                    name: "webgl error",
                    message: "could not acquire webgl context on: "+canvas,
                    canvas: canvas
                };
            }

            for (var extenstion in config.extenstions) {
                if (!gl.getExtenstion(extenstion)) {
                    throw new {
                        name: "webgl error",
                        extenstion: extenstion,
                        message: "extenstion: "+ extension +"not supported"
                    };
                }
            }
            program = createProgram(gl, config.vertSource, config.fragSource);

            for (var uniform in config.uniforms) {
                uniforms[uniform] = gl.getUniformLocation(program, config.uniforms[uniform]);
            }
            for (var attribute in config.attributes) {
                attributes[attribute] = gl.getAttribLocation(program, config.attributes[attribute]);
            }

            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                1., 1., 1., 1.,
                -1., 1., 0., 1.,
                1., -1., 1., 0.,
                -1, -1, 0, 0
            ]), gl.STATIC_DRAW);

            gl.clearColor(0., 0., 0., 1.);
        };
        this.draw = function() {
            glerror(gl);
            gl.useProgram(program);

            gl.enableVertexAttribArray(attributes.position);
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            glerror(gl);
            gl.vertexAttribPointer(attributes.combined, 4, gl.FLOAT, false, 0, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        this.init(canvas, config);
        return this;
    }

    // class methods
    // GL.prototype.method = function ...


    return GL;
});
