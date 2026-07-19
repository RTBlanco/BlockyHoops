import * as THREE from 'three'
import { GameObject } from '../gameObjects/GameObject'
import { Obsticle } from './Obsticle'

export class BlockObject extends Obsticle{
  constructor(position){
    super('Block', position)
    const blockSize = 2.5
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize, blockSize)
    const material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.copy(position)
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
