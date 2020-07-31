import { decodeHTMLEntities } from "../decodeHTMLEntities"

test("should decode entities", function shouldDecodeEntities() {
  const result = decodeHTMLEntities("Foo &#xA9; bar &#x1D306; baz &#x2603; qux")
  expect(result).toEqual("Foo © bar 𝌆 baz ☃ qux")
});

test("should strip tags", function shouldStripHtmlTags() {
  const result = decodeHTMLEntities("<h1>test the tags</h1>")
  expect(result).toEqual("test the tags")
});

test("should decode japanese", function shouldDecodeJapanese() {
  const result = decodeHTMLEntities("&#x30cf;&#x30ed;&#x30fc;&#x30ef;&#x30fc;&#x30eb;&#x30c9;")
  expect(result).toEqual("ハローワールド")
});
