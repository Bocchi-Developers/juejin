import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { useEffect, useRef, useState } from 'react'

import { Card } from '~/components/universal/Card'

import style from './catalog.module.less'

interface Heading {
  heading: number
  text: string
}
const interSet = new Set<number>()

const Headings: Heading[] = []
const HeadingCollection = (node: Element) => {
  switch (node.tagName) {
    case 'H1':
      Headings.push({ heading: 1, text: node.innerHTML })
      break
    case 'H2':
      Headings.push({ heading: 2, text: node.innerHTML })
      break
    case 'H3':
      Headings.push({ heading: 3, text: node.innerHTML })
      break
    case 'H4':
      Headings.push({ heading: 4, text: node.innerHTML })
      break
    case 'H5':
      Headings.push({ heading: 5, text: node.innerHTML })
      break
    case 'H6':
      Headings.push({ heading: 6, text: node.innerHTML })
      break
    default:
      break
  }
}
// TODO 由于id是js添加的, 刷新之后会从头开始, 所以需要在服务端渲染的时候添加id
const addHeadingId = (node: Element, index: number) => {
  node.id = `heading-${index}`
}
const addObserver = (callback: IntersectionObserverCallback) => {
  const doms = document.querySelector('article')
  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  }
  const observer = new IntersectionObserver(callback, options)
  Headings.splice(0, Headings.length)
  if (!doms) return
  let index = 0
  Array.from(doms.children).forEach((item) => {
    HeadingCollection(item)
    if (item.tagName.startsWith('H')) {
      observer.observe(item)
      addHeadingId(item, index)
      index++
    }
  })
  return observer
}
const Container = ({
  children,
  active,
}: PropsWithChildren<{ active: number }>) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container.current) {
      container.current.scrollTo(0, 20 * active - 20)
      console.log(container.current.scrollTop)
    }
  }, [active])
  return (
    <div ref={container} className={style.content}>
      {children}
    </div>
  )
}
const callback = (
  entries: IntersectionObserverEntry[],
  setActive: Dispatch<SetStateAction<number>>,
) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio == 1) {
      interSet.add(+entry.target.id.split('-')[1])
      if (interSet.size > 0) setActive(Math.min(...interSet))
      console.log(interSet)
    }
    if (!entry.isIntersecting) {
      interSet.delete(+entry.target.id.split('-')[1])
      if (interSet.size > 0) setActive(Math.min(...interSet))
      console.log(interSet)
    }
  })
}
const Catalog = () => {
  const [active, setActive] = useState(0)
  const obCallback = (entries: IntersectionObserverEntry[]) => {
    callback(entries, setActive)
  }
  const [headings, setHeadings] = useState<Heading[]>([])
  useEffect(() => {
    const observer = addObserver(obCallback)
    setHeadings(Headings)
    return () => {
      if (observer) observer.disconnect()
    }
  }, [])

  return (
    <Card title={'目录'}>
      <Container active={active}>
        {headings.map((item, index) => {
          return (
            <a
              href={`#heading-${index}`}
              key={headings[index].text + headings[index].heading + index}
              style={{ color: index == active ? 'red' : 'white' }}
            >
              {item.text}
            </a>
          )
        })}
      </Container>
    </Card>
  )
}
export { Catalog }
