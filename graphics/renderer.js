import { createMatrix, projection } from './matrix3.js'
import { createRocketProgram } from './rocket-program.js'

/**
 * @typedef {Object} Rocket
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Function} Renderer
 * @param {Rocket[]} rockets
 */

/**
 * @param {HTMLCanvasElement} canvas
 * @returns {Renderer}
 */
export function createRenderer(canvas) {
  const gl = canvas.getContext('webgl2')
  if (!gl) return alert('Failed to create WebGL2 context. It is likely that you are running an older browser.')
  const renderRockets = createRocketProgram(gl, 20)
  const projectionMatrix = createMatrix()
  return function render(rockets) {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    projection(projectionMatrix, canvas.width, canvas.height)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    renderRockets(projectionMatrix, rockets)
  }
}
