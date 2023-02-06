import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './navbar.module.less'

const allNav = [
  {
    name: ' 综合',
    category: 'recommended',
  },
  {
    name: 'IOS',
    category: 'ios',
  },
  {
    name: ' 前端',
    category: 'frontend',
  },
  {
    name: ' 后端',
    category: 'backend',
  },
]

export const Navbar = () => {
  const router = useRouter()
  return (
    <nav className={styles['view-nav']}>
      <div className={styles['nav-list']}>
        {allNav.map((item) => (
          <Link
            key={item.name}
            className={clsx(
              styles['nav-item'],
              router.query.category == item.category && styles.active,
            )}
            href={{ pathname: '/', query: { category: item.category } }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
