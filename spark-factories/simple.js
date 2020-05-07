import { COLORS } from '../entities/color.js'
import { Spark } from '../entities/spark.js'

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
  const newSparkCount = 650 + Math.random() * 100
  const fireworkPower = 50 + Math.random() * 200
  const sparkColor = COLOR_CHOICES[Math.floor(Math.random() * COLOR_CHOICES.length)]
  for (let s = 0; s < newSparkCount; s++) {
    sparks.push(new Spark(
      x,
      y,
      Math.random() * 2 * Math.PI,
      10 + Math.random() * fireworkPower,
      700 + Math.random() * 300,
      time,
      sparkColor,
    ))
  }
}