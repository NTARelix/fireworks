import { createAudioBufferSource } from './audio/create-audio-buffer-source.js'
import { getRocketAudioBuffers } from './audio/get-rocket-audio-buffers.js'
import { Rocket } from './entities/rocket.js'
import { Spark } from './entities/spark.js'
import { createRenderer } from './graphics/renderer.js'
import { ticker } from './ticker.js'
import { Color } from './entities/color.js'

const COLORS = [
  new Color(1, 0, 0),
  new Color(0, 1, 0),
  new Color(0, 0, 1),
  new Color(1, 1, 0),
  new Color(1, 0, 1),
  new Color(0, 1, 1),
]

async function main() {
  const audioContext = new AudioContext()
  const audioBuffers = await getRocketAudioBuffers(audioContext)
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
      (300 + Math.random() * 400) / 1000, // pixels per millisecond
    )
    createAudioBufferSource(audioContext, audioBuffers.launch1).start()
    rockets.push(rocket)
  })
  ticker(time => {
    for (let i = rockets.length - 1; i >= 0; i--) {
      const rocket = rockets[i]
      if (time >= rocket.explosionTime) {
        createAudioBufferSource(audioContext, audioBuffers.explodeSmall).start()
        rockets.splice(i, 1)
        const newSparkCount = 650 + Math.random() * 100
        const fireworkPower = 50 + Math.random() * 200
        const sparkColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        for (let s = 0; s < newSparkCount; s++) {
          sparks.push(new Spark(
            rocket.getX(),
            rocket.getY(rocket.explosionTime),
            Math.random() * 2 * Math.PI,
            10 + Math.random() * fireworkPower,
            700 + Math.random() * 300,
            rocket.explosionTime,
            sparkColor,
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
