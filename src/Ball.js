import * as THREE from 'three'
import { GameObject } from './GameObject';

export class BallObject extends GameObject{
  constructor() {
    super('Ball')
    const geometry = new THREE.SphereGeometry(1)
    
    const loader = new THREE.TextureLoader()
    const texture = loader.load("../public/textures/balldimpled.png")
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshPhongMaterial({  
      map: texture
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.y = 10
    this.mesh.castShadow = true;

    this.mesh.userData.physics = {
      mass: 1,
      restitution: 1
    }

    this.body = null
    this._controls()

    
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1, 1)
    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Ball physics body was not created')

    this.body.setLinearDamping(1.5)
    this.body.setAngularDamping(1.5)
    this.body.setGravityScale(10, true)
  }

  _controls() {
    this.onGround = false
    this.jumpQueued = false
    this.movement = { forward: 0, right: 0 };

    window.addEventListener( 'keydown', ( event ) => {

      if ( event.key === 'w' || event.key === 'ArrowUp' ) this.movement.forward = 1;
      if ( event.key === 's' || event.key === 'ArrowDown' ) this.movement.forward = - 1;
      if ( event.key === 'a' || event.key === 'ArrowLeft' ) this.movement.right = - 1;
      if ( event.key === 'd' || event.key === 'ArrowRight' ) this.movement.right = 1;
      if ( event.key === ' ' && ! event.repeat ) {
        event.preventDefault();
        this.jump()
      }
  
    } );

    window.addEventListener( 'keyup', ( event ) => {
  
      if ( event.key === 'w' || event.key === 's' || event.key === 'ArrowUp' || event.key === 'ArrowDown' ) this.movement.forward = 0;
      if ( event.key === 'a' || event.key === 'd' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) this.movement.right = 0;
  
    } );

  }

  jump() {
    this.jumpQueued = true
  }

  applyImpulse(x, y, z) {
    this.body?.applyImpulse({ x, y, z }, true)
  }

  update(deltaTime) {
    if (!this.body) return;

    const speed = 6;
    const direction = new THREE.Vector3(this.movement.right, 0, -this.movement.forward);
    if (direction.lengthSq() > 1) direction.normalize();

    const velocity = this.body.linvel();
    const position = this.body.translation();
    const isGrounded = position.y <= 1.5;

    const hasMovementInput = direction.lengthSq() > 0;

    this.body.setLinvel({
      x: hasMovementInput ? direction.x * speed : velocity.x,
      y: this.jumpQueued && isGrounded ? 25 : velocity.y,
      z: hasMovementInput ? direction.z * speed : velocity.z,
    }, true);

    this.onGround = isGrounded;
    this.jumpQueued = false;
  }
}
