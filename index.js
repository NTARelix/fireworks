import { createRenderer } from './graphics/renderer.js'

function main() {
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById('canvas')
  const render = createRenderer(canvas)
  const rockets = [
    { x: 750, y: 500 },
    { x: 100, y: 200 },
    { x: 1000, y: 20 },
    { x: 1500, y: 800 },
  ]
  render(rockets)
}

main()
