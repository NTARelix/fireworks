export class Spark {
  constructor(x, y, direction, distance, duration, startTime) {
    this.startX = x
    this.startY = y
    this.direction = direction
    this.distance = distance
    this.duration = duration
    this.startTime = startTime
    this.extinguishTime = startTime + duration
  }

  /**
   * distance = initVel * (time - 0.5 * time*time / dur)
   * velocity = initVel * (1 - initVel * time / dur)
   * @param {number} time
   */
  getHeadDistance(time) {
    const age = time - this.startTime
    const initialVelocity = this.distance * 2 / this.duration
    const instantaneousVelocity = initialVelocity - (initialVelocity * age / this.duration)
    const remainingTime = this.duration - age
    const remainingDistance = instantaneousVelocity * remainingTime / 2
    const distanceTraveled = this.distance - remainingDistance
    return distanceTraveled
  }

  getTailLength(time) {
    const MAX_LENGTH = 10
    const POWER = 4
    const age = time - this.startTime
    return MAX_LENGTH - Math.pow((Math.pow(MAX_LENGTH, 1/POWER) * age / this.duration), POWER)
  }
}
