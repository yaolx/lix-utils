import { isNil } from 'lodash'

import { QueryParamsPipe } from '../src/queryparams-pipe-utils'

describe('queryparams-pipe-utils tests', () => {
  test('should build success', () => {
    const queryParams = QueryParamsPipe.build({ a: 1, b: 1 })

    expect(queryParams).toBeInstanceOf(Object)
  })

  test('should update correct', () => {
    const queryParams = QueryParamsPipe.build({ a: 1, b: 1 })
    const nextQueryParams = queryParams.update({ b: 2 })

    expect(queryParams.valueOf().a).toEqual(1)
    expect(queryParams.valueOf().b).toEqual(1)

    expect(nextQueryParams.valueOf().a).toEqual(1)
    expect(nextQueryParams.valueOf().b).toEqual(2)
  })

  test('should clean correct', () => {
    const queryParams = QueryParamsPipe.build({ a: 1, b: 1 })
    const cleanedQueryParams = queryParams.clean()

    expect(queryParams.valueOf().a).toEqual(1)

    expect(isNil(cleanedQueryParams.valueOf().a)).toBeTruthy()
    expect(isNil(cleanedQueryParams.valueOf().b)).toBeTruthy()
  })

  test('should reset correct', () => {
    const queryParams = QueryParamsPipe.build({ a: 1, b: 1 })
    const nextQueryParams = queryParams.update({ a: 2 })

    expect(queryParams.valueOf().a).toEqual(1)
    expect(nextQueryParams.valueOf().a).toEqual(2)

    const resetQueryParams = nextQueryParams.reset()
    expect(resetQueryParams.valueOf().a).toEqual(1)
  })
})
