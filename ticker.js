/**
 * @typedef {Function} TickerCallback
 * @param {number} time Number of milliseconds elapsed since epoch
 * @returns {boolean} Whether to stop ticking; return `true` to stop, return `false` to continue ticking
 */

/**
 * Ticks as fast as the browser is capable (typically depending on the refresh rate(s) of the monitor(s) being used)
 * @param {TickerCallback} callback Function called every tick
 */
export function ticker(callback) {
  const shouldStop = callback(Date.now())
  if (!shouldStop) {
    requestAnimationFrame(() => ticker(callback))
  }
}
