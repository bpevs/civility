import { useCallback, useState } from 'preact/hooks'
import { tw } from '@twind'
import { Only } from 'civility'

function useToggle(initialValue = false) {
  const [value, setState] = useState(initialValue)
  return [
    value,
    useCallback(() => {
      setState(!value)
    }),
  ]
}

export default function Home() {
  const [shouldShowOnly, onClick] = useToggle()

  return (
    <div class={tw`flex gap-2 w-full`}>
      <button
        onClick={onClick}
        class={tw`p-4 display:block font-bold text-xl border`}
      >
        {shouldShowOnly ? 'hide' : 'show'}
      </button>
      <Only if={shouldShowOnly} class={tw`display:block font-bold text-xl`}>
        hello
      </Only>
    </div>
  )
}
