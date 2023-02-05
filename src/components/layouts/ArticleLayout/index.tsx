import { observer } from 'mobx-react-lite'
import type {
  CSSProperties,
  Dispatch,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  SetStateAction,
} from 'react'
import { createContext, useState } from 'react'

import { Card } from '~/components/universal/Card'
import { useStore } from '~/store'

import styles from './index.module.less'

export interface ArticleLayoutProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  padding?: CSSProperties['padding']
  aside?: FC[]
  asideWidth?: CSSProperties['width']
}

export const SidebarContext = createContext<{
  setSidebar: Dispatch<SetStateAction<FC<{}>[] | undefined>>
} | null>(null)

export const ArticleLayout: FC<ArticleLayoutProps> = observer(
  ({ children, aside, asideWidth, padding, ...props }) => {
    const [sidebar, setSidebar] = useState<FC[] | undefined>(aside)
    const { appStore } = useStore()
    return (
      <SidebarContext.Provider value={{ setSidebar }}>
        <main className={styles['main-content']} {...props}>
          <Card
            bodyStyle={{ padding: '0' }}
            className={styles['card-list']}
            style={{ padding }}
          >
            {children}
          </Card>
          {!appStore.isNarrowThanLaptop && (
            <aside className={styles.sidebar} style={{ width: asideWidth }}>
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
