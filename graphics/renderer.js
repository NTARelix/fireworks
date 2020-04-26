import { createMatrix, multiply, scaling, translation, toString } from './matrix3.js'
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
  const renderRockets = createRocketProgram(gl)
  const originAlignmentMatrix = createMatrix()
  const resolutionMatrix = createMatrix()
  const projectionMatrix = createMatrix()
  return function render(rockets) {
    multiply(
      projectionMatrix,
      scaling(resolutionMatrix, 2 / canvas.width, 2 / canvas.height),
      translation(originAlignmentMatrix, -1, -1),
    )
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    renderRockets(projectionMatrix, rockets)
  }
}
