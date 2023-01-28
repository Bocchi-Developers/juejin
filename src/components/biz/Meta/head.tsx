import Head from 'next/head'
import type { FC } from 'react'
import React, { memo, useContext } from 'react'

import { API_URL } from '~/constants/env'
import { InitialContext } from '~/context/initial-data'
import { isDev } from '~/utils/env'

export const DynamicHeadMeta: FC = memo(() => {
  const { seo } = useContext(InitialContext)
  return (
    <Head>
      <meta name="api_url" content={API_URL} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {!isDev ? (
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      ) : null}

      {seo.keywords && (
        <meta name="keywords" content={seo.keywords.join(',')} />
      )}
    </Head>
  )
})
