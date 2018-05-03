/* eslint-env jest */
import React from 'react'
import { render } from 'react-testing-library'
import Menu from '../Menu'

describe('Menu Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(
      <Menu />
    )
  })

  it('should be rendered', () => {
    expect(wrapper).toBeDefined()
  })

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot()
  })

  it('should render 1 link', () => {
    expect(
      wrapper.container.querySelectorAll('a').length
    ).toBe(1)
  })
})
