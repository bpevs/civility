import { hooks, preact } from '../deps.ts';

const { useEffect, useRef } = hooks;

export default function useFocusObserver(
  callback: () => void,
  // deno-lint-ignore no-explicit-any
  ignoredRefs: preact.RefObject<any>[] = [],
) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    function handleClick(event: Event) {
      if (
        event.target instanceof HTMLElement &&
        ![ref, ...ignoredRefs].some((ref) => {
          if (!ref?.current?.contains) return false;
          return ref?.current.contains(event.target);
        })
      ) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref]);

  return ref;
}
