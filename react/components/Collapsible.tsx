import React, { RefObject } from 'react'

interface Props {
  open: boolean
}

interface State {
  height: number | string
}

class Collapsible extends React.Component<Props, State> { 
  /*tslint:disable member-ordering */
  private container: RefObject<HTMLDivElement>

  public state = {
    height: 0,
  }

  constructor(props: Props) {
    super(props)
    this.container = React.createRef()
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
    const { children } = this.props
    const { height } = this.state

    return (
      <div
        className="overflow-hidden"
        ref={this.container}
        style={{
          height,
          transition: 'height 200ms ease-out',
        }}>
          {children}
      </div>
    )
  }
}

export default Collapsible

