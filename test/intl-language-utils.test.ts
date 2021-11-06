import { translateToStandardLocale, translateToCompatibilitiesLocale } from '../src/intl-language-utils'

describe('intl-language-utils unit test', () => {
  it('translateToStandardLocale translate correct', () => {
    expect(translateToStandardLocale('en')).toEqual('en-US')
    expect(translateToStandardLocale('EN')).toEqual('en-US')
    expect(translateToStandardLocale('en-US')).toEqual('en-US')
    expect(translateToStandardLocale('zh-CN')).toEqual('zh-CN')
    expect(translateToStandardLocale('zh-TW')).toEqual('zh-TW')
    expect(translateToStandardLocale('zh-HK')).toEqual('zh-HK')
  })

  it('translateToCompatibilitiesLocale translate correct', () => {
    expect(translateToCompatibilitiesLocale('en-US')).toEqual('en')
    expect(translateToCompatibilitiesLocale('en')).toEqual('en')
    expect(translateToCompatibilitiesLocale('zh-CN')).toEqual('zh-CN')
    expect(translateToCompatibilitiesLocale('zh-TW')).toEqual('zh-TW')
    expect(translateToCompatibilitiesLocale('zh-HK')).toEqual('zh-HK')
  })
})
