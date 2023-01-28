import merge from 'lodash-es/merge'
import { observer } from 'mobx-react-lite'
import type { NextSeoProps } from 'next-seo'
import { NextSeo } from 'next-seo'
import type { OpenGraph } from 'next-seo/lib/types'
import type { FC } from 'react'
import { useContext } from 'react'

import { InitialContext } from '~/context/initial-data'

type SEOProps = {
  title: string
  description?: string
  openGraph?: { type?: 'website' | 'article' } & OpenGraph
} & NextSeoProps

export const SEO: FC<SEOProps> = observer((props) => {
  const { title, description, openGraph, ...rest } = props
  const Title = `${title}`
  const { seo } = useContext(InitialContext)
  return (
    <NextSeo
      {...{
        title,
        titleTemplate: `%s - ${seo.title}`,

        openGraph: merge(
          {
            type: 'article',
            locale: 'zh-cn',
            site_name: seo.title || '',
            description: description || seo.description || '',
            title: Title,
          } as OpenGraph,
          openGraph,
        ),
        description: description || seo.description || '',
        ...rest,
      }}
    />
  )
})

export const Seo = SEO
