import React, {Component} from 'react'
import createShader from 'gl-shader'
import createBuffer from 'gl-buffer'
import {render, draw, getRenderingContext} from '../src'

class Triangle extends Component {
  // gl becomes available after mount because it's the "parent"
  // we're rooted to, so here's where we perform setup
  componentDidMount () {
    const gl = getRenderingContext(this)

    this.gl = gl 
    this.shader = createShader(gl,
      `attribute vec2 position;
      varying vec2 uv;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        uv = position.xy;
      }`,
      `precision highp float;
      uniform float tick;
      varying vec2 uv;
      void main() {
        gl_FragColor = vec4(0.5*(uv+1.0), 0.5*(cos(tick)+1.0), 1.0);\
      }`)
    this.shader.attributes.position.location = 0

    this.buffer = createBuffer(gl, [-1, 0, 0,-1, 1, 1])
  }

  // Render must return something for this node to show in the scene
  // but I don't yet have a way to make this useful for leaf nodes
  render () {
    return <noop />
  }

  // Draw call happens every frame
  draw (delta) {
    const gl = this.gl

    this.shader.bind()
    this.buffer.bind()
    this.shader.attributes.position.pointer()
    this.shader.uniforms.tick = delta / 1000
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
}

class Scene extends Component {
  // gl rendering context availaible
  componentDidMount () {
    this.gl = getRenderingContext(this)
    this.gl.viewport(2, 0, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
  }

  // Render the tree
  render () {
    return <Triangle />
  }

  // Top-level drawing details for every frame
  draw (delta) {
    const gl = this.gl
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }
}

// Add the canvas 
let canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
document.body.appendChild(canvas)

// Get a rendering context
let gl = canvas.getContext('webgl')

// Render the React scene tree
const scene = render(<Scene />, gl)

// Perform a draw for every animation frame
let start
function animationLoop (timestamp) {
  if (start === undefined) start = timestamp;
  let delta = timestamp - start
  draw(scene, delta)
  requestAnimationFrame(animationLoop)
}

animationLoop()
