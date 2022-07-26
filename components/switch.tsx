/* @jsx h */
import { preact } from '../deps.ts';
const { Fragment, h } = preact;

export interface SwitchProps {
  value?: string;
  defaultCase: preact.VNode | string | null;
  cases: { [name: string]: preact.VNode | string | null };
}

export default function Switch(
  { value, defaultCase = null, cases }: SwitchProps,
) {
  if (value == null) return null;
  return (
    <Fragment>
      {cases[value] != null ? cases[value] : defaultCase}
    </Fragment>
  );
}
