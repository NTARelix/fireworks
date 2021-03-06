import { createMatrix, multiply, scaling, translation } from './matrix3.js'
import { createRocketProgram } from './rocket-program.js'
import { Rocket } from '../entities/rocket.js'

/**
 * @typedef {Function} Renderer
 * @param {number} time
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
  return function render(time, rockets, sparks) {
    multiply(
      projectionMatrix,
      scaling(resolutionMatrix, 2 / canvas.width, 2 / canvas.height),
      translation(originAlignmentMatrix, -1, -1),
    )
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    renderRockets(time, projectionMatrix, rockets, sparks)
  }
}
