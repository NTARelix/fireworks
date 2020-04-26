const GRAVITY = 0.2 / 1000 // acceleration measured in pixels on timescale of milliseconds

export class Rocket {
  constructor(x, y, time, speed) {
    this.launchX = x
    this.launchY = y
    this.launchTime = time
    this.launchSpeed = speed
    this.explosionTime = time + Math.floor(speed / 2 / GRAVITY)
  }

  getX() { return this.launchX }
  getY(time) {
    const flightTime = time - this.launchTime
    return this.launchY + (this.launchSpeed * flightTime) - (GRAVITY * (flightTime ** 2))
  }
}
