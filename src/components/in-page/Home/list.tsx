import clsx from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Link from 'next/link'

import { List as AcroList } from '@arco-design/web-react'

import style from './list.module.less'

interface Post {
  id: string | number
  title: string
  author: string
  description: string
  cover?: string
  tags?: string[]
  date: number
  ad?: boolean
  read?: boolean
}
const post = [
  {
    id: 1,
    title: '「兔了个兔」创意投稿大赛来袭！秀兔兔创意，迎新年好礼！',
    author: ' string',
    description:
      '又是一年新春之际，祝福大家兔年快乐！本期创意投稿大赛主题为「兔了个兔」，围绕“兔”这个元素展开创意！',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['前端', 'React'],
    date: 1673961121920,
    ad: true,
  },
  {
    id: 2,
    title: '不用防抖和节流，用更底层的方式解决JS的重复请求',
    author: ' string',
    description:
      '`once-init` 为解决异步函数问题而生。它从 `Promise` 的定义出发，用 `Promise` 的基础功能彻底地阻止了异步请求浪费的发生。',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['前端', 'React'],
    date: 1673961111920,
    ad: false,
  },
]
const TagBar = (props: Pick<Post, 'author' | 'date' | 'tags' | 'ad'>) => {
  const { author, date, tags, ad } = props
  return (
    <div className={style['bar-container']}>
      <Link href={'/'} className={style['bar-author']}>
        {author}
      </Link>
      <span className={style['bar-date']}>
        {formatDistanceToNow(date, { locale: zhCN })}
      </span>
      <span className={style['bar-tag']}>
        {tags?.map((tag) => (
          <Link href={'/'} key={tag}>
            {tag}
          </Link>
        ))}
      </span>
      {ad && (
        <Link href={'/'} className={style['bar-ad']}>
          广告
        </Link>
      )}
    </div>
  )
}
const ListItem = ({ item }: { item: Post }) => (
  <>
    <TagBar {...item} />
    <Link href={'post/123'} target="_blank" className={style.link}>
      <AcroList.Item
        key={item.id}
        extra={
          <div className="image-area">
            <img alt={item.title} src={item.cover} width={120} height={80} />
          </div>
        }
      >
        <div
          className={clsx(
            style.ellipsis,
            style.title,
            !item.read && style['not-read'],
          )}
          title={item.title}
        >
          {item.title}
        </div>
        <div
          className={clsx(!item.ad && style.ellipsis)}
          title={item.description}
        >
          {item.description}
        </div>
      </AcroList.Item>
    </Link>
  </>
)

export const List = () => {
  return (
    <AcroList
      bordered={false}
      render={(item) => <ListItem item={item} key={item.id} />}
      dataSource={post}
    />
  )
}
