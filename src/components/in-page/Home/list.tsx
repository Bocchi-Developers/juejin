import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { List as AcroList, Image, Skeleton } from '@arco-design/web-react'

import { Divider } from '~/components/universal/Divider'
import { relativeTimeFromNow } from '~/utils/time'

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

const post: Post[] = [
  {
    id: 2,
    title: '不用防抖和节流，用更底层的方式解决JS的重复请求',
    author: '掘金酱',
    description:
      '`once-init` 为解决异步函数问题而生。它从 `Promise` 的定义出发，又是一年新春之际，祝福大家兔年快乐',
    // cover:
    // 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['前端', 'React'],
    date: 1673961111920,
    ad: false,
  },
  {
    id: 1,
    title: '「兔了个兔」创意投稿大赛来袭！秀兔兔创意，迎新年好礼！',
    author: '掘金酱',
    description:
      '又是一年新春之际，祝福大家兔年快乐！本期创意投稿大赛主题为「兔了个兔」，围绕“兔”这个元素展开创意！',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    // tags: ['前端', 'React'],
    date: 1673961121920,
    ad: true,
  },
  {
    id: 3,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 4,
    title: 'ChatGPT ! 二次元老婆！活的！活的！真的已经实现出来啦 ',
    author: '前行的乌龟',
    description:
      '各位我现在的心情，太激动了，真的简直太激动了，甚至差点抽过去。真的我实在不能用语言描述我现在兴奋的心情 二次元老婆，纸片人老婆真的可以来了，真的可以活过来啦，活的，活的二次元老婆，国外大神做出来啦 (',
    tags: ['人工智能', '前端', 'Android'],
    date: 1673961101920,
  },
  {
    id: 5,
    title: '太强了！外国小哥花16个月用Three.JS打造了一个无缝切地图的3D开车游戏',
    author: '大帅老猿',
    description:
      '外国一位小哥耗时16个月打造的3D版赛车游戏，这两天忽然火了起来。 只需一个浏览器，就能驾车从森林、海滩，“无缝切换”到广袤的沙漠甚至平原。甚至还可以选择春夏秋冬或者白天黑夜的环境风格。 在不想自己开',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b795674cb3141338e3724e5c73a927d~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['JavaScript', 'webgl', 'three.js'],
    date: 1673961101920,
  },
  {
    id: 6,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 7,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 8,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 9,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 10,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
  {
    id: 11,
    title: '分享10个比B站更刺激的网站，千万别轻易点开',
    author: '程序员范某',
    description:
      '作为一个码龄8年+程序员，到现在还能保持着浓密的头发和健壮的身体，全靠这10个网站让我健（偷）康（偷）生（摸）活（鱼），今天就把我收藏夹里的网站无私分享出来，千万不要忘记点赞收藏！ This pers',
    cover:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1056c7eca7d4431f97486935d3f8f1e7~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['算法', 'Java', '面试'],
    date: 1673961101920,
  },
]

const post2: Post[] = [
  {
    id: 1,
    title: '「兔了个兔」创意投稿大赛来袭！秀兔兔创意，迎新年好礼！',
    author: '掘金酱',
    description:
      '又是一年新春之际，祝福大家兔年快乐！本期创意投稿大赛主题为「兔了个兔」，围绕“兔”这个元素展开创意！',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    // tags: ['前端', 'React'],
    date: 1673961121920,
    ad: true,
  },
  {
    id: 2,
    title: '不用防抖和节流，用更底层的方式解决JS的重复请求',
    author: '掘金酱',
    description:
      '`once-init` 为解决异步函数问题而生。它从 `Promise` 的定义出发，又是一年新春之际，祝福大家兔年快乐',
    // cover:
    // 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    tags: ['前端', 'React'],
    date: 1673961111920,
    ad: false,
  },
]

const post3: Post[] = [
  {
    id: 1,
    title: '「兔了个兔」创意投稿大赛来袭！秀兔兔创意，迎新年好礼！',
    author: '掘金酱',
    description:
      '又是一年新春之际，祝福大家兔年快乐！本期创意投稿大赛主题为「兔了个兔」，围绕“兔”这个元素展开创意！',
    cover:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0563dc9f109143b2baecee702fe38705~tplv-k3u1fbpfcp-no-mark:240:240:240:160.awebp?',
    // tags: ['前端', 'React'],
    date: 1673961121920,
    ad: true,
  },
]
const TagBar = (props: Pick<Post, 'author' | 'date' | 'tags' | 'ad'>) => {
  const { author, date, tags, ad } = props
  return (
    <div className={style['bar-container']}>
      <Link href={'/'} className={style['bar-author']}>
        {author}
      </Link>
      <span className={style['bar-date']}>{relativeTimeFromNow(date)}</span>
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
const ListItem = ({ item }: { item: Post }) => (
  <div className={clsx(style.list, !item.ad && style.hover)}>
    <TagBar {...item} />
    <Link href={`post/${item.id}`} target="_blank">
      <AcroList.Item
        key={item.id}
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
          className={clsx(style.ellipsis, style.description)}
          title={item.description}
        >
          {item.description}
        </div>
      </AcroList.Item>
    </Link>
    <Divider />
  </div>
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
  const [postList, setPostList] = useState<Post[]>(post)
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const fetchList = async () => {
    const sort = router.query.sort

    await new Promise((resolve) => {
      setTimeout(() => {
        if (sort == 'newest') {
          setPostList(post2)
        } else if (sort == 'three_days_hottest') {
          setPostList(post3)
        } else {
          setPostList(post)
        }
        resolve('')
      }, 1000)
    })
    setLoad(false)
  }

  useEffect(() => {
    setLoad(true)
    fetchList()
  }, [router.query])

  return (
    <div>
      <PostNav />
      <div className={style.divider}>
        <Divider />
      </div>
      {load ? (
        <Skeleton className={style.skeleton} />
      ) : (
        <AcroList
          bordered={false}
          render={(item) => <ListItem item={item} key={item.id} />}
          dataSource={postList}
        />
      )}
    </div>
  )
}
