import * as THREE from 'three'
import { GameObject } from './GameObject'
// import { RapierPhysics } from 'three/examples/jsm/Addons.js';
import { RapierPhysics } from './RapierPhysics'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'

export class RampObject extends GameObject{
  constructor(){
    super('Ramp')

    this.material = new THREE.MeshPhongMaterial({
      color: "green"
    })
  }

  async init() {
    const loader = new GLTFLoader()
    const geometry = await loader.loadAsync('/models/ramp.glb')

    this.mesh = geometry.scene.children[0]
    this.mesh.position.y = 1.5
    this.mesh.position.x = 5
    this.mesh.rotation.y = THREE.MathUtils.degToRad(180);
    this.mesh.material = this.material
    return this
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 0, 0, (geometry) => {
      const vertices = geometry.attributes.position.array;
      return physics.RAPIER.ColliderDesc.convexHull(vertices);
    })

    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    this.body.setGravityScale(1, true)
  }

}
