/* eslint-disable react-hooks/rules-of-hooks */
import type { MarkdownToJSX } from 'markdown-to-jsx'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, useCallback, useMemo } from 'react'

import { ErrorBoundary } from '~/components/app/ErrorBoundary'

import { MarkdownToc } from '../../in-page/Post/aside/toc'
import { CodeBlock } from './codeBlock'
import { Markdown as JuejinMarkdown } from './components'
import type { MdProps } from './components'
import { MHeading } from './renderers/heading'

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
        tocSlot={props.toc ? MarkdownToc : Noop}
        value={value}
        {...rest}
        className="markdown-body"
        extendsRules={{
          heading: {
            react(node, output, state) {
              return (
                <Heading id={node.id} level={node.level} key={state?.key}>
                  {output(node.content, state!)}
                </Heading>
              )
            },
          },
          codeBlock: {
            react(node, output, state) {
              return (
                <CodeBlock
                  key={state?.key}
                  content={node.content}
                  lang={node.lang}
                />
              )
            },
          },
          ...extendsRules,
          ...renderers,
        }}
      >
        {props.children}
      </JuejinMarkdown>
    </ErrorBoundary>
  )
})
