/**
 * @typedef {Object} RocketAudioBuffers
 * @property {AudioBuffer} launch1
 * @property {AudioBuffer} explodeSmall
 * @property {AudioBuffer} explodeMedium
 * @property {AudioBuffer} explodeLarge
 */

/**
 * @param {AudioContext} audioContext
 * @returns {Promise<RocketAudioBuffers>}
 */
export async function getRocketAudioBuffers(audioContext) {
  const [launch1, explodeSmall, explodeMedium, explodeLarge] = await Promise.all([
    fetch('assets/launch1.wav').then(response => response.arrayBuffer()).then(buffer => audioContext.decodeAudioData(buffer)),
    fetch('assets/explodeSmall.wav').then(response => response.arrayBuffer()).then(buffer => audioContext.decodeAudioData(buffer)),
    fetch('assets/explodeMedium.wav').then(response => response.arrayBuffer()).then(buffer => audioContext.decodeAudioData(buffer)),
    fetch('assets/explodeLarge.wav').then(response => response.arrayBuffer()).then(buffer => audioContext.decodeAudioData(buffer)),
  ])
  return { launch1, explodeSmall, explodeMedium, explodeLarge }
}
