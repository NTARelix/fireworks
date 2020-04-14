/**
 * @param {WebGL2RenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 * @returns {WebGLProgram}
 */
export function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const wasSuccessful = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (wasSuccessful) return program
  const errorLog = gl.getProgramInfoLog(program)
  gl.deleteProgram(program)
  throw new Error(errorLog)
}