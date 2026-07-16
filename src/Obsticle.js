import { GameObject } from "./GameObject";

export class Obsticle extends GameObject {
  constructor() {
    super("Obsticle")
  }

  lock() {
    if (this.body.isFixed()) {
      this.body.setBodyType(0)
    } else {
      this.body.setBodyType(1)
    }
    // this.body.lockTranslations();
    // this.body.lockRotations();
    // this.body.setEnabledRotations(true, false, false, true);
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
}