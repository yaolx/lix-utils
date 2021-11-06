import { getIEVersion, isIE10Lower, isIE9Lower } from '../src/detect-ie-browser-utils'

describe('detect-ie-browser-utils unit tests', () => {
  const VERSION11 = 11
  const VERSION16 = 16

  it('ie version detect correct', () => {
    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)')).toEqual(7)
    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3)'))

    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)')).toEqual(8)
    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0))')).toEqual(8)

    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0)')).toEqual(9)
    expect(getIEVersion('Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)')).toEqual(9)

    expect(getIEVersion('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')).toEqual(10)
    expect(getIEVersion('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2)')).toEqual(10)

    expect(getIEVersion('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko')).toEqual(VERSION11)
    expect(getIEVersion('Mozilla/5.0 (Windows NT 6.2; Trident/7.0; rv:11.0) like Gecko')).toEqual(VERSION11)
    expect(getIEVersion('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko')).toEqual(VERSION11)
    expect(getIEVersion('Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko')).toEqual(VERSION11)
    expect(getIEVersion('Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Mobile Safari/537.36 Edge/16.16299')).toEqual(VERSION16);

    [
      'Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/13.0 Firefox/13.0',
      'Mozilla/5.0 (Linux; U; Android 4.0.3; de-ch; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      'Mozilla/5.0 (Linux; Android 4.4.2); Nexus 5 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Mobile Safari/537.36 OPR/20.0.1396.72047',
      'Opera/9.80 (Android 2.3.3; Linux; Opera Mobi/ADR-1111101157; U; es-ES) Presto/2.9.201 Version/11.50',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      'Chrome/55.0.2883.87 UBrowser/6.2.4098.3 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:76.0) Gecko/20100101 Firefox/76.0'
    ].forEach((ua) => {
      expect(getIEVersion(ua)).toBeUndefined()
    })
  })

  it('ie lower check correct', () => {
    expect(isIE9Lower('Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.0)')).toBeTruthy()
    expect(isIE10Lower('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')).toBeTruthy()

    expect(isIE9Lower('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')).toBeFalsy()
    expect(isIE10Lower('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko')).toBeFalsy()
  })
})
