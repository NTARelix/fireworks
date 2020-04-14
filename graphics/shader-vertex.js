export default `#version 300 es
  in vec2 a_position;
  uniform vec2 u_resolution;
  void main() {
    /**
     * Scales and offsets viewport coordinates to clip space coordinates.
     * Position data is represented from 0 to the canvas resolution (left to right; top to bottom)
     * Clip space x and y positions are represented from -1 to 1 (left to right; bottom to top)
     * This converts from [0, resolution) => [0, 1) => [0, 2) => [-1, 1)
     * then flips y across the x axis
     */
    vec2 clipSpacePosition = (a_position / u_resolution * 2.0 - 1.0) * vec2(1, -1);
    gl_Position = vec4(clipSpacePosition, 0, 1);
  }
`
