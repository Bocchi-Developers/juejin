import { Card } from '~/components/universal/Card'

import style from './related.module.less'

const headerStyle = {
  padding: '1.333rem 0',
  margin: '0 1.667rem',
  'font-size': '16px',
  'line-height': '2rem',
  height: '57px',
}

export const RelatedPost = () => {
  return (
    <Card
      title={'相关文章'}
      headerStyle={headerStyle}
      bodyStyle={{ padding: '16px 0' }}
    >
      <div className={style.container}>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
        <div>🏆掘金年度征文 | 2021年终总结征文大赛 194点赞 · 597评论</div>
      </div>
    </Card>
  )
}
