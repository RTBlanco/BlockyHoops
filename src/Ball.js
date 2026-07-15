import * as THREE from 'three'
import { GameObject } from './GameObject';

export class BallObject extends GameObject{
  constructor() {
    super('Ball')
    const geometry = new THREE.SphereGeometry(1)
    
    const loader = new THREE.TextureLoader()
    const texture = loader.load("/textures/balldimpled.png")
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshPhongMaterial({  
      map: texture
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.y = 10
    this.mesh.castShadow = true;

    this._controls()

    
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1, 1)
    this.body = this.mesh.userData.physics?.body ?? null
    this.collider = this.mesh.userData.physics.collider ?? null

    if (!this.body) throw new Error('Ball physics body was not created')

    this.collider?.setFriction(0.1)

    this.body.setLinearDamping(0.3)
    this.body.setAngularDamping(0.1)
    this.body.setGravityScale(10, true)
    
  }

  lock() {
    this.body.lockTranslations(true, true);
    this.body.lockRotations(true, true);
    this.body.setEnabledRotations(true, false, false, true);
  }

  _controls() {
    this.jumpQueued = false
    this.movement = { forward: 0, right: 0 };
    this.lockItem = false
    this.coyoteTime = 0.15
    this.coyoteTimer = 0

    this.jumpBufferTime = 0.15
    this.jumpBufferTimer = 0

    window.addEventListener( 'keydown', ( event ) => {
      if ( event.key === 'l' ) {
        event.preventDefault()
        this.lockItem = true
      }
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
      if ( event.key === 'l' ) {
        event.preventDefault()
        this.lockItem = false
      }
      if ( event.key === 'w' || event.key === 's' || event.key === 'ArrowUp' || event.key === 'ArrowDown' ) this.movement.forward = 0;
      if ( event.key === 'a' || event.key === 'd' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) this.movement.right = 0;
  
    } );

  }

  jump() {
    // this.jumpQueued = true
    this.jumpBufferTimer = this.jumpBufferTime
  }

  applyImpulse(x, y, z) {
    this.body?.applyImpulse({ x, y, z }, true)
  }

  update(time, physics, objects) {
    if (!this.body) return;

    const deltaTime = time.getDelta()
    const speed = 6
    const jumpSpeed = 25

    this.onGround = false

    objects.forEach(element => {
      const collider = element.mesh.userData.physics.collider
      physics.world.contactPair(this.collider, collider ,(e, f) => {
        this.onGround = true
        // debugger
        if (element.type === 'Block' && this.lockItem) {
          console.log("touching block")
          // debugger
          element.lock()
          this.lockItem = false
        }
        // console.log(this.onGround)
        // console.log(element.translation().y)
        // console.log(e)
        // debugger
      }
    )
    });


    // const speed = 6;
    const direction = new THREE.Vector3(this.movement.right, 0, -this.movement.forward);
    if (direction.lengthSq() > 1) direction.normalize();

    const velocity = this.body.linvel();
    const position = this.body.translation();
    const isGrounded = this.onGround
    if (isGrounded) {
      this.coyoteTimer = this.coyoteTime
    } else {
      this.coyoteTimer = Math.max(0,this.coyoteTimer - deltaTime)
    }

    this.jumpBufferTimer = Math.max(0,this.jumpBufferTimer - deltaTime)

    const canJump = this.coyoteTimer > 0 && this.jumpBufferTimer > 0
    const hasMovementInput = direction.lengthSq() > 0;

    this.body.setLinvel({
      x: hasMovementInput ? direction.x * speed : velocity.x,
      y: canJump ? jumpSpeed : velocity.y,
      z: hasMovementInput ? direction.z * speed : velocity.z,
    }, true);


    if (canJump) {
      this.coyoteTimer = 0
      this.jumpBufferTimer = 0
    }

    this.onGround = isGrounded
    // console.log(physics.world.colliders.map.data)
    // physics.world.colliders.
    // console.log(position)
  }
}
