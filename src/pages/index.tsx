import { Button } from '@arco-design/web-react'

import { useMediaToggle } from '~/hooks/use-media-toggle'

export default function Home() {
  const { toggle, value } = useMediaToggle()
  return (
    <>
      <h1>基于 Nextjs 开发仿掘金站点</h1>
      <Button onClick={() => toggle()} type="primary">
        Light Mode
      </Button>
      <Button onClick={() => toggle()} type="primary">
        Dark Mode
      </Button>
      The current theme is: {value ? 'dark' : 'light'}
    </>
  )
}
