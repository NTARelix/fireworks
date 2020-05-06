export class Color {
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }
}

export const COLORS = {
  RED: new Color(1, 0, 0),
  GREEN: new Color(0, 1, 0),
  BLUE: new Color(0, 0, 1),
  CYAN: new Color(0, 1, 1),
  VIOLET: new Color(1, 0, 1),
  YELLOW: new Color(1, 1, 0),
}
