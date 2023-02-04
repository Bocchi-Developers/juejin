/* eslint-disable react-hooks/rules-of-hooks */
import { clsx } from 'clsx'
import range from 'lodash-es/range'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import { compiler } from 'markdown-to-jsx'
import type { FC, PropsWithChildren } from 'react'
import React, {
  createElement,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export interface MdProps {
  value?: string

  style?: React.CSSProperties
  readonly renderers?: { [key: string]: Partial<MarkdownToJSX.Rule> }
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  codeBlockFully?: boolean
  className?: string
  tocSlot?: (props: { headings: HTMLElement[] }) => JSX.Element | null
}

export const Markdown: FC<PropsWithChildren<MdProps & MarkdownToJSX.Options>> =
  memo((props) => {
    const {
      value,
      renderers,
      style,
      wrapperProps = {},
      codeBlockFully = false,
      className,
      overrides,
      extendsRules,
      additionalParserRules,

      ...rest
    } = props

    const ref = useRef<HTMLDivElement>(null)
    const [headings, setHeadings] = useState<HTMLElement[]>([])

    useEffect(() => {
      if (!ref.current) {
        return
      }

      const $headings = ref.current.querySelectorAll(
        range(1, 6)
          .map((i) => `h${i}`)
          .join(','),
      ) as NodeListOf<HTMLHeadingElement>

      setHeadings(Array.from($headings))

      return () => {
        setHeadings([])
      }
    }, [value, props.children])

    const node = useMemo(() => {
      if (!value && typeof props.children != 'string') return null

      const mdElement = compiler(`${value || props.children}`, {
        wrapper: null,

        // @ts-ignore
        overrides: {
          // p: MParagraph,

          // thead: MTableHead,
          // tr: MTableRow,
          // tbody: MTableBody,
          // // FIXME: footer tag in raw html will renders not as expected, but footer tag in this markdown lib will wrapper as linkReferer footnotes
          // footer: MFootNote,
          // details: MDetails,

          // for custom react component
          // LinkCard,

          ...overrides,
        },

        extendsRules: {
          gfmTask: {
            react(node, _, state) {
              return (
                <label
                  className="inline-flex items-center mr-2"
                  key={state?.key}
                >
                  <input type="checkbox" checked={node.completed} readOnly />
                </label>
              )
            },
          },

          list: {
            react(node, output, state) {
              const Tag = node.ordered ? 'ol' : 'ul'

              return (
                <Tag key={state?.key} start={node.start}>
                  {node.items.map((item, i) => {
                    let className = ''
                    if (item[0]?.type == 'gfmTask') {
                      className = 'list-none flex items-center'
                    }

                    return (
                      <li className={className} key={i}>
                        {output(item, state!)}
                      </li>
                    )
                  })}
                </Tag>
              )
            },
          },

          ...extendsRules,
          ...renderers,
        },
        additionalParserRules: {
          // spoilder: SpoilderRule,
          // mention: MentionRule,
          // commentAt: CommentAtRule,
          // mark: MarkRule,
          // ins: InsertRule,
          // kateX: KateXRule,
          // container: ContainerRule,
          ...additionalParserRules,
        },
        ...rest,
      })

      return mdElement
    }, [
      value,
      props.children,
      overrides,
      extendsRules,
      renderers,
      additionalParserRules,
      rest,
    ])

    return (
      <div
        id="write"
        style={style}
        {...wrapperProps}
        ref={ref}
        className={clsx(wrapperProps.className)}
      >
        {className ? <div className={className}>{node}</div> : node}

        {props.tocSlot ? createElement(props.tocSlot, { headings }) : null}
      </div>
    )
  })
