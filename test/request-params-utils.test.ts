import { urlParamsFormat } from 'src/request-params-utils'

describe('urlParamsFormat test', () => {
  it('urlParamsFormat return current', () => {
    expect(urlParamsFormat('%')).toStrictEqual('\\%')
    expect(urlParamsFormat('\\')).toStrictEqual('\\\\')
    expect(urlParamsFormat('abc')).toStrictEqual('abc')
  })
})
