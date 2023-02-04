import { assertEquals } from '$std/testing/asserts.ts'
import { describe, it } from '$std/testing/bdd.ts'

import { parseRegExp } from '../parse_regexp.ts'

describe('isRegexString and parseRegExp', () => {
  it('/myurlorsomething', () => {
    assertEquals(parseRegExp('/myurlorsomething'), null)
  })
  it('/myregex/i', () => {
    assertEquals(parseRegExp('/myregex/i'), /myregex/i)
  })
  it('/myregex/', () => {
    assertEquals(parseRegExp('/myregex/'), /myregex/)
  })
  it('/myr\\/egex/', () => {
    assertEquals(parseRegExp('/myr\\/egex/'), /myr\/egex/)
  })
  it('/myregex/aaa', () => {
    assertEquals(parseRegExp('/myregex/aaa'), null)
  })
})
