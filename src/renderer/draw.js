import React from 'react'
import invariant from 'invariant'

export function draw (component, ...args) {
  if (component._instance !== undefined) {
    const instance = component._instance

    // call draw method on this component
    if (instance.draw !== undefined) {
      instance.draw(...args)
    }

    // call draw on rendered component
    draw(component._renderedComponent, ...args)

    // call draw on children
    React.Children.forEach(
      component._currentElement.props.children,
      child => {
        draw(child, ...args)
      }
    )
  }
}
