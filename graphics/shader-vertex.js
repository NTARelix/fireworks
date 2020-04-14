export default `#version 300 es
  in vec2 a_position;
  uniform mat3 u_projection_matrix;
  void main() {
    gl_Position = vec4((u_projection_matrix * vec3(a_position, 1)).xy, 0, 1);
  }
`
