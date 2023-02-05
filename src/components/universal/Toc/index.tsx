import clsx from 'clsx'
import throttle from 'lodash-es/throttle'
import type { FC } from 'react'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { CustomEventTypes } from '~/types/events'
import { eventBus } from '~/utils/event-emitter'

import styles from './index.module.less'
import { TocItem } from './item'

export type TocProps = {
  headings: HTMLElement[]

  useAsWeight?: boolean
}

type Headings = {
  depth: number
  index: number
  title: string
}[]
export const Toc: FC<TocProps> = memo(
  ({ headings: $headings, useAsWeight }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const headings: Headings = useMemo(() => {
      return Array.from($headings).map((el) => {
        const depth = +el.tagName.slice(1)
        const title = el.id || el.textContent || ''

        const index = Number(el.dataset['index'])
        return {
          depth,
          index: isNaN(index) ? -1 : index,
          title,
        }
      })
    }, [$headings])
    const [index, setIndex] = useState(-1)
    useEffect(() => {
      const handler = (index: number) => {
        setIndex(index)
      }
      eventBus.on(CustomEventTypes.TOC, handler)
      return () => {
        eventBus.off(CustomEventTypes.TOC, handler)
      }
    }, [])

    useEffect(() => {
      if (useAsWeight) {
        return
      }
      const setMaxWidth = throttle(() => {
        if (containerRef.current) {
          containerRef.current.style.maxWidth = `${
            document.documentElement.getBoundingClientRect().width -
            containerRef.current.getBoundingClientRect().x -
            60
          }px`
        }
      }, 14)
      window.addEventListener('resize', setMaxWidth)
      setMaxWidth()

      return () => {
        window.removeEventListener('resize', setMaxWidth)
      }
    }, [useAsWeight])

    const handleItemClick = useCallback((i) => {
      setTimeout(() => {
        setIndex(i)
      }, 350)
    }, [])
    const rootDepth = useMemo(
      () =>
        headings?.length
          ? (headings.reduce(
              (d: number, cur) => Math.min(d, cur.depth),
              headings[0]?.depth || 0,
            ) as any as number)
          : 0,
      [headings],
    )
    return (
      <section>
        <div className={clsx(styles['toc'])} ref={containerRef}>
          {headings &&
            headings.map((heading) => {
              return (
                <MemoedItem
                  containerRef={useAsWeight ? undefined : containerRef}
                  heading={heading}
                  lastPostion={index}
                  isActive={heading.index === index}
                  onClick={handleItemClick}
                  key={heading.title}
                  rootDepth={rootDepth}
                />
              )
            })}
        </div>
      </section>
    )
  },
)
const MemoedItem = memo<{
  isActive: boolean
  heading: Headings[0]
  rootDepth: number
  lastPostion: number
  onClick: (i: number) => void
  containerRef: any
}>(
  (props) => {
    const { heading, isActive, onClick, rootDepth, containerRef, lastPostion } =
      props

    return (
      <TocItem
        containerRef={containerRef}
        index={heading.index}
        onClick={onClick}
        lastPostion={lastPostion}
        active={isActive}
        depth={heading.depth}
        title={heading.title}
        key={heading.title}
        rootDepth={rootDepth}
      />
    )
  },
  (a, b) => {
    // FUCK react transition group alway inject onExited props into Child element, but this props alway change, so ignore it.

    return (
      a.heading === b.heading &&
      a.isActive === b.isActive &&
      a.onClick === b.onClick &&
      a.rootDepth === b.rootDepth
    )
  },
)

MemoedItem.displayName = 'MemoedItem'
