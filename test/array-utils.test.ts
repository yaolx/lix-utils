import R from 'ramda'
import { diverterToArrays } from '../src/array-utils'

describe('array utils test', () => {
  it('diverterToArrays boundary error check', () => {
    // @ts-ignore
    expect(() => diverterToArrays([], undefined)).toThrowError()
    // @ts-ignore
    expect(() => diverterToArrays(null, R.F)).toThrowError(TypeError)
  })

  it('diverterToArrays outptut correct', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const predicate = (n: number) => n % 2 === 0
    const diverterResult = diverterToArrays(array, predicate)

    expect(diverterResult[0]).toEqual([2, 4, 6, 8])
    expect(diverterResult[1]).toEqual([1, 3, 5, 7, 9])
  })
})
