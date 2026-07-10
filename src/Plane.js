import * as THREE from 'three'
import { GameObject } from './GameObject';

export class PlaneObject extends GameObject{
  constructor() {
    super('floor')

    const geometry = new THREE.BoxGeometry( 20, 0.5, 20 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );

    this.floor = new THREE.Mesh( geometry, material );
    this.floor.receiveShadow = true;

    this.floor.position.y = - 0.25;
    this.floor.userData.physics = { mass: 0 };

    new THREE.TextureLoader().load('../public/textures/grid.png', ( texture ) => {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 20, 20 );
      this.floor.material.map = texture;
      this.floor.material.needsUpdate = true;

    } );

  }

  mesh() {
    return this.floor
  }
}