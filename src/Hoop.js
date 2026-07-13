import * as THREE from 'three'
import { GameObject } from './GameObject'
// import { RapierPhysics } from 'three/examples/jsm/Addons.js';
import { RapierPhysics } from './RapierPhysics'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

export class HoopObject extends GameObject{
  constructor(){
    super('Hoop')

    this.material = new THREE.MeshPhongMaterial({
      color: "green"
    })
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

    this.mesh.position.y = -5.2
    this.mesh.position.z = - 15
    this.mesh.rotation.y = THREE.MathUtils.degToRad(-90)

    // debugger
    // this.mesh.material = this.material
    return this
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
