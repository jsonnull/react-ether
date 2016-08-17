import ReactMultiChild from 'react/lib/ReactMultiChild'
import invariant from 'invariant'

const StackglComponent = function (element) {
  invariant(
    element.type == 'buffer',
    'React.createComponent(): may only pass native element of type "buffer"'
  )

  this.node = null
  this._mountImage = null
  this._renderedChildren = null
  this._currentElement = element
}

const StackglComponentMixin = {
  getPublicInstance () {},

  mountComponent (transaction, nativeParent, nativeContainerInfo, context) {
    this.node = this._currentElement
    this.mountChildren(this.node.children, transaction, context)

    // Here nativeParent is the gl instance

    return this.node
  },

  receiveComponent (nextElement, transaction, context) {
    // Typically you would diff the props and apply those to the host
    // environment, though all we need to do is swap out our _currentElement.
    const prevElement = this._currentElement;
    this._currentElement = nextElement;
    
    // this.updateChildren comes from ReactMultiChild.Mixin
    this.updateChildren(nextElement.props.children, transaction, context);
  },

  unmountComponent () {},

  getNativeNode () {},

  getHostNode () {}
}

Object.assign(
  StackglComponent.prototype,
  StackglComponentMixin,
  ReactMultiChild.Mixin
)

export default StackglComponent
