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
        return config;
    }
    function glerror() {
        var error = gl.getError();
        switch (error) {
        case gl.NO_ERROR:
            return;
            break;
        case gl.INVALID_ENUM:
            throw new {name: "webgl error", message: "INVALID_ENUM"};
            break;
        case gl.INVALID_VALUE:
            throw new {name: "webgl error", message: "INVALID_VALUE"};
            break;
        case gl.INVALID_OPERATION:
            throw new {name: "webgl error", message: "INVALID_OPERATION"};
            break;
        case gl.INVALID_FRAMEBUFFER_OPERATION:
            throw new {name: "webgl error", message: "INVALID_FRAMEBUFFER_OPERATION"};
            break;
        case gl.OUT_OF_MEMORY:
            throw new {name: "webgl error", message: "OUT_OF_MEMORY"};
            break;
        case gl.CONTEXT_LOST_WEBGL:
            throw new {name: "webgl error", message: "CONTEXT_LOST_WEBGL"};
            break;
        default:
            throw new {name: "webgl error", message: "unspecified webgl error"};
        }
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
        // instance private
        var gl;
        var attributes = {}; // name => compiled name
        var uniforms = {};

        // instance public method
        this.init = function (canvas, config) { // TODO add callback
            config = init_config_default(config);
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
        };
        this.init(canvas, config);
        return this;
    }

    // class methods
    // GL.prototype.method = function ...


    return GL;
});
