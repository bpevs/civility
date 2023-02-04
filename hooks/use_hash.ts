import { useEffect, useState } from 'preact/hooks'

export default function useRoute() {
  const [hash, setHash] = useState(location.hash)

  useEffect(() => {
    const updateHash = () => setHash(location.hash)
    globalThis.addEventListener('hashchange', updateHash, false)
    return () => {
      globalThis.removeEventListener('hashchange', updateHash)
    }
  }, [])

  return hash
}
