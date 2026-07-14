import * as THREE from 'three'

export class CameraObject{
  constructor(){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this._currentPostition = new THREE.Vector3()
    this._currentLookat = new THREE.Vector3()
  }


  get mesh() {
    return this.camera
  }

  update(time, target){
    const cameraOffset = new THREE.Vector3(0, 5, 10); // 5 units up, 10 units behind

    // 2. Get the character's world position
    const characterPosition = new THREE.Vector3();
    target.getWorldPosition(characterPosition);

    // 3. Update the camera position
    this.camera.position.copy(characterPosition).add(cameraOffset);

    // 4. Make the camera look at the character
    this.camera.lookAt(characterPosition);

    // Ensure the camera looks at the character
    this.camera.lookAt(characterPosition);
    // const idealOffset = this._calculdateIdealOffset(target)
    // const idealLookat = this._calculdateIdealLookat(target)

    // this._currentPostition.copy(idealOffset)
    // this._currentLookat.copy(idealLookat)

    // this.camera.position.copy(this._currentPostition)
    // this.camera.lookAt(this._currentLookat)
  }


  _lockOn(object) {
    this.camera.lookAt(object.position)
  }
}