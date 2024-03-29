/// <reference lib="dom" />

let doc: HTMLDocument
let element: HTMLElement

// Create a new html document (doesn't execute script tags in child elements)
if (typeof document !== 'undefined') {
  doc = document.implementation.createHTMLDocument('')
  element = doc.createElement('div')
}

export function decodeHTMLEntities(
  str: string,
): string | undefined | null {
  if (typeof document === 'undefined') return
  if (str && typeof str === 'string') {
    element.innerHTML = str

    const text = element.textContent

    element.textContent = ''
    return text
  }

  return str
}
