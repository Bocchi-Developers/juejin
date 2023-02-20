import { describe, expect, it } from 'vitest'

import { render } from '@testing-library/react'

import mountTest from '~/test/mountTest'

import { Divider } from '..'

mountTest(Divider)

describe('Card', () => {
  it('snapshot', () => {
    const markdown = render(<Divider className={'test'} />)
    expect(markdown.container).matchSnapshot()
  })
})
