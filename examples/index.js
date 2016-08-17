import React, {Component} from 'react'
import {render} from '../src/render'

class Model extends Component {
  componentDidMount () {

  }

  render () {
    return (
      <buffer></buffer>
    )
  }
}

let canvas = document.createElement('canvas')
document.body.appendChild(canvas)

let gl = canvas.getContext('webgl')

render(<Model />, gl)
