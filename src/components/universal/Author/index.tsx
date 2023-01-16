import { Avatar } from '@arco-design/web-react'

import style from './index.module.less'

interface AuthorProps {
  avatar: string
  name: string
  intro: string
}
export const Author = (props: AuthorProps) => {
  return (
    <>
      <div className={style.container}>
        <Avatar size={48}>
          <img alt={props.name} src={props.avatar} />
        </Avatar>
        <div className={style.infor}>
          <span style={{ fontSize: '16px', fontWeight: '500' }}>
            {props.name}
          </span>
          <br />
          <span title={props.intro}>{props.intro}</span>
        </div>
      </div>
    </>
  )
}
