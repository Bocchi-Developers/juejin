import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import type { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'

import { Avatar } from '@arco-design/web-react'

import { useStore } from '~/store'
import type { UserModel } from '~/types/api/user'

import styles from './index.module.less'

interface IAuthorProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  user: Pick<UserModel, 'username' | 'avatar'>
  usernameStyle?: CSSProperties
}

export const Author: FC<IAuthorProps> = observer(
  ({ description, user, usernameStyle, ...rest }) => {
    const { appStore } = useStore()
    return (
      <div className={styles.author} {...rest}>
        <Link href="#!">
          <Avatar
            size={46}
            style={{ opacity: appStore.colorMode == 'dark' ? '0.8' : 1 }}
          >
            <img alt="avatar" src={user.avatar} />
          </Avatar>
        </Link>
        <div className={styles['author-info']}>
          <Link href={'#!'} style={usernameStyle}>
            {user.username}
          </Link>
          {description}
        </div>
      </div>
    )
  },
)
