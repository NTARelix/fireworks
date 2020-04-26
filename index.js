import { createRenderer } from './graphics/renderer.js'

function main() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const render = createRenderer(canvas)
  const rockets = []
  render(rockets)
  addEventListener('resize', () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    render(rockets)
  })
  addEventListener('click', event => {
    rockets.push({
      x: event.clientX,
      y: canvas.height - event.clientY,
    })
    render(rockets)
  })
}

main()
