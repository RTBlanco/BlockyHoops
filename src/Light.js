import * as THREE from 'three'
import { GameObject } from './GameObject';

export class LightObject extends GameObject{
  constructor(){
    super('light')
    this.light = new THREE.DirectionalLight( 0xffffff, 4 );

    this.light.position.set( 0, 12.5, 12.5 );
    this.light.castShadow = true;
    this.light.shadow.radius = 3;
    this.light.shadow.blurSamples = 8;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;

    const size = 10;
    this.light.shadow.camera.left = - size;
    this.light.shadow.camera.bottom = - size;
    this.light.shadow.camera.right = size;
    this.light.shadow.camera.top = size;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 50;

    
  }

  get mesh() {
    return this.light
  }
}