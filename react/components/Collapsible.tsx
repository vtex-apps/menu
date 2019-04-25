import React from 'react'

interface Props {
  open: boolean
  transition: number
}

interface State {
  height: number | string
}

class Collapsible extends React.Component<Props, State> { 
  /*tslint:disable member-ordering */
  public static defaultProps = {
    transition: 200,
  }

  private container = React.createRef<HTMLDivElement>()

  public state = {
    height: 0,
  }

  private forceLayout(element: HTMLElement) {
    /** Uses any function that triggers a page layout.
     * Could be any function or property from here:
     * https://gist.github.com/paulirish/5d52fb081b3570c81e3a
     */
    element.getBoundingClientRect()
  }

  public componentDidUpdate(prevProps: Props) {
    if (!prevProps.open && this.props.open) {
      const element = this.container.current
      if (!element) {
        return
      }

      element.style.height = 'auto'
      const childrenHeight = element.offsetHeight

      element.style.height = '0'

      /** Forces layout in order to make the transition
       * to the new height work.
       */
      this.forceLayout(element)

      this.setState({
        height: childrenHeight,
      })
    } else if (prevProps.open && !this.props.open) {
      this.setState({ height: 0 })
    }
  }

  public render() {
    const { children, transition } = this.props
    const { height } = this.state

    return (
      <div
        className="overflow-hidden"
        ref={this.container}
        style={{
          height,
          transition: `height ${transition}ms ease-out`,
        }}>
          {children}
      </div>
    )
  }
}

export default Collapsible

