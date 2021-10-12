export const seededRandom = function (max: number, seed: number) {
  seed = (seed * 9301 + 49_297) % 233_280
  return Math.floor((seed / 233_280) * max)
}
