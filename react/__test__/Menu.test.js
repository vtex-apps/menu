/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import Menu from '../Menu'

describe('Menu Component', () => {
  let wrapper

  beforeEach(() => {
    const messages = require('../locales/en-US')
    wrapper = render(
      <IntlProvider locale="en-US" messages={messages}>
        <Menu />
      </IntlProvider>
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render nothing', () => {
    expect(
      wrapper.container.querySelectorAll('a').length
    ).toBe(0)
  })
})
