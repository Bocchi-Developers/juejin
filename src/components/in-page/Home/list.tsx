import clsx from 'clsx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import { List as ArcoList, Skeleton } from '@arco-design/web-react'

import { Divider } from '~/components/universal/Divider'
import { Image } from '~/components/universal/Image'
import { PostApi } from '~/services/api/post'
import { useStore } from '~/store'
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
const ListItem = observer(({ item }: { item: IPostList }) => (
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
                dark={useStore().appStore.colorMode == 'dark'}
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
))
const PostNav = () => {
  const router = useRouter()

  const { category } = router.query

  return (
    <nav className={style.nav}>
      {tab.map((item) => (
        <Link
          key={item.name}
          className={clsx(
            style['nav-item'],
            router.query.sort == item.query?.sort && style.active,
          )}
          href={{
            pathname: '/',
            query: item.query
              ? { ...router.query, ...item.query }
              : category
              ? { category }
              : '',
          }}
          shallow
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
  const [lastRouterName, setLastRouterName] = useState(router.asPath)
  const [load, setLoad] = useState(true)
  const [hasMore, sethasMore] = useState(true)
  const fetchList = async (currentPage: number) => {
    const { sort } = router.query
    const postListData = await PostApi.postListRequest({
      pageCurrent: currentPage,
      pageSize: 15,
      sort: sort as Sort,
      category: router.query.category as string,
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
    if (router.asPath != lastRouterName || postList.length == 0) {
      setLoad(true)
      sethasMore(true)
      setPostList([])
      fetchList(1)
      setLastRouterName(router.asPath)
    }
  }, [router.query])

  return (
    <div className={style['bg-wrapper']}>
      <PostNav />
      <Divider />

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
