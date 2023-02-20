import React from 'react'
import { describe, expect, it } from 'vitest'

import { render } from '@testing-library/react'

export default function mountTest(
  Component: React.ComponentType<any> | React.ComponentType,
) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = render(<Component />)
      expect(() => {
        wrapper.rerender(<Component />)
        wrapper.unmount()
      }).not.toThrow()
    })
  })
}
