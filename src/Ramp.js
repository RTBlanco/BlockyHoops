import * as THREE from 'three'
import { GameObject } from './GameObject'

export class RampObject extends GameObject{
  constructor(){
    super('Block')
    const radius = 2.5
    const geometry = new THREE.TetrahedronGeometry( radius );
    const material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.y = 1.5
    this.mesh.position.x = 5
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1)
    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    this.body.setGravityScale(10, true)
  }
}
