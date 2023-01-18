import { observer } from 'mobx-react-lite'
import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

import { Card } from '~/components/universal/Card'
import { useStore } from '~/store'

import styles from './index.module.less'

export interface ArticleLayoutProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  aside?: FC[]
  asideWidth?: CSSProperties['width']
}

export const ArticleLayout: FC<ArticleLayoutProps> = observer(
  ({ children, aside, asideWidth, ...props }) => {
    const { appStore } = useStore()
    return (
      <main className={styles['main-content']} {...props}>
        <Card bodyStyle={{ padding: '0' }} className={styles['card-list']}>
          {children}
        </Card>
        {!appStore.isNarrowThanLaptop && (
          <aside className={styles.sidebar} style={{ width: asideWidth }}>
            {aside?.map((Aside, index) => (
              <Aside key={index} />
            ))}
          </aside>
        )}
      </main>
    )
  },
)
