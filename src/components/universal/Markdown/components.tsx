/* eslint-disable react-hooks/rules-of-hooks */

import { clsx } from 'clsx'
import range from 'lodash-es/range'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import { compiler } from 'markdown-to-jsx'
import { observer } from 'mobx-react-lite'
import type { FC, PropsWithChildren } from 'react'
import React, {
  createElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { SidebarContext } from '~/components/layouts/ArticleLayout'
import { Image } from '~/components/universal/Image'
import { useStore } from '~/store'

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
  observer((props) => {
    const {
      value,
      renderers,
      style,
      wrapperProps = {},
      className,
      overrides,
      extendsRules,
      additionalParserRules,
      ...rest
    } = props
    const sideBarContext = useContext(SidebarContext)
    const ref = useRef<HTMLDivElement>(null)
    const [headings, setHeadings] = useState<HTMLElement[]>([])
    const { appStore } = useStore()
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

        overrides: {
          img: (props) => (
            <Image dark={appStore.colorMode == 'dark'} {...props} />
          ),
          ...overrides,
        },

        extendsRules: {
          ...extendsRules,
          ...renderers,
        },
        additionalParserRules: {
          ...additionalParserRules,
        },
        ...rest,
      })
      if (headings.length > 0 && sideBarContext?.setSidebar) {
        const { setSidebar } = sideBarContext
        setSidebar((sidebars) => {
          if (!sidebars) return
          if (sidebars.length >= 3) return sidebars
          return [
            ...sidebars,
            () =>
              props.tocSlot ? createElement(props.tocSlot, { headings }) : null,
          ]
        })
      }
      return mdElement
    }, [
      value,
      props.children,
      overrides,
      extendsRules,
      renderers,
      additionalParserRules,
      rest,
      appStore.colorMode,
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
      </div>
    )
  })
