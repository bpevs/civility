import { hooks } from '../deps.ts';
const { useEffect, useState } = hooks;

export default function useRoute() {
  const [hash, setHash] = useState(location.hash);

  useEffect(() => {
    const updateHash = () => setHash(location.hash);
    globalThis.addEventListener('hashchange', updateHash, false);
    return () => {
      globalThis.removeEventListener('hashchange', updateHash);
    };
  }, []);

  return hash;
}
