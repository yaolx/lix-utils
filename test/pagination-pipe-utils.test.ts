import { PaginationPipe, DEFAULT_PAGE_SIZE, FIRST_PAGE_NO, PaginationCommand } from '../src/pagination-pipe-utils'

describe('pagination-pipe-utils tests', () => {
  test('should build success', () => {
    const paginationPipe = PaginationPipe.build()

    expect(paginationPipe).toBeInstanceOf(Object)
    expect(paginationPipe.valueOf().pageNo).toEqual(FIRST_PAGE_NO)
    expect(paginationPipe.valueOf().pageSize).toEqual(DEFAULT_PAGE_SIZE)
  })

  test('should build with options', () => {
    const customPageNo = 0
    const customPageSize = 20

    const pagination = PaginationPipe.build(customPageSize, customPageNo).valueOf()
    expect(pagination.pageNo).toEqual(customPageNo)
    expect(pagination.pageSize).toEqual(customPageSize)
  })

  test('should on event change correctly', () => {
    const paginationPipe = PaginationPipe.build()

    expect(paginationPipe.valueOf().pageNo).toEqual(FIRST_PAGE_NO)

    const nextPagination1 = paginationPipe.on(PaginationCommand.NEXT)
    expect(nextPagination1.valueOf().pageNo).toEqual(FIRST_PAGE_NO + 1)
    expect(nextPagination1.valueOf().pageSize).toEqual(DEFAULT_PAGE_SIZE)

    const nextPagination2 = paginationPipe.on(PaginationCommand.RESET)
    expect(nextPagination2.valueOf().pageNo).toEqual(FIRST_PAGE_NO)
    expect(nextPagination2.valueOf().pageSize).toEqual(DEFAULT_PAGE_SIZE)
  })
})
