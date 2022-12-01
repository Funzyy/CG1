import { WebGLRuntimeError } from "../error/webgl-runtime-error.js";

export function glSafeCall(gl, call, ...attr) {
  const error = gl.getError();
  if (error !== gl.NO_ERROR) {
    throw new WebGLRuntimeError(`Already found WebGL Error before ${call}: ${error}`);
  }


  const result = call.apply(gl, attr);

  {
    const error = gl.getError();
    if (error !== gl.NO_ERROR) {
      throw new WebGLRuntimeError(`WebGL Error: ${call} returned: ${error}`);
    }
  }

  return result;
}
