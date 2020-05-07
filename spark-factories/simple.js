import { COLORS } from '../entities/color.js'
import { Spark } from '../entities/spark.js'
import { randomChoice, randomRange } from '../math/random.js'

const COLOR_CHOICES = [
  COLORS.RED,
  COLORS.GREEN,
  COLORS.BLUE,
  COLORS.CYAN,
  COLORS.VIOLET,
  COLORS.YELLOW,
]

/**
 * Adds a simple explosion of sparks to an array of sparks
 * @param {Spark[]} sparks
 * @param {number} x
 * @param {number} y
 * @param {number} time
 */
export function createSimpleExplosion(sparks, x, y, time) {
  const newSparkCount = randomRange(650, 750)
  const fireworkPower = randomRange(50, 250)
  const sparkColor = randomChoice(COLOR_CHOICES)
  for (let s = 0; s < newSparkCount; s++) {
    const direction = randomRange(0, 2 * Math.PI)
    const distance = randomRange(10, 10 + fireworkPower)
    const duration = randomRange(700, 1000)
    const spark = new Spark(x, y, direction, distance, duration, time, sparkColor)
    sparks.push(spark)
  }
}