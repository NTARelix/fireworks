/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} type
 * @param {string} source
 * @returns {WebGLShader}
 */
export function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const wasSuccessful = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (wasSuccessful) return shader
  const errorLog = gl.getShaderInfoLog(shader)
  gl.deleteShader(shader)
  throw new Error(errorLog)
}
