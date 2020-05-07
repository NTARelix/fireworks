import { createAudioBufferSource } from './audio/create-audio-buffer-source.js'
import { getRocketAudioBuffers } from './audio/get-rocket-audio-buffers.js'
import { Rocket } from './entities/rocket.js'
import { Spark } from './entities/spark.js'
import { createRenderer } from './graphics/renderer.js'
import { ticker } from './ticker.js'
import { createSimpleExplosion } from './spark-factories/simple.js'

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
        createSimpleExplosion(sparks, rocket.getX(), rocket.getY(rocket.explosionTime), rocket.explosionTime)
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
