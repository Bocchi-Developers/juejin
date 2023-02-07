import type { ApiResponse } from '~/types/api'
import type { IAggregate, IAggregateHome } from '~/types/api/aggregate'

import { Get } from '../server'

function aggregateInfoRequest(): ApiResponse<IAggregate> {
  return Get('/aggregate')
}

function aggregateHomeRequest(size: number): ApiResponse<IAggregateHome> {
  return Get(`/aggregate/home/${size}`)
}

export const AggregateApi = {
  aggregateInfoRequest,
  aggregateHomeRequest,
}
