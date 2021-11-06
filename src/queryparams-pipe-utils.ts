import { forEach, has, mapValues } from 'lodash'

export type ParamType = string | number

export type Params = Record<string | number, any>

export class QueryParamsPipe<T extends Params> {
  public static build<T>(initParams: T) {
    const queryParamsPipe = new QueryParamsPipe(initParams)
    return queryParamsPipe
  }

  private params: T

  private initialParams: T | undefined

  private constructor (assignParams: T) {
    this.params = { ...assignParams }
  }

  public update(updateProperties: Partial<T>) {
    const newAssignParams: T = { ...this.valueOf() }

    forEach(updateProperties, (value, key) => {
      if (has(newAssignParams, key)) {
        (newAssignParams as Params)[key] = value
      }
    })

    const newInst = new QueryParamsPipe(newAssignParams)
    newInst.setInitialParams({ ...this.valueOf() })

    return newInst
  }

  public reset() {
    return new QueryParamsPipe(this.initialParams as T)
  }

  public clean() {
    return new QueryParamsPipe(mapValues(this.valueOf(), () => {
      return null
    }))
  }

  public valueOf(): T {
    return this.params
  }

  private setInitialParams(initialParams: T) {
    this.initialParams = initialParams
  }
}
