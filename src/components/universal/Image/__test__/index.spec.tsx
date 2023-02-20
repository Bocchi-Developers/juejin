import { describe, expect, it } from 'vitest'

import { render } from '@testing-library/react'

import mountTest from '~/test/mountTest'

import { Image } from '..'

mountTest(Image)

describe('Card', () => {
  it('snapshot', () => {
    const markdown = render(<Image className={'test'} />)
    expect(markdown.container).matchSnapshot()
  })
})
