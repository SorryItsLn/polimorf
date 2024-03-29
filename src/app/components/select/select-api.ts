import { BehaviorSubject, Observable } from 'rxjs'

export type Pagination = {
  pageNumber: number
  pageCapacity: number
  total: number
}

export type searchParams = {
  page: BehaviorSubject<number>
  capacity: BehaviorSubject<number>
  query?: BehaviorSubject<string | null>
}
export type selectHandlerSearch<T> = (
  searchParams: searchParams,
) => Observable<{
  options: T[]
  metadata: Pagination
}>
