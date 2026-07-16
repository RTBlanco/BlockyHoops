import * as THREE from 'three'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

export class CameraObject{
  constructor(){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // this.camera = new THREE.OrthographicCamera()
    this.camera.position.set(0, 7.8 ,15)
    // Camera Controls
    const gui = new GUI()
    const cameraGui = gui.addFolder('Camera Postion')
    cameraGui.add(this.camera.position, 'x', 0, 100)
    cameraGui.add(this.camera.position, 'y', 0, 100)
    cameraGui.add(this.camera.position, 'z', 0, 100)
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