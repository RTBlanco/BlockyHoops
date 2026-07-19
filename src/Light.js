import * as THREE from 'three'
import { GameObject } from './gameObjects/GameObject';

export class LightObject{
  constructor(){
    this.mesh = new THREE.DirectionalLight( 0xffffff, 4 );

    this.mesh.position.set( 0, 12.5, 12.5 );
    this.mesh.castShadow = true;
    this.mesh.shadow.radius = 3;
    this.mesh.shadow.blurSamples = 8;
    this.mesh.shadow.mapSize.width = 1024;
    this.mesh.shadow.mapSize.height = 1024;

    const size = 10;
    this.mesh.shadow.camera.left = - size;
    this.mesh.shadow.camera.bottom = - size;
    this.mesh.shadow.camera.right = size;
    this.mesh.shadow.camera.top = size;
    this.mesh.shadow.camera.near = 1;
    this.mesh.shadow.camera.far = 50;

    
  }

}
