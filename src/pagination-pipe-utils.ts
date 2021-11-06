export const FIRST_PAGE_NO = 1

export const DEFAULT_PAGE_SIZE = 10

export const PaginationCommand = {
  RESET: 'RESET',
  NEXT: 'NEXT'
}

export type PaginationCommandType = keyof typeof PaginationCommand | string

interface ApiPagination {
  pageNo: number
  pageSize: number
}

export class PaginationPipe {
  public static Commands = PaginationCommand

  public static build(pageSize: number = DEFAULT_PAGE_SIZE, pageNo = FIRST_PAGE_NO) {
    return new PaginationPipe({
      pageNo,
      pageSize
    })
  }

  public readonly commands = PaginationCommand

  private pagination: ApiPagination

  private constructor(pagination: ApiPagination) {
    this.pagination = pagination
  }

  public on(command: PaginationCommandType) {
    switch (command) {
      case 'NEXT':
        return this.onNext()
      case 'RESET':
      default:
        return this.onReset()
    }
  }

  public valueOf() {
    return this.pagination
  }

  private onNext() {
    const { pagination } = this

    return new PaginationPipe({
      pageNo: pagination.pageNo + 1,
      pageSize: pagination.pageSize
    })
  }

  private onReset() {
    return new PaginationPipe({
      pageNo: FIRST_PAGE_NO,
      pageSize: this.pagination.pageSize
    })
  }
}
