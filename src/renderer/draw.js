import React from 'react'
import invariant from 'invariant'

export function draw (component, ...args) {
  if (component._instance !== undefined) {
    const instance = component._instance

    // call draw method on this component
    if (instance.draw !== undefined) {
      instance.draw(...args)
    }

    // call draw on children
    let children = React.Children.toArray(instance.props.children)
    children.forEach(child => draw(child, ...args))
  }
}
