/* @jsx h */
import { preact } from '../deps.ts';
const { Fragment, h } = preact;

export interface OnlyProps {
  if: boolean;
  children: preact.VNode | string | (preact.VNode | string)[];
}

export function Only({ if: predicate, children }: OnlyProps) {
  return (
    <Fragment>
      {predicate ? children : null}
    </Fragment>
  );
}
