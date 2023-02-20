import { describe, expect, it } from 'vitest'

import { render } from '@testing-library/react'

import mountTest from '~/test/mountTest'

import { Card } from '..'

mountTest(Card)

describe('Card', () => {
  it('snapshot', () => {
    const markdown = render(<Card className={'test'} />)
    expect(markdown.container).matchSnapshot()
  })
})
