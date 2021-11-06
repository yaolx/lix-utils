import { thousandAbbreviate } from 'src/format-utils'

describe('formatUtils test', () => {
  it('999 for thousandAbbreviate ', () => {
    const number = 999
    expect(thousandAbbreviate(number)).toStrictEqual('999')
  })
  it('9099 for thousandAbbreviate ', () => {
    const number = 9099
    expect(thousandAbbreviate(number)).toStrictEqual('9K')
  })
  it('9299 for thousandAbbreviate ', () => {
    const number = 9299
    expect(thousandAbbreviate(number)).toStrictEqual('9.2K')
  })
  it('12002 for thousandAbbreviate ', () => {
    const number = 12002
    expect(thousandAbbreviate(number)).toStrictEqual('12K')
  })
  it('undefined for thousandAbbreviate ', () => {
    let paramNumber = 0
    // @ts-ignore
    paramNumber = undefined
    expect(thousandAbbreviate(paramNumber)).toStrictEqual('0')
  })
  it('null for thousandAbbreviate ', () => {
    let paramNumber = 0
    // @ts-ignore
    paramNumber = null
    expect(thousandAbbreviate(paramNumber)).toStrictEqual('0')
  })
  it('\'\' for thousandAbbreviate ', () => {
    let paramNumber = 0
    // @ts-ignore
    paramNumber = ''
    expect(thousandAbbreviate(paramNumber)).toStrictEqual('0')
  })
})
