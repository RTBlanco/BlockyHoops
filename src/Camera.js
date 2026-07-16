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


    this.idealOffset = new THREE.Vector3(0, 8, 20);
    this.idealLookAt = new THREE.Vector3(); 


    const gui = new GUI()
    const cameraGui = gui.addFolder('Camera Postion')
    cameraGui.add(this.camera.position, 'x', -50, 50)
    cameraGui.add(this.camera.position, 'y', 50, 50)
    cameraGui.add(this.camera.position, 'z', 50, 50)

    const lookATgui = gui.addFolder('Lookat')
    lookATgui.add(this.idealLookAt, 'x', -50, 50)
    lookATgui.add(this.idealLookAt, 'y', -50, 50)
    lookATgui.add(this.idealLookAt, 'z', -50, 50)

    const offset = gui.addFolder('offset')
    offset.add(this.idealOffset, 'x', -50, 50)
    offset.add(this.idealOffset, 'y', -50, 50)
    offset.add(this.idealOffset, 'z', -50, 50)
    // offset.add(this.idealLookAt.rotation, 'y', -50,50)
  }

  getCameraTargetPosition(character) {
    const offset = this.idealOffset.clone();
    return character.position.clone().add(offset);
  }

  get mesh() {
    return this.camera
  }

  update(time, target){

    const targetPosition = this.getCameraTargetPosition(target);

    const t = 1.0 - Math.pow(0.001, time.getDelta())

    this.camera.position.lerp(targetPosition, t);
    
    const currentLookAt = this.idealLookAt
    currentLookAt.lerp(target.position, t)

    this.camera.lookAt(currentLookAt);
  }
}