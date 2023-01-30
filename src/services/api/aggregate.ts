import type { ApiResponse } from '~/types/api'
import type { IAggregate } from '~/types/api/aggregate'

import { Get } from '../server'

function aggregateInfoRequest(): ApiResponse<IAggregate> {
  return Get('/aggregate')
}

export const AggregateApi = {
  aggregateInfoRequest,
}
