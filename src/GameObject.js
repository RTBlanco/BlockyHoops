export class GameObject {
  constructor(type) {
    if (new.target === GameObject) {
      throw new TypeError('GameObject cannot be instantiated directly')
    }

    if (!type) {
      throw new TypeError('GameObject requires a type')
    }

    this.type = type
    this._mesh = null
  }

  set mesh(mesh) {
    if (!mesh?.isObject3D) {
      throw new TypeError('GameObject mesh must be a THREE.Object3D')
    }

    this._mesh = mesh
  }

  get mesh() {
    if (!this._mesh) {
      throw new Error(`${this.type} has not assigned a mesh`)
    }

    return this._mesh
  }

  initializePhysics(physics) {
    // Objects without physics can use this default no-op.
  }

  update(deltaTime, physics) {
    // Static objects can use this default no-op.
  }
}
