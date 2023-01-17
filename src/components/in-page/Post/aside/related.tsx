import Link from 'next/link'

import { Card } from '~/components/universal/Card'

import style from './related.module.less'

const Post = [
  {
    title: '🏆掘金年度征文 | 2021年终总结征文大赛',
    id: '1',
  },
  {
    title: '做了一份前端面试复习计划，保熟～',
    id: '2',
  },
  {
    title: ' 10月更文诚意加码，激发写作潜力｜掘金·日新计划',
    id: '3',
  },
  {
    title: '掘金日新计划 ｜ 12月更文挑战来袭，开启掘金成长之旅',
    id: '4',
  },
]

export const RelatedPost = () => {
  return (
    <Card title={'相关文章'}>
      <div className={style.list}>
        {Post.map(({ title, id }) => (
          <Link key={id} href={id}>
            {title}
          </Link>
        ))}
      </div>
    </Card>
  )
}
