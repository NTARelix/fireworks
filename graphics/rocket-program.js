import { createProgram } from './create-program.js'
import { createShader } from './create-shader.js'
import { Rocket } from '../entities/rocket.js'
import { Spark } from '../entities/spark.js'

const VERTEX_SHADER_SOURCE = `#version 300 es
  in vec2 a_position;
  in vec4 a_color;
  out vec4 v_color;
  uniform mat3 u_projection_matrix;
  void main() {
    gl_Position = vec4((u_projection_matrix * vec3(a_position, 1)).xy, 0, 1);
    v_color = a_color;
  }
`

const FRAGMENT_SHADER_SOURCE = `#version 300 es
  precision mediump float;
  in vec4 v_color;
  out vec4 outColor;
  void main() {
    outColor = v_color;
  }
`

const WING_WIDTH_PX = 3
const HEIGHT_PX = 10
const MAX_ROCKET_COUNT = 1000
const VERTICES_PER_ROCKET = 3
const MAX_SPARK_COUNT = MAX_ROCKET_COUNT * 20
const VERTICES_PER_SPARK = 2 // head and tail
const DIMENSIONS = 2 // (X, Y)
const FLOAT_COUNT_PER_COLOR = 4 // RGBA

/**
 * @typedef {Function} RocketRenderer
 * @param {number} time
 * @param {Float32Array} projectionMatrix
 * @param {Rocket[]} rockets
 * @param {Spark[]} sparks
 */

/**
 * @param {WebGL2RenderingContext} gl
 * @returns {RocketRenderer}
 */
export function createRocketProgram(gl) {
  const rocketVertices = new Float32Array(MAX_ROCKET_COUNT * VERTICES_PER_ROCKET * 2)
  const rocketColors = new Float32Array(MAX_ROCKET_COUNT * VERTICES_PER_ROCKET * 4)
  const sparkVertices = new Float32Array(MAX_SPARK_COUNT * VERTICES_PER_SPARK)
  const sparkColors = new Float32Array(MAX_SPARK_COUNT * 4 * 2)
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE)
  const program = createProgram(gl, vertexShader, fragmentShader)
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const colorAttributeLocation = gl.getAttribLocation(program, 'a_color')
  const projectionMatrixUniformLocation = gl.getUniformLocation(program, 'u_projection_matrix')
  const positionBuffer = gl.createBuffer()
  const colorBuffer = gl.createBuffer()
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  // setup attributes
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.vertexAttribPointer(positionAttributeLocation, DIMENSIONS, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(colorAttributeLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
  gl.vertexAttribPointer(colorAttributeLocation, FLOAT_COUNT_PER_COLOR, gl.FLOAT, false, 0, 0)
  return function renderRockets(time, projectionMatrix, rockets, sparks) {
    gl.useProgram(program)
    gl.uniformMatrix3fv(projectionMatrixUniformLocation, false, projectionMatrix)
    for (let i = 0; i < rockets.length; i++) {
      const vertexIndex = i * VERTICES_PER_ROCKET * DIMENSIONS
      const colorIndex = i * VERTICES_PER_ROCKET * FLOAT_COUNT_PER_COLOR
      // nose
      rocketVertices[vertexIndex + 0] = rockets[i].getX()
      rocketVertices[vertexIndex + 1] = rockets[i].getY(time)
      rocketColors[colorIndex + 0] = 0.2
      rocketColors[colorIndex + 1] = 0.2
      rocketColors[colorIndex + 2] = 0.2
      rocketColors[colorIndex + 3] = 1
      // right wing
      rocketVertices[vertexIndex + 2] = rockets[i].getX() + WING_WIDTH_PX
      rocketVertices[vertexIndex + 3] = rockets[i].getY(time) - HEIGHT_PX
      rocketColors[colorIndex + 4] = 0.2
      rocketColors[colorIndex + 5] = 0.2
      rocketColors[colorIndex + 6] = 0.2
      rocketColors[colorIndex + 7] = 1
      // left wing
      rocketVertices[vertexIndex + 4] = rockets[i].getX() - WING_WIDTH_PX
      rocketVertices[vertexIndex + 5] = rockets[i].getY(time) - HEIGHT_PX
      rocketColors[colorIndex + 8] = 0.2
      rocketColors[colorIndex + 9] = 0.2
      rocketColors[colorIndex + 10] = 0.2
      rocketColors[colorIndex + 11] = 1
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, rocketVertices, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, rocketColors, gl.STATIC_DRAW)
    gl.drawArrays(gl.TRIANGLES, 0, rockets.length * 3)
    for (let i = 0; i < sparks.length; i++) {
      const vertexIndex = i * VERTICES_PER_SPARK * DIMENSIONS
      const colorIndex = i * VERTICES_PER_SPARK * FLOAT_COUNT_PER_COLOR
      const spark = sparks[i]
      // spark head
      const headDistance = spark.getHeadDistance(time)
      const headX = spark.startX + headDistance * Math.cos(spark.direction)
      const headY = spark.startY + headDistance * Math.sin(spark.direction)
      sparkVertices[vertexIndex + 0] = headX
      sparkVertices[vertexIndex + 1] = headY
      sparkColors[colorIndex + 0] = spark.color.r
      sparkColors[colorIndex + 1] = spark.color.g
      sparkColors[colorIndex + 2] = spark.color.b
      sparkColors[colorIndex + 3] = 1
      // spark tail
      const tailLength = Math.min(headDistance, spark.getTailLength(time))
      const tailX = spark.startX + (headDistance - tailLength) * Math.cos(spark.direction)
      const tailY = spark.startY + (headDistance - tailLength) * Math.sin(spark.direction)
      sparkVertices[vertexIndex + 2] = tailX
      sparkVertices[vertexIndex + 3] = tailY
      sparkColors[colorIndex + 4] = spark.color.r
      sparkColors[colorIndex + 5] = spark.color.g
      sparkColors[colorIndex + 6] = spark.color.b
      sparkColors[colorIndex + 7] = 1
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sparkVertices, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sparkColors, gl.STATIC_DRAW)
    gl.drawArrays(gl.LINES, 0, sparks.length * DIMENSIONS)
  }
}
