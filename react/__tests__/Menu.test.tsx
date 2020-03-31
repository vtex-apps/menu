import { render } from '@vtex/test-tools/react'
import React from 'react'

import Menu from '../Menu'

describe('Menu Component', () => {
  function renderComponent() {
    return render(<Menu />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })
})
