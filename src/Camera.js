import * as THREE from 'three'

export class CameraObject{
  constructor(){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // this.camera = new THREE.OrthographicCamera()
    this.camera.position.set(10, 10 ,20)
  }


  get mesh() {
    return this.camera
  }

  update(time, target){

    const characterPosition = new THREE.Vector3();

    target.getWorldPosition(characterPosition);
    characterPosition.y = 2.5


    this.camera.lookAt(characterPosition)
  }
}