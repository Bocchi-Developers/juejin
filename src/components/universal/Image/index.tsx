import { observer } from 'mobx-react-lite'
import NextImage from 'next/image'
import type { ImageProps as NextImageProps } from 'next/image'
import type { FC } from 'react'
import { createElement } from 'react'

import type { ImageProps } from '@arco-design/web-react'
import { Image as ArcoImage } from '@arco-design/web-react'

import { useStore } from '~/store'

interface OtherImageProps extends ImageProps {
  dark?: boolean
}

export const Image: FC<OtherImageProps> = ({ dark, ...rest }) => {
  return createElement(ArcoImage, {
    style: { opacity: dark ? '0.85' : '1' },
    ...rest,
  })
}

export const ImageNext: FC<NextImageProps> = observer(({ ...rest }) => {
  const { appStore } = useStore()
  return createElement(NextImage, {
    style: { opacity: appStore.colorMode == 'dark' ? '0.85' : '1' },
    ...rest,
  })
})
