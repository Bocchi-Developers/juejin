import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import type { FC, HTMLAttributes, ReactNode } from 'react'

import { Avatar } from '@arco-design/web-react'

import type { UserModel } from '~/types/api/user'

import styles from './index.module.less'

interface IAuthorProps extends HTMLAttributes<HTMLDivElement> {
  description?: ReactNode
  user: Pick<UserModel, 'username' | 'avatar'>
}

export const Author: FC<IAuthorProps> = observer(
  ({ description, user, ...rest }) => {
    return (
      <div className={styles.author} {...rest}>
        <Link href="#!">
          <Avatar size={46}>
            <img alt="avatar" src={user.avatar} />
          </Avatar>
        </Link>
        <div className={styles['author-info']}>
          <Link href={'#!'}>{user.username}</Link>
          {description}
        </div>
      </div>
    )
  },
)
