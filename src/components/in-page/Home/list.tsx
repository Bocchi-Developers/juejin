import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { List as ArcoList, Image, Skeleton } from '@arco-design/web-react'

import { Divider } from '~/components/universal/Divider'
import { PostApi } from '~/services/api/post'
import type { IPostList, Sort } from '~/types/api/post'
import { relativeTimeFromNow } from '~/utils/time'

import style from './list.module.less'

const tab = [
  {
    name: '推荐',
  },
  {
    name: '最新',
    query: {
      sort: 'newest',
    },
  },
  {
    name: '热榜',
    query: {
      sort: 'three_days_hottest',
    },
  },
]

const TagBar = (props: IPostList) => {
  const { user, created, tags, ad } = props
  return (
    <div className={style['bar-container']}>
      <Link href={'/'} className={style['bar-author']}>
        {user.username}
      </Link>
      <span className={style['bar-date']}>{relativeTimeFromNow(created)}</span>
      {tags && (
        <span className={style['bar-tag']}>
          {tags?.map((tag) => (
            <Link href={'/'} key={tag}>
              {tag}
            </Link>
          ))}
        </span>
      )}
      {ad && (
        <Link href={'/'} className={style['bar-ad']}>
          广告
        </Link>
      )}
    </div>
  )
}
const ListItem = ({ item }: { item: IPostList }) => (
  <li className={clsx(style.list, !item.ad && style.hover)}>
    <TagBar {...item} />
    <Link href={`post/${item._id}`} target="_blank">
      <ArcoList.Item
        key={item._id}
        extra={
          item.cover && (
            <div className="image-area">
              <Image
                alt={item.title}
                src={item.cover}
                width={105}
                height={70}
                preview={false}
              />
            </div>
          )
        }
      >
        <div
          className={clsx(style.ellipsis, style.title, style['not-read'])}
          title={item.title}
        >
          {item.title}
        </div>
        <div
          className={clsx(style.ellipsis, style.description)}
          title={item.content}
        >
          {item.content}
        </div>
      </ArcoList.Item>
    </Link>
    <Divider />
  </li>
)
const PostNav = () => {
  const router = useRouter()
  return (
    <nav className={style.nav}>
      {tab.map((item) => (
        <Link
          key={item.name}
          className={clsx(
            style['nav-item'],
            router.query.sort == item.query?.sort && style.active,
          )}
          href={{ pathname: '/', query: item.query }}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

export const List = () => {
  const [postList, setPostList] = useState<IPostList[]>([])
  const router = useRouter()
  const [load, setLoad] = useState(true)
  const [hasMore, sethasMore] = useState(true)
  const fetchList = async (currentPage: number) => {
    const { sort } = router.query
    const postListData = await PostApi.postListRequest({
      pageCurrent: currentPage,
      pageSize: 15,
      sort: sort as Sort,
    })
    setPostList((list) => {
      return [...list, ...postListData.postList]
    })
    setLoad(false)
    if (currentPage >= postListData?.totalPages) {
      sethasMore(false)
    }
  }

  useEffect(() => {
    setLoad(true)
    sethasMore(true)
    setPostList([])
    fetchList(1)
  }, [router.query])

  return (
    <div className={style['bg-wrapper']}>
      <PostNav />
      <div className={style.divider}>
        <Divider />
      </div>

      {load ? (
        <Skeleton className={style.skeleton} />
      ) : (
        <InfiniteScroll
          loadMore={(page) => fetchList(page + 1)}
          hasMore={hasMore}
        >
          {postList.map((item) => (
            <ListItem item={item} key={item._id} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  )
}
