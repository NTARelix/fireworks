import { createRenderer } from './graphics/renderer.js'

function main() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const render = createRenderer(canvas)
  const rockets = [
    { x: 750, y: 500 },
    { x: 100, y: 200 },
    { x: 1000, y: 20 },
    { x: 1500, y: 800 },
  ]
  render(rockets)
  addEventListener('resize', () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    render(rockets)
  })
}

main()
