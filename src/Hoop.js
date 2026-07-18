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
    // const colider = await loader.loadAsync('/models/hoopColider.glb')

    let hoopMesh

    geometry.scene.traverse((child) => {
      if (!hoopMesh && child.isMesh) {
        hoopMesh = child
      }
    })


    this.mesh = hoopMesh
    this.mesh.geometry = this.mesh.geometry.clone()
    this.mesh.geometry.scale(17, 17, 17)
    // this.mesh.scale.set(1, 1, 1)

    this.mesh.position.copy(this.position)
    // this.mesh.position.y = -5.2
    // this.mesh.position.z = - 15
    this.mesh.rotation.y = THREE.MathUtils.degToRad(-90) // fix rotation with blender object

    // debugger
    // this.mesh.material = this.material
    // this._gui()
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
    // physics.addMesh(this.mesh, 1, 0, (geometry) => {
    //   // debugger
    //   const vertices = geometry.attributes.position.array;
    //   return physics.RAPIER.ColliderDesc.convexHull(vertices);
    // })
    // physics.addMesh(this.meshColider, 0)
    physics.addMesh(this.mesh, 0)
    // physics.addMesh(this.mesh.children[0], 0)
    // physics.addScene(this.mesh)
    // debugger
    // this.mesh.traverse(obj => {
    //   // console.log(obj.type)
    //   // if (obj.geometry && obj.geometry.type === 'BufferGeometry'){
    //   //   physics.addMesh(obj, 0)
    //   // }
    // })
   

    // this.body = this.mesh.userData.physics?.body ?? null

    // if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    // this.body.setGravityScale(1, true)
  }

}
