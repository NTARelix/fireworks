export function randomRange(start, end, step = null) {
  return step === null
    ? start + Math.random() * (end - start)
    : start + Math.floor(Math.random() * (end - start) / step) * step
}

export function randomChoice(choices) {
  return choices[randomRange(0, choices.length, 1)]
}
