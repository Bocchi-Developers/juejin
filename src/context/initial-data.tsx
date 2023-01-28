import type { FC, PropsWithChildren } from 'react'
import { createContext, memo, useMemo } from 'react'

import type { IAggregate } from '~/types/api/aggregate'

export const InitialContext = createContext({} as IAggregate)

export const InitialContextProvider: FC<
  PropsWithChildren<{ value: IAggregate }>
> = memo((props) => {
  return (
    <InitialContext.Provider
      value={useMemo(() => ({ ...props.value }), [props.value])}
    >
      {props.children}
    </InitialContext.Provider>
  )
})
