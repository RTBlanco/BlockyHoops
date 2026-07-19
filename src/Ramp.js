import * as THREE from 'three'
import { GameObject } from './GameObject'
// import { RapierPhysics } from 'three/examples/jsm/Addons.js';
import { RapierPhysics } from './RapierPhysics'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Obsticle } from './Obsticle'

export class RampObject extends Obsticle{
  constructor(position){
    super('Ramp')
    this.material = new THREE.MeshPhongMaterial({
      color: "green"
    })
    this.position = position
  }

  async init() {
    const loader = new GLTFLoader()
    const geometry = await loader.loadAsync('/models/ramp.glb')

    this.mesh = geometry.scene.children[0]
    // this.mesh.position.y = 1.3
    // this.mesh.position.x = 5
    this.mesh.position.copy(this.position)
    this.mesh.rotation.y = THREE.MathUtils.degToRad(180);
    this.mesh.material = this.material
    this.mesh.userData.gameObjectType = "Ramp"
    return this
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1, 0, (geometry) => {
      const vertices = geometry.attributes.position.array;
      return physics.RAPIER.ColliderDesc.convexHull(vertices);
    })

    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    this.body.setGravityScale(10, true)
  }

}
