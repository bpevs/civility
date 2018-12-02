import { Func } from ".."


export function debounce(
  func: Func,
  wait: number,
): () => void {
  let timer: number

  return () => {
    if (timer) window.clearTimeout(timer)

    timer = window.setTimeout(func, wait)
  }
}
