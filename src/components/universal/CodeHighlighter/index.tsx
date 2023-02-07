import { observer } from 'mobx-react-lite'
import type { FC } from 'react'
import React, { useCallback, useInsertionEffect, useRef } from 'react'
import { message } from 'react-message-popup'

import { loadScript, loadStyleSheet } from '~/utils/load-script'

import { useStore } from '../../../store'
import styles from './index.module.less'

interface Props {
  lang: string | undefined
  content: string
}

export const HighLighter: FC<Props> = observer((props) => {
  const { lang: language, content: value } = props
  const { appUIStore } = useStore()
  const { colorMode } = appUIStore
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
    message.success('COPIED!')
  }, [value])
  const isPrintMode = appUIStore.mediaType === 'print'

  const prevThemeCSS = useRef<ReturnType<typeof loadStyleSheet>>()

  useInsertionEffect(() => {
    const css = loadStyleSheet(
      `https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism-themes/1.9.0/prism-one-${
        isPrintMode ? 'light' : colorMode
      }.css`,
    )

    if (prevThemeCSS.current) {
      const $prev = prevThemeCSS.current
      css.$link.onload = () => {
        $prev.remove()
      }
    }

    prevThemeCSS.current = css
  }, [colorMode, isPrintMode])
  useInsertionEffect(() => {
    loadStyleSheet(
      'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.css',
    )

    Promise.all([
      loadScript(
        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/components/prism-core.min.js',
      ),
    ])
      .then(() =>
        Promise.all([
          loadScript(
            'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/autoloader/prism-autoloader.min.js',
          ),
          loadScript(
            'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.23.0/plugins/line-numbers/prism-line-numbers.min.js',
          ),
        ]),
      )
      .then(() => {
        if (ref.current) {
          requestAnimationFrame(() => {
            window.Prism?.highlightElement(ref.current)

            requestAnimationFrame(() => {
              window.Prism?.highlightElement(ref.current)
            })
          })
        } else {
          requestAnimationFrame(() => {
            window.Prism?.highlightAll()
            // highlightAll twice

            requestAnimationFrame(() => {
              window.Prism?.highlightAll()
            })
          })
        }
      })
  }, [])

  const ref = useRef<HTMLElement>(null)
  return (
    <div className={styles['code-wrap']}>
      <span className={styles['language-tip']} aria-hidden>
        {language?.toUpperCase()}
      </span>

      <pre className="line-numbers" data-start="1">
        <code className={`language-${language ?? 'markup'}`} ref={ref}>
          {value}
        </code>
      </pre>

      <div className={styles['copy-tip']} onClick={handleCopy} aria-hidden>
        Copy
      </div>
    </div>
  )
})
