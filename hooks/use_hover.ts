/*! @source https://gist.github.com/gragland/cfc4089e2f5d98dde5033adc44da53f8 */
import { hooks } from '../deps.ts';
const { useState } = hooks;

export interface IHoverBinder {
  onMouseEnter: (e: Event) => void;
  onMouseLeave: (e: Event) => void;
}

export function useHover(): [boolean, IHoverBinder] {
  const [isHovered, setHovered] = useState(false);

  const binder: IHoverBinder = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  return [isHovered, binder];
}
