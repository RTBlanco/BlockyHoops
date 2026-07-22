import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { CameraObject } from './Camera';
import { ArenaObject } from './gameObjects/Arena';
import { LightObject } from './Light';
import { BallObject } from './gameObjects/Ball';

// import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierPhysics } from './RapierPhysics';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';
import { BlockObject } from './obsticles/Block';
import { RampObject } from './obsticles/Ramp';
import { HoopObject } from './gameObjects/Hoop';

import levels from './levels.json' with { type: 'json'}

export class Manager {
  constructor(canvas, menu, scenes=[], cameras=[]) {
    this.canvas = canvas
    this.menu = menu
    this.renderer = new THREE.WebGLRenderer({antialias: true, canvas: this.canvas})
    this.scenes = scenes
    this.activeScene = scenes.length > 0 ? scenes[0] : new THREE.Scene()
    this.cameras = cameras
    this.isPaused = this.menu.isPaused
    this.activeCamera = cameras.length > 0 ? cameras[0]: new CameraObject()
    const ambient = new THREE.HemisphereLight( 0x555555, 0xFFFFFF );
    this.activeScene.add(ambient)
    this.level = 0

    this.activeScene.add(new LightObject().mesh)

    this._loadLevel(this.level)
    

    const controls = new OrbitControls(this.activeCamera.mesh, this.canvas)
    controls.target.set(0,5,0)
    controls.update()

    
  }


  update(time) {
    if (this._resizeRendererToDisplaySize(this.renderer)) {
      this.activeCamera.mesh.aspect = this.canvas.clientWidth / this.canvas.clientHeight
      this.activeCamera.mesh.updateProjectionMatrix()
    }

    if ( this.physicsHelper ) this.physicsHelper.update();
    this._addGameLoops(time)


    if (this.player.mesh && this.hoop.mesh) {
      const sensor = new THREE.Vector3()
      this.hoop.sensorPosition.getWorldPosition(sensor)
      
      const distance = this.player.mesh.position.distanceTo(sensor)
      if (distance < 1 && !this.menu.isPaused) {
        this._won()
      }
    }
    
    this.renderer.render(this.activeScene, this.activeCamera.mesh);
  }


  async initPhysics() {
    if (!this.physics) {
      this.physics = await RapierPhysics();
    }
    this.physics.setPaused(this.isPaused)

    // this.floor.initializePhysics(this.physics)
    await this._addToScene(this.objects)
  }

  setPaused(paused) {
    this.isPaused = paused
    this.physics?.setPaused(paused)
  }

  async _addToScene(items){
    for (const item of items) {
      const loadedItem = await item.init()
      const mesh = loadedItem.mesh;
      this.activeScene.add(mesh);
      loadedItem.initializePhysics(this.physics)

    }
  }

  _resizeRendererToDisplaySize(renderer, maxPixelCount=3840*2160) {

    const pixelRatio = window.devicePixelRatio;
    let width  = Math.floor( this.canvas.clientWidth  * pixelRatio );
    let height = Math.floor( this.canvas.clientHeight * pixelRatio );
    const pixelCount = width * height;
    const renderScale = pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;
    width = Math.floor(width * renderScale);
    height = Math.floor(height * renderScale);

    const needResize = this.canvas.width !== width || this.canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }

  _addGameLoops(time) {
    for(let i=0; i < this.objects.length; i++){
      let objects = [...this.objects]
      objects.splice(i, 1)

      this.objects[i].update(time, this.physics, objects);

      if (this.objects[i].type == "Ball" && this.objects[i].mesh ) {
        this.activeCamera.update(time, this.objects[i].mesh)
      }
    }
  }

  _loadLevel(levelNum=0) {
    if (levelNum != 0) {
      this.objects.forEach(obj => {
        this.activeScene.remove(obj.mesh)

        obj.mesh?.traverse(child => {
          if (child.isMesh) this.physics.removeMesh(child)
        })
  
      })
    }


    const level = levels[levelNum]

    this.player = new BallObject()
    this.hoop = new HoopObject(new THREE.Vector3(level.Hoop.x,level.Hoop.y, level.Hoop.z))

    this.objects = [
      this.hoop,
      new RampObject(new THREE.Vector3(level.obsticles.ramp.x, level.obsticles.ramp.y, level.obsticles.ramp.z)),
      new ArenaObject(level.num),
      this.player,
      new BlockObject(new THREE.Vector3(level.obsticles.block.x, level.obsticles.block.y, level.obsticles.block.z)),
    ]
    this.initPhysics();
  }


  _won(){
    this.level ++
    this.menu.displayWin(() => {
      this._loadLevel(this.level)
    })
  }
}
