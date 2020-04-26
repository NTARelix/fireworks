import { Rocket } from './entities/rocket.js'
import { createRenderer } from './graphics/renderer.js'
import { ticker } from './ticker.js'

function main() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const render = createRenderer(canvas)
  const rockets = []
  addEventListener('resize', () => {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
  })
  addEventListener('click', event => {
    const rocket = new Rocket(
      event.clientX,
      canvas.height - event.clientY, // adjust event position to match rendered coordinate system
      Date.now(),
      (400 + Math.random() * 200) / 1000 // pixels per millisecond
    )
    rockets.push(rocket)
  })
  ticker(time => render(time, rockets))
}

main()
