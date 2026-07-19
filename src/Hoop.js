import * as THREE from 'three'
import { GameObject } from './GameObject'
// import { RapierPhysics } from 'three/examples/jsm/Addons.js';
import { RapierPhysics } from './RapierPhysics'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'

export class HoopObject extends GameObject{
  constructor(position){
    super('Hoop')

    this.material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.position = position
  }

  async init() {
    const loader = new GLTFLoader()
    const geometry = await loader.loadAsync('/models/basketball_hoop.glb')

    let hoopMesh

    geometry.scene.traverse((child) => {
      if (!hoopMesh && child.isMesh) {
        hoopMesh = child
      }
    })


    this.mesh = hoopMesh
    this.mesh.geometry = this.mesh.geometry.clone()
    this.mesh.geometry.scale(17, 17, 17)

    this.mesh.position.copy(this.position)
    this.mesh.rotation.y = THREE.MathUtils.degToRad(-90) // fix rotation with blender object

    this._gui()
    this.sensorPosition = this.sensor()
    return this
  }

  _gui() {
    const gui = new GUI
    const cameraGui = gui.addFolder('Hoop')
    const hoop = this.mesh

    cameraGui.add(hoop.position, 'x', -50, 50)
    cameraGui.add(hoop.position, 'y', -50, 50)
    cameraGui.add(hoop.position, 'z', -50, 50)
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 0)
  }

  sensor() {
    const geometry = new THREE.CircleGeometry( 2, 32 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const circle = new THREE.Mesh( geometry, material );
   
    circle.position.copy(new THREE.Vector3(9.6,9,0))
    circle.rotation.x = THREE.MathUtils.degToRad(-90)
    this.mesh.add( circle )


    // const gui = new GUI
    // const cameraGui = gui.addFolder('HoopSensor')


    // cameraGui.add(circle.position, 'x', -50, 50)
    // cameraGui.add(circle.position, 'y', -50, 50)
    // cameraGui.add(circle.position, 'z', -50, 50)
    return circle
  }

}
