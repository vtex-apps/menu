import React, { FunctionComponent, Ref, RefForwardingComponent, PropsWithChildren } from 'react'

const TRANSITION_DELAY = 200

interface Props {
  open: boolean
  updateParentHeight?: (offset?: number) => void
}

interface State {
  height: number | string
}

interface CollapsibleContextValue {
  updateParentHeight?: (offset?: number) => void
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({})

class Collapsible extends React.Component<Props, State> {
  /*tslint:disable member-ordering */
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
      if (typeof this.props.updateParentHeight === 'function') {
        const childrenHeight = this.updateHeight()
        this.props.updateParentHeight(childrenHeight)
      } else {
        this.updateHeight()
      }
    } else if (prevProps.open && !this.props.open) {
      const childrenHeight = this.updateHeight()
      if (typeof this.props.updateParentHeight === 'function') {
        this.props.updateParentHeight(-childrenHeight)
      }
    }
  }

  public updateHeight = (offset?: number) => {
    const element = this.container.current
    if (!element) {
      return 0
    }

    const initialHeight = element.offsetHeight

    element.style.height = 'auto'
    const childrenHeight = element.offsetHeight

    element.style.height = `${initialHeight}px`

    /** Forces layout in order to make the transition
     * to the new height work.
     */
    this.forceLayout(element)

    const targetHeight = Math.max(
      0,
      (this.props.open ? childrenHeight : 0) + (offset || 0)
    )

    this.setState({ height: targetHeight })

    return childrenHeight
  }

  public updateHeightFromChildren = (offset?: number) => {
    this.updateHeight(offset)
  }

  private handleUpdateParentHeight = (updateParentHeight: CollapsibleContextValue['updateParentHeight']) => (offset?: number) => {
    this.updateHeightFromChildren(offset)
    if (typeof updateParentHeight === 'function') {
      updateParentHeight(offset)
    }
  }

  public render() {
    const { children } = this.props
    const { height } = this.state

    return (
      <CollapsibleContext.Consumer>
        {({ updateParentHeight }) => (
          <CollapsibleContext.Provider
            value={{ updateParentHeight: this.handleUpdateParentHeight(updateParentHeight) }}
          >
            <CollapsibleContainer height={height} ref={this.container}>
              {children}
            </CollapsibleContainer>
          </CollapsibleContext.Provider>
        )}
      </CollapsibleContext.Consumer>
    )
  }
}

type CollapsibleContainerProps = PropsWithChildren<{
  height: number 
}>

const CollapsibleContainer = React.forwardRef(
  (({ children, height }, ref) => (
    <div
      className="overflow-hidden"
      ref={ref}
      style={{
        height,
        transition: `height ${TRANSITION_DELAY}ms ease-out`,
      }}
    >
      {children}
    </div>
  )) as RefForwardingComponent<HTMLDivElement, CollapsibleContainerProps>
) 

export default Collapsible

const CollapsibleContextConsumer = CollapsibleContext.Consumer

export { CollapsibleContextConsumer }