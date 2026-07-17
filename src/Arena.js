import * as THREE from 'three'
import { GameObject } from './GameObject';

export class ArenaObject extends GameObject{
  constructor() {
    super('Arena')

    const geometry = new THREE.BoxGeometry( 20, 0.5, 20 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );

    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.receiveShadow = true;

    // this.mesh.position.y = - 0.25;

    new THREE.TextureLoader().load('/textures/grid.png', ( texture ) => {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 20, 20 );
      this.mesh.material.map = texture;
      this.mesh.material.needsUpdate = true;

    } );
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 0, 0)
  }
}
