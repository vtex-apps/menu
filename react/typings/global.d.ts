import { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    getSchema(props?: P): object
  }

  interface StorefrontComponent<P = {}, S = {}> extends Component<P, S> {
    getSchema?(props: P): object
    schema?: object
  }

  interface StorefrontElement extends ReactElement {
    getSchema?(props: P): object
    schema?: object
  }
}