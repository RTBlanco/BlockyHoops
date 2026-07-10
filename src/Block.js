import * as THREE from 'three'
import { GameObject } from './GameObject'

export class BlockObject extends GameObject{
  constructor(){
    super('Block')
    const blockSize = 2.5
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize, blockSize)
    const material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.blockMesh = new THREE.Mesh(geometry, material)
  }

  get mesh() {
    return this.blockMesh
  }
}