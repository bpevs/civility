/*! @source https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8 */
import { useState } from 'preact/hooks'

export interface IFocusBinder {
  onFocus: (e: Event) => void
  onBlur: (e: Event) => void
}

export function useFocus(): [boolean, IFocusBinder] {
  const [isFocused, setFocused] = useState(false)

  const binder: IFocusBinder = {
    onBlur: () => setFocused(false),
    onFocus: () => setFocused(true),
  }

  return [isFocused, binder]
}
