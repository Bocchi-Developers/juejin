import type { FC } from 'react'

import type { DividerProps } from '@arco-design/web-react'
import { Divider as ArcoDivider } from '@arco-design/web-react'

export const Divider: FC<DividerProps> = (props) => {
  return <ArcoDivider style={{ margin: '.6em 0 0 0' }} {...props} />
}
