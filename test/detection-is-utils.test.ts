import {
  isArrayEqual,
  isEqualStringIgnoreCase,
  isHttp,
  isHttps,
  isIncludeStringIgnoreCase,
  isContainChinese,
  isAllChinese,
  notEmptyArray,
  notEmptyString
} from 'src/detection-is-utils'

describe('detection untils test', () => {
  it('notEmptyArray return current', () => {
    // @ts-ignore
    expect(notEmptyArray(undefined)).toBeFalsy()
    // @ts-ignore
    expect(notEmptyArray()).toBeFalsy()
    expect(notEmptyArray([])).toBeFalsy()
    expect(notEmptyArray([1, '2', undefined])).toBeTruthy()
  })

  it('notEmptyString return current', () => {
    // @ts-ignore
    expect(notEmptyString(undefined)).toBeFalsy()
    expect(notEmptyString('')).toBeFalsy()
    expect(notEmptyString('asdf')).toBeTruthy()
  })

  it('isArrayEqual detect current', () => {
    expect(isArrayEqual([], [])).toBeTruthy()
    expect(isArrayEqual(['1', 1, {}], ['1', 1, {}])).toBeTruthy()
    expect(isArrayEqual([NaN], [NaN])).toBeTruthy()

    // @ts-ignore
    expect(isArrayEqual([undefined], undefined)).toBeFalsy()
    expect(isArrayEqual([], ['1'])).toBeFalsy()
    expect(isArrayEqual(['1', 1, {}], ['1', 2, {}])).toBeFalsy()
    expect(isArrayEqual(['1', 1, { a: 5 }], ['1', 1, { a: 6 }])).toBeFalsy()
  })

  it('isEqualStringIgnoreCase return current', () => {
    expect(isEqualStringIgnoreCase('abcdedf', 'ABCDEDF')).toBeTruthy()
    expect(isEqualStringIgnoreCase('abcdedf', 'abcdedf')).toBeTruthy()

    // @ts-ignore
    expect(isEqualStringIgnoreCase(1, '1')).toBeFalsy()
    // @ts-ignore
    expect(isEqualStringIgnoreCase(undefined, 'undefined')).toBeFalsy()
  })

  it('isIncludeStringIgnoreCase return current', () => {
    expect(isIncludeStringIgnoreCase(['a', 'b', 'c', 'd'], 'a')).toBeTruthy()
    expect(isIncludeStringIgnoreCase([''], '')).toBeTruthy()
    expect(isIncludeStringIgnoreCase(['a', 'b', 'c', 'd'], 'f')).toBeFalsy()
    expect(isIncludeStringIgnoreCase([], 'a')).toBeFalsy()
    expect(isIncludeStringIgnoreCase([], '')).toBeFalsy()

    // @ts-ignore
    expect(isIncludeStringIgnoreCase(undefined, '')).toBeFalsy()
    // @ts-ignore
    expect(isIncludeStringIgnoreCase('', undefined)).toBeFalsy()
  })

  it('isHttp detect current', () => {
    expect(isHttps('https:')).toBeTruthy()
    expect(isHttp('http:')).toBeTruthy()

    expect(isHttps('http:')).toBeFalsy()
    expect(isHttp('https:')).toBeFalsy()
  })

  it('isContainChinese detect current', () => {
    expect(isContainChinese('中文')).toBeTruthy()
    expect(isContainChinese('中 文')).toBeTruthy()
    expect(isContainChinese('中文 and english')).toBeTruthy()
    expect(isContainChinese('繁体相關')).toBeTruthy()
    /**
     * 中文符号
     */
    expect(isContainChinese('，。、')).toBeTruthy()

    expect(isContainChinese('')).toBeFalsy()
    expect(isContainChinese('and you')).toBeFalsy()
    expect(isContainChinese('..--++!@#$%^&*_')).toBeFalsy()
  })

  it('isAllChinese detect current', () => {
    expect(isAllChinese('中文')).toBeTruthy()
    expect(isAllChinese('偸骰傠蓊')).toBeTruthy()

    expect(isAllChinese('中 文')).toBeFalsy()
    expect(isAllChinese('中文,')).toBeFalsy()
    expect(isAllChinese('中文 ')).toBeFalsy()
    expect(isAllChinese('')).toBeFalsy()
    expect(isAllChinese('abcded')).toBeFalsy()
  })
})
