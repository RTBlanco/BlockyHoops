import * as THREE from 'three'
import { GameObject } from './GameObject';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export class ArenaObject extends GameObject{
  constructor(level = 0) {
    super('Arena')

    const levels = ['dev', 'level1']
    this.level = levels[level]
    // this.mesh.position.y = - 0.25;
    const geometry = new THREE.BoxGeometry( 20, 0.5, 20 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.mesh.receiveShadow = true;
    
    if (this.level == 'dev') {


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
    // debugger
    // this.mesh = geometry.scene
    this.geometry = geometry

    let arenaMesh

    geometry.scene.traverse((child) => {
      if (!arenaMesh && child.isMesh) {
        arenaMesh = child
      }
    })


    this.mesh = arenaMesh
    // this.mesh = geometry.scene.children[0]
    // this.mesh.geometry = this.mesh.geometry.clone()

    this.mesh.geometry.scale(
      this.mesh.scale.x,
      this.mesh.scale.y,
      this.mesh.scale.z
    )

    this.mesh.scale.set(1, 1, 1)

    // this.mesh.position.set(0, -5.2, -15)
    // this.mesh.geometry.scale(17, 17, 17)
    // this.mesh.scale.set(1, 1, 1)

    // this.mesh.position.y = -5.2
    // this.mesh.position.z = - 15
    // this.mesh.rotation.y = THREE.MathUtils.degToRad(-90)



    // this.mesh = geometry.scene.children[0]
    // this.mesh.position.y = 1.3
    // this.mesh.position.x = 5
    // this.mesh.position.copy(this.position)
    // this.mesh.rotation.y = THREE.MathUtils.degToRad(180);
    // this.mesh.material = this.material
    return this
  }
  
  initializePhysics(physics) {
    if (this.level != 'dev') {
      physics.addMesh(this.mesh, 0)
      return 
    }

    physics.addMesh(this.mesh, 0, 0, (geometry) => {
      const vertices = geometry.attributes.position.array;
      return physics.RAPIER.ColliderDesc.convexHull(vertices);
    })

    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    // this.body.setGravityScale(10, true)
  }
}
