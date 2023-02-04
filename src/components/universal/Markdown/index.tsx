/* eslint-disable react-hooks/rules-of-hooks */
import type { MarkdownToJSX } from 'markdown-to-jsx'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo } from 'react'

import { ErrorBoundary } from '~/components/app/ErrorBoundary'

import { Markdown as JuejinMarkdown } from './components'
import type { MdProps } from './components'
import { MHeading } from './renderers/heading'

// import { MarkdownToc } from './MarkdownToc'

const Noop = () => null

export interface KamiMarkdownProps extends MdProps {
  toc?: boolean
}
export const Markdown: FC<
  PropsWithChildren<KamiMarkdownProps & MarkdownToJSX.Options>
> = memo((props) => {
  const {
    value,
    renderers,

    extendsRules,

    ...rest
  } = props
  const Heading = useMemo(() => {
    return MHeading()
  }, [value, props.children])

  const RenderError = useCallback(
    () => (
      <div>
        Markdown RenderError, Raw: <br /> {value || props.children}
      </div>
    ),
    [props.children, value],
  )

  return (
    <ErrorBoundary fallbackComponent={RenderError}>
      <JuejinMarkdown
        // tocSlot={props.toc ? MarkdownToc : Noop}
        tocSlot={Noop}
        value={value}
        {...rest}
        className="markdown-body"
      >
        {props.children}
      </JuejinMarkdown>
    </ErrorBoundary>
  )
})
