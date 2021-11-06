import { decode, encode, valueOfHtmlElement } from '../src/html-entities-string-utils'

describe('html entities string utils', () => {
  const expectPair = [
    [''    , ''                   ],
    [' '   , '&nbsp;'             ],
    ['<'   , '&lt;'               ],
    ['>'   , '&gt;'               ],
    ['&'   , '&amp;'              ],
    ['<>& ', '&lt;&gt;&amp;&nbsp;'],
    [
      '$varibale_123456$<9+$variablel_098765',
      '$varibale_123456$&lt;9+$variablel_098765'
    ]
  ]

  it('encode html entities correct', () => {
    expectPair.forEach((pair) => expect(encode(pair[0])).toEqual(pair[1]))
  })

  it('encode html entities correct', () => {
    expectPair.forEach((pair) => expect(decode(pair[1])).toEqual(pair[0]))
  })

  it('valueOfElementHtml correct', () => {
    const element = document.createElement('div')
    const text0 = 'Logic<br />'
    element.innerHTML = text0

    expect(valueOfHtmlElement('Logic')).toEqual('Logic')
    expect(valueOfHtmlElement(text0)).toEqual(element.innerHTML)
    expect(valueOfHtmlElement('Logic< br />')).toEqual('Logic&lt; br /&gt;')
    expect(valueOfHtmlElement('Log&ic< br />')).toEqual('Log&amp;ic&lt; br /&gt;')
  })
})
