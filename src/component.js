import ReactMultiChild from 'react/lib/ReactMultiChild'

const StackglComponent = function (element) {
  this.node = null
  this._mountImage = null
  this._renderedChildren = null
  this._currentElement = element
}

const StackglComponentMixin = {
  getPublicInstance () {},
  mountComponent (transaction, nativeParent, nativeContainerInfo, context) {
    console.log(this._currentElement)
  },
  receiveComponent () {},
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
