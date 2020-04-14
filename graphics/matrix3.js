/** Maps matrix coordinates to array indices */
const M00 = 0 * 3 + 0
const M10 = 0 * 3 + 1
const M20 = 0 * 3 + 2
const M01 = 1 * 3 + 0
const M11 = 1 * 3 + 1
const M21 = 1 * 3 + 2
const M02 = 2 * 3 + 0
const M12 = 2 * 3 + 1
const M22 = 2 * 3 + 2

/**
 * Utility for more concise array setting
 * @param {ArrayBuffer} array Array in which the matrix data will be set
 * @param {number} m00 Value at [0,0]
 * @param {number} m10 Value at [1,0]
 * @param {number} m20 Value at [2,0]
 * @param {number} m01 Value at [0,1]
 * @param {number} m11 Value at [1,1]
 * @param {number} m21 Value at [2,1]
 * @param {number} m02 Value at [0,2]
 * @param {number} m12 Value at [1,2]
 * @param {number} m22 Value at [2,2]
 */
function setArray(array, m00, m10, m20, m01, m11, m21, m02, m12, m22) {
  array[M00] = m00
  array[M10] = m10
  array[M20] = m20
  array[M01] = m01
  array[M11] = m11
  array[M21] = m21
  array[M02] = m02
  array[M12] = m12
  array[M22] = m22
}

/**
 * Creates a new 3x3 identity matrix
 * @returns {ArrayBuffer} New array
 */
export function createMatrix() {
  const matrix = new Float32Array(3 * 3)
  identity(matrix)
  return matrix
}

/**
 * Creates an identity matrix for 2d space
 * @param {ArrayBuffer} array Array in which the identity matrix will be written
 */
export function identity(array) {
  setArray(
    array,
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  )
}

/**
 * Creates a transformation matrix in for vertex shader projection in 2d space
 * from 2d coordinate space (0 to resolution; left to right and top to bottom)
 * to 2d clip space (-1 to 1; left to right and bottom to top)
 * @param {ArrayBuffer} array Array in which the projection matrix will be written
 * @param {number} width Resolution width
 * @param {number} height Resolution height
 */
export function projection(array, width, height) {
  setArray(
    array,
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1,
  )
}

/**
 * Creates a translation matrix for 2d space
 * @param {ArrayBuffer} array Array in which the translation matrix will be written
 * @param {number} tx X translation quantity
 * @param {number} ty Y translation quantity
 */
export function translation(array, tx, ty) {
  setArray(
    array,
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1,
  )
}

/**
 * Creates a rotation matrix for 2d space
 * @param {ArrayBuffer} array Array in which the rotation matrix will be written
 * @param {number} angle Rotation angle (radians)
 */
export function rotation(array, angle) {
  const dx = Math.cos(angle)
  const dy = Math.sin(angle)
  setArray(
    array,
    dx, -dy, 0,
    dy, dx, 0,
    0, 0, 1,
  )
}

/**
 * Creates a scaling matrix for 2d space
 * @param {ArrayBuffer} array Array in which the scaling matrix will be written
 * @param {number} sx X scale factor
 * @param {number} sy Y scale factor
 */
export function scaling(array, sx, sy) {
  setArray(
    array,
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  )
}

/**
 * Multiplies 2 arrays a*b
 * @param {ArrayBuffer} array Array in which the resulting array multiplication will be written
 * @param {ArrayBuffer} a Left matrix
 * @param {ArrayBuffer} b Right matrix
 */
export function multiply(array, a, b) {
  setArray(
    array,
    b[M00] * a[M00] + b[M01] * a[M10] + b[M02] * a[M20],
    b[M00] * a[M01] + b[M01] * a[M11] + b[M02] * a[M21],
    b[M00] * a[M02] + b[M01] * a[M12] + b[M02] * a[M22],
    b[M10] * a[M00] + b[M11] * a[M10] + b[M12] * a[M20],
    b[M10] * a[M01] + b[M11] * a[M11] + b[M12] * a[M21],
    b[M10] * a[M02] + b[M11] * a[M12] + b[M12] * a[M22],
    b[M20] * a[M00] + b[M21] * a[M10] + b[M22] * a[M20],
    b[M20] * a[M01] + b[M21] * a[M11] + b[M22] * a[M21],
    b[M20] * a[M02] + b[M21] * a[M12] + b[M22] * a[M22],
  )
}
