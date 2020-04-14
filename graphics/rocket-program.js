import { createProgram } from './create-program.js'
import { createShader } from './create-shader.js'

const VERTEX_SHADER_SOURCE = `#version 300 es
  in vec2 a_position;
  uniform mat3 u_projection_matrix;
  void main() {
    gl_Position = vec4((u_projection_matrix * vec3(a_position, 1)).xy, 0, 1);
  }
`

const FRAGMENT_SHADER_SOURCE = `#version 300 es
  precision mediump float;
  uniform vec4 u_color;
  out vec4 outColor;
  void main() {
    outColor = u_color;
  }
`

const WING_WIDTH_PX = 3
const HEIGHT_PX = 10

/**
 * @typedef {Object} Rocket
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Function} RocketRenderer
 * @param {ArrayBuffer} projectionMatrix
 * @param {Rocket[]} rockets
 */

/**
 * @param {WebGL2RenderingContext} gl
 * @param {number} capacity Max number of rockets to be rendered
 * @returns {RocketRenderer}
 */
export function createRocketProgram(gl, capacity) {
  const rocketVertices = new Float32Array(capacity * 3)
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
  const program = createProgram(gl, vertexShader, fragmentShader)
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const projectionMatrixUniformLocation = gl.getUniformLocation(program, 'u_projection_matrix')
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
  return function renderRockets(projectionMatrix, rockets) {
    for (let i = 0; i < rockets.length; i++) {
      // nose
      rocketVertices[i * 6 + 0] = rockets[i].x
      rocketVertices[i * 6 + 1] = rockets[i].y
      // right wing
      rocketVertices[i * 6 + 2] = rockets[i].x + WING_WIDTH_PX
      rocketVertices[i * 6 + 3] = rockets[i].y + HEIGHT_PX
      // left wing
      rocketVertices[i * 6 + 4] = rockets[i].x - WING_WIDTH_PX
      rocketVertices[i * 6 + 5] = rockets[i].y + HEIGHT_PX
    }
    gl.bufferData(gl.ARRAY_BUFFER, rocketVertices, gl.STATIC_DRAW)
    gl.useProgram(program)
    gl.bindVertexArray(vao)
    gl.uniformMatrix3fv(projectionMatrixUniformLocation, false, projectionMatrix)
    gl.uniform4f(colorUniformLocation, 0.2, 0.2, 0.2, 1)
    gl.drawArrays(gl.TRIANGLES, 0, rockets.length * 3)
  }
}
