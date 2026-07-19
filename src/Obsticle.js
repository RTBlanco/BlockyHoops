import { GameObject } from "./GameObject";

export class Obsticle extends GameObject {
  constructor(type, position) {
    super("Obsticle")
    this.obsticleType = type
    this.ObsticlePosition = position
  }

  lock() {
    if (this.body.isFixed()) {
      this.body.setBodyType(0)
    } else {
      this.body.setBodyType(1)
    }
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1)
    this.body = this.mesh.userData.physics?.body ?? null
    this.collider = this.mesh.userData.physics?.collider ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    this.body.setGravityScale(10, true)
  }

  update(time, physics, objects) {
    if (this.mesh && this.mesh.position.y < - 2) {

      this.body.setTranslation( new physics.RAPIER.Vector3( this.ObsticlePosition.x, this.ObsticlePosition.y + 3, this.ObsticlePosition.z), true );
    }
  }
}