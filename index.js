import { createProgram } from './graphics/create-program.js'
import { createShader } from './graphics/create-shader.js'
import { createMatrix, projection } from './graphics/matrix3.js'
import rocketFragmentShaderSource from './graphics/rocket-shader-fragment.js'
import rocketVertexShaderSource from './graphics/rocket-shader-vertex.js'

function main() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas')
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const gl = canvas.getContext('webgl2')
  if (!gl) return alert('Failed to create WebGL2 context. It is likely that you are running an older browser.')
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, rocketVertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, rocketFragmentShaderSource)
  const program = createProgram(gl, vertexShader, fragmentShader)
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const projectionMatrixUniformLocation = gl.getUniformLocation(program, 'u_projection_matrix')
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = new Float32Array([
    // Top-left triangle
    10, 15,
    13, 30,
    7, 30,
  ])
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
  const projectionMatrix = createMatrix()
  projection(projectionMatrix, gl.canvas.width, gl.canvas.height)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)
  gl.bindVertexArray(vao)
  gl.uniformMatrix3fv(projectionMatrixUniformLocation, false, projectionMatrix)
  gl.uniform4f(colorUniformLocation, 0.2, 0.2, 0.2, 1)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
}

main()
