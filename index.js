import { createProgram } from './graphics/create-program.js'
import { createShader } from './graphics/create-shader.js'
import fragmentShaderSource from './graphics/shader-fragment.js'
import vertexShaderSource from './graphics/shader-vertex.js'

function main() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas')
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const gl = canvas.getContext('webgl2')
  if (!gl) return alert('Failed to create WebGL2 context. It is likely that you are running an older browser.')
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  const program = createProgram(gl, vertexShader, fragmentShader)
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color')
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  const positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
  ]
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
  const vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(positionAttributeLocation)
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.useProgram(program)
  gl.bindVertexArray(vao)
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height)
  gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1)
  gl.drawArrays(gl.TRIANGLES, 0, 6)
}

main()
