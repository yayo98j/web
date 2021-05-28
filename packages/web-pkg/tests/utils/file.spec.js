import { getExtension } from 'web-pkg/src/utils/file'

describe('getExtension', () => {
  it('returns the extension', () => {
    ;[
      ['foo.jpg', 'jpg'],
      ['foo.bar.jpg', 'jpg'],
      ['foo', ''],
      ['.jpg', '']
    ].forEach(kase => expect(getExtension(kase[0])).toBe(kase[1]))
  })
})
