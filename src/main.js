import './style.css'
import { Manager } from './Manager'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Menu } from './menuLogic'

const clock = new THREE.Timer()
clock.connect(document)

const menu = new Menu(render, clock, paused => manager.setPaused(paused))

const canvas = document.querySelector('#Game')
const manager = new Manager(canvas, menu)
const renderer = manager.renderer

const stats = new Stats()



document.body.appendChild( stats.dom );
function render() {
  if (menu.isPaused) return
  clock.update()
  manager.update(clock);
  stats.update();
}
manager.renderer.setAnimationLoop(render)
