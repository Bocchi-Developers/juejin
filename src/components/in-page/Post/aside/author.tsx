import { Author as PostAuthor } from '~/components/universal/Author'
import { Card } from '~/components/universal/Card'

export const Author = () => {
  return (
    <Card>
      <PostAuthor
        avatar="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/mirror-assets/168e0858b6ccfd57fe5~tplv-t2oaga2asx-no-mark:100:100:100:100.awebp"
        name="掘金酱"
        intro="❤首席客服君 @ 掘金"
      />
    </Card>
  )
}
