import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import type {
  CSSProperties,
  Dispatch,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
} from 'react'
import { createContext, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { Card } from '~/components/universal/Card'
import { useStore } from '~/store'

import styles from './index.module.less'

export interface ArticleLayoutProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  padding?: CSSProperties['padding']
  aside?: FC<unknown>[]
  asideWidth?: CSSProperties['width']
  postId?: string
}

export const SidebarContext = createContext<{
  setSidebar: Dispatch<SetStateAction<FC<{}>[] | undefined>>
  postId?: string
  asideLeave: boolean
  leaveShow: boolean
} | null>(null)

export const ArticleLayout: FC<ArticleLayoutProps> = observer(
  ({ children, aside, asideWidth, padding, postId, ...props }) => {
    const [sidebar, setSidebar] = useState<FC[] | undefined>(aside)
    const [asideLeave, setAsideLeave] = useState(false)
    const [leaveShow, setLeaveShow] = useState(false)
    const { appStore } = useStore()
    const { ref } = useInView({
      threshold: 0,
      onChange: (inView) => {
        setAsideLeave(!inView)
      },
    })

    useEffect(() => {
      setTimeout(() => {
        setLeaveShow(asideLeave)
      }, 50)
    }, [asideLeave])

    return (
      <SidebarContext.Provider
        value={{ setSidebar, postId, asideLeave, leaveShow }}
      >
        <main className={styles['main-content']} {...props}>
          <Card
            bodyStyle={{ padding: '0' }}
            className={styles['card-list']}
            style={{ padding }}
          >
            {children}
          </Card>
          {!appStore.isNarrowThanLaptop && (
            <aside
              ref={ref}
              className={clsx(styles.sidebar)}
              style={{ width: asideWidth, height: !postId ? '100%' : 'auto' }}
            >
              {sidebar?.map((Aside, index) => (
                <Aside key={index} />
              ))}
            </aside>
          )}
        </main>
      </SidebarContext.Provider>
    )
  },
)
