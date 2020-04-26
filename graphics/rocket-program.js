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
const MAX_ROCKET_COUNT = 1000
const VERTICES_PER_ROCKET = 6

/**
 * @typedef {Object} Rocket
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Function} RocketRenderer
 * @param {number} time
 * @param {ArrayBuffer} projectionMatrix
 * @param {Rocket[]} rockets
 */

/**
 * @param {WebGL2RenderingContext} gl
 * @returns {RocketRenderer}
 */
export function createRocketProgram(gl) {
  const rocketVertices = new Float32Array(MAX_ROCKET_COUNT * VERTICES_PER_ROCKET)
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
  return function renderRockets(time, projectionMatrix, rockets) {
    for (let i = 0; i < rockets.length; i++) {
      // nose
      rocketVertices[i * VERTICES_PER_ROCKET + 0] = rockets[i].getX()
      rocketVertices[i * VERTICES_PER_ROCKET + 1] = rockets[i].getY(time)
      // right wing
      rocketVertices[i * VERTICES_PER_ROCKET + 2] = rockets[i].getX() + WING_WIDTH_PX
      rocketVertices[i * VERTICES_PER_ROCKET + 3] = rockets[i].getY(time) - HEIGHT_PX
      // left wing
      rocketVertices[i * VERTICES_PER_ROCKET + 4] = rockets[i].getX() - WING_WIDTH_PX
      rocketVertices[i * VERTICES_PER_ROCKET + 5] = rockets[i].getY(time) - HEIGHT_PX
    }
    gl.bufferData(gl.ARRAY_BUFFER, rocketVertices, gl.STATIC_DRAW)
    gl.useProgram(program)
    gl.bindVertexArray(vao)
    gl.uniformMatrix3fv(projectionMatrixUniformLocation, false, projectionMatrix)
    gl.uniform4f(colorUniformLocation, 0.2, 0.2, 0.2, 1)
    gl.drawArrays(gl.TRIANGLES, 0, rockets.length * 3)
  }
}
