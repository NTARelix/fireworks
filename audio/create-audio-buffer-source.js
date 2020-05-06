/**
 * @param {AudioContext} audioContext
 * @param {AudioBuffer} audioData
 * @returns {AudioBufferSourceNode}
 */
export function createAudioBufferSource(audioContext, audioData) {
  const source = audioContext.createBufferSource()
  source.buffer = audioData
  source.connect(audioContext.destination)
  return source
}
