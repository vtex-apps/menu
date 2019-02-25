import React from 'react'
import { render } from 'test-utils'

import Menu from '../index'

describe('Menu Component', () => {
  function renderComponent() {
    const props = {
      links: [
        {
          text: 'text',
          internalPage: 'internalPage',
          params: 'params',
          externalPage: 'externalPage',
          typeOfRoute: 'typeOfRoute',
          page: 'page',
          position: 'position',
        },
      ],
    }

    return render(<Menu {...props} />)
  }

  it('should be rendered', () => {
    expect(renderComponent()).toBeDefined()
  })

  it('should match the snapshot', () => {
    const { asFragment } = renderComponent()
    expect(asFragment()).toMatchSnapshot()
  })
})
