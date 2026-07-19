import * as THREE from 'three'
import { GameObject } from './GameObject';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export class ArenaObject extends GameObject{
  constructor(level = 0) {
    super('Arena')

    const levels = ['dev', 'level1']
    this.level = levels[level]
    // this.mesh.position.y = - 0.25;
    
    this.physicsMeshes = []
    if (this.level == 'dev') {
      
      const geometry = new THREE.BoxGeometry( 20, 0.5, 20 );
      const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
      this.mesh = new THREE.Mesh( geometry, material );
      this.mesh.receiveShadow = true;

      new THREE.TextureLoader().load('/textures/grid.png', ( texture ) => {
  
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 20, 20 );
        this.mesh.material.map = texture;
        this.mesh.material.needsUpdate = true;
  
      } );
    }
  }

  async init() {
    if (this.level === "dev" ) { return this }

    const loader = new GLTFLoader()
    const geometry = await loader.loadAsync(`/models/levels/${this.level}.glb`)

    this.mesh = geometry.scene

    this.mesh.position.set(0, 0, 0)

    return this
  }
  
  initializePhysics(physics) {

    this.mesh.traverse((child) => {
      if (!child.isMesh) return

      physics.addMesh(child, 0)

      this.physicsMeshes.push({
        mesh: child,
        body: child.userData.physics?.body,
        collider: child.userData.physics?.collider,
      })
    })

    this.mesh.userData.physics = this.physicsMeshes[0]

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    // this.body.setGravityScale(10, true)
  }
}
