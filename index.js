import { Rocket } from './entities/rocket.js'
import { Spark } from './entities/spark.js'
import { createRenderer } from './graphics/renderer.js'
import { ticker } from './ticker.js'

function main() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
  const render = createRenderer(canvas)
  /** @type {Rocket[]} */
  const rockets = []
  /** @type {Spark[]} */
  const sparks = []
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
  ticker(time => {
    for (let i = rockets.length - 1; i >= 0; i--) {
      const rocket = rockets[i]
      if (time >= rocket.explosionTime) {
        rockets.splice(i, 1)
        const newSparkCount = 40 + Math.random() * 20
        const fireworkPower = 200 + Math.random() * 400
        for (let s = 0; s < newSparkCount; s++) {
          sparks.push(new Spark(
            rocket.getX(),
            rocket.getY(rocket.explosionTime),
            Math.random() * 2 * Math.PI,
            10 + Math.random() * fireworkPower,
            700 + Math.random() * 300,
            rocket.explosionTime,
          ))
        }
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const spark = sparks[i]
      if (time >= spark.extinguishTime) {
        sparks.splice(i, 1)
      }
    }
    render(time, rockets, sparks)
  })
}

main()
