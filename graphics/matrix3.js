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
 * @param {Float32Array} outArray Array in which the matrix data will be set
 * @param {number} m00 Value at [0,0]
 * @param {number} m10 Value at [1,0]
 * @param {number} m20 Value at [2,0]
 * @param {number} m01 Value at [0,1]
 * @param {number} m11 Value at [1,1]
 * @param {number} m21 Value at [2,1]
 * @param {number} m02 Value at [0,2]
 * @param {number} m12 Value at [1,2]
 * @param {number} m22 Value at [2,2]
 * @returns {Float32Array}
 */
function setArray(outArray, m00, m10, m20, m01, m11, m21, m02, m12, m22) {
  outArray[M00] = m00
  outArray[M10] = m10
  outArray[M20] = m20
  outArray[M01] = m01
  outArray[M11] = m11
  outArray[M21] = m21
  outArray[M02] = m02
  outArray[M12] = m12
  outArray[M22] = m22
  return outArray
}

/**
 * Creates a new 3x3 identity matrix
 * @returns {Float32Array} New array
 */
export function createMatrix() {
  const matrix = new Float32Array(3 * 3)
  return identity(matrix)
}

/**
 * Creates an identity matrix for 2d space
 * @param {Float32Array} outArray Array in which the identity matrix will be written
 * @returns {Float32Array}
 */
export function identity(outArray) {
  return setArray(
    outArray,
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  )
}

/**
 * Creates a transformation matrix in for vertex shader projection in 2d space
 * from 2d coordinate space (0 to resolution; left to right and top to bottom)
 * to 2d clip space (-1 to 1; left to right and bottom to top)
 * @param {Float32Array} outArray Array in which the projection matrix will be written
 * @param {number} width Resolution width
 * @param {number} height Resolution height
 * @returns {Float32Array}
 */
export function projection(outArray, width, height) {
  return setArray(
    outArray,
    2 / width, 0, 0,
    0, -2 / height, 0,
    -1, 1, 1,
  )
}

/**
 * Creates a translation matrix for 2d space
 * @param {Float32Array} outArray Array in which the translation matrix will be written
 * @param {number} tx X translation quantity
 * @param {number} ty Y translation quantity
 * @returns {Float32Array}
 */
export function translation(outArray, tx, ty) {
  return setArray(
    outArray,
    1, 0, 0,
    0, 1, 0,
    tx, ty, 1,
  )
}

/**
 * Creates a rotation matrix for 2d space
 * @param {Float32Array} outArray Array in which the rotation matrix will be written
 * @param {number} angle Rotation angle (radians)
 * @returns {Float32Array}
 */
export function rotation(outArray, angle) {
  const dx = Math.cos(angle)
  const dy = Math.sin(angle)
  return setArray(
    outArray,
    dx, -dy, 0,
    dy, dx, 0,
    0, 0, 1,
  )
}

/**
 * Creates a scaling matrix for 2d space
 * @param {Float32Array} outArray Array in which the scaling matrix will be written
 * @param {number} sx X scale factor
 * @param {number} sy Y scale factor
 * @returns {Float32Array}
 */
export function scaling(outArray, sx, sy) {
  return setArray(
    outArray,
    sx, 0, 0,
    0, sy, 0,
    0, 0, 1,
  )
}

/**
 * Multiplies 2 arrays a*b
 * @param {Float32Array} outArray Array in which the resulting array multiplication will be written
 * @param {Float32Array} a Left matrix
 * @param {Float32Array} b Right matrix
 * @returns {Float32Array}
 */
export function multiply(outArray, a, b) {
  return setArray(
    outArray,
    a[M00] * b[M00] + a[M10] * b[M01] + a[M20] * b[M02],
    a[M00] * b[M10] + a[M10] * b[M11] + a[M20] * b[M12],
    a[M00] * b[M20] + a[M10] * b[M21] + a[M20] * b[M22],
    a[M01] * b[M00] + a[M11] * b[M01] + a[M21] * b[M02],
    a[M01] * b[M10] + a[M11] * b[M11] + a[M21] * b[M12],
    a[M01] * b[M20] + a[M11] * b[M21] + a[M21] * b[M22],
    a[M02] * b[M00] + a[M12] * b[M01] + a[M22] * b[M02],
    a[M02] * b[M10] + a[M12] * b[M11] + a[M22] * b[M12],
    a[M02] * b[M20] + a[M12] * b[M21] + a[M22] * b[M22],
  )
}
