import React, {Component} from 'react'
import Material from './components/material'
import Model from './components/model'
import {render, draw, getRenderingContext} from '../src'

class Scene extends Component {
  componentDidMount () {
    this.gl = getRenderingContext(this)
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
  }

  // Render returns the tree
  render () {
    return <renderElement />
  }

  // Draw performs gl operations
  draw (delta) {
    const gl = this.gl
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}

// Add the canvas 
let canvas = document.createElement('canvas')
document.body.appendChild(canvas)

// Get a rendering context
let gl = canvas.getContext('webgl')

// Render the React scene tree
const scene = render(<Scene />, gl)

// Loop draw calls on the scene 
let start
function animationLoop (timestamp) {
  if (start === undefined) start = timestamp;
  let delta = timestamp - start
  draw(scene, delta)
  requestAnimationFrame(animationLoop)
}

animationLoop()
