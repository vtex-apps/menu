/* eslint-env jest */
import React from 'react'
import { IntlProvider } from 'react-intl'
import { render } from 'react-testing-library'

import Menu from '../Menu'

describe('Menu Component', () => {
  let wrapper

  beforeEach(() => {
    const messages = require('../../messages/en-US.json')
    wrapper = render(
      <IntlProvider locale="en-US" messages={messages}>
        <Menu />
      </IntlProvider>
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should render nothing', () => {
    expect(wrapper.container.querySelectorAll('a').length).toBe(0)
  })
})
