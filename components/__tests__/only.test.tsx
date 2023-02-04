import '@dom'
import { assertEquals } from '$std/testing/asserts.ts'
import { describe, it } from '$std/testing/bdd.ts'
import { render } from '@testing-library/preact'
import { Only } from '../only.tsx'

it('should render if === true', () => {
  const { container } = render(
    <Only if={true}>
      <span>hello</span>
    </Only>,
  )
  assertEquals(container.textContent, 'hello')
})

it('should not render if === false', () => {
  const { container } = render(
    <Only if={false}>
      <span>hello</span>
    </Only>,
  )
  assertEquals(container.textContent, '')
})
