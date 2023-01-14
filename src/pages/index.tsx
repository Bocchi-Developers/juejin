import { Content } from '~/components/in-page/Home'
import { Navbar } from '~/components/in-page/Home/navbar'

import { useMediaToggle } from '~/hooks/use-media-toggle'

export default function Home() {
  const { toggle, value } = useMediaToggle()
  return (
    <>
      <Navbar/>
      <Content/>
    </>
  )
}
