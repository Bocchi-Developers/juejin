import { observer } from 'mobx-react-lite'
import type {
  CSSProperties,
  FC,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'

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
        <div className={styles['card-list']}>{children}</div>
        {!appStore.isNarrowThanLaptop && (
          <aside className={styles.sidebar} style={{ width: asideWidth }}>
            {aside?.map((Aside, index) => (
              <section key={index} className={styles['sidebar-card']}>
                <Aside />
              </section>
            ))}
          </aside>
        )}
      </main>
    )
  },
)
