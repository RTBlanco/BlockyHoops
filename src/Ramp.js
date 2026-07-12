import * as THREE from 'three'
import { GameObject } from './GameObject'
// import { RapierPhysics } from 'three/examples/jsm/Addons.js';
import { RapierPhysics } from './RapierPhysics'

export class RampObject extends GameObject{
  constructor(){
    super('Block')
    const radius = 2.5
    const geometry = new THREE.TetrahedronGeometry( radius );
    const material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.position.y = 1.5
    this.mesh.position.x = 5
  }

  initializePhysics(physics) {
    physics.addMesh(this.mesh, 1)
    this.body = this.mesh.userData.physics?.body ?? null

    if (!this.body) throw new Error('Block physics body was not created')

    // const bodyDesc = physics.RAPIER.RigidBodyDesc.dynamic()
    //   .setTranslation(5, 1.5, 0); // Drop it from above
    // const rigidBody = physics.world.createRigidBody(bodyDesc);

    // // 3. Create the Collider (Shrink-wrap the tetrahedron)
    // const vertices = this.mesh.geometry.attributes.position.array;
    // const colliderDesc = physics.RAPIER.ColliderDesc.convexHull(vertices);

    // const mass = 1
    // const restitution = 0
    // const shape = colliderDesc;

		// if ( shape === null ) return;

		// shape.setMass( mass );
		// shape.setRestitution( restitution );

		// const { body, collider } = this.mesh.isInstancedMesh
		// 	? RapierPhysics.createInstancedBody( this.mesh, mass, shape )
		// 	: this.createBody(physics, this.mesh.position, this.mesh.quaternion, mass, shape );

		// if ( ! this.mesh.userData.physics ) this.mesh.userData.physics = {};

		// this.mesh.userData.physics.body = body;
		// this.mesh.userData.physics.collider = collider;

		// if ( mass > 0 ) {

		// 	physics.meshes.push( mesh );
		// 	physics.meshMap.set( mesh, { body, collider } );

		// }
    // if (colliderDesc) {
    //   physics.world.createCollider(colliderDesc);
    // } 
    // this.body.setLinearDamping(1.5)
    // this.body.setAngularDamping(1.5)
    this.body.setGravityScale(10, true)
  }

  // this is directly from rapier
  createBody(physics, position, quaternion, mass, shape ) {

		const desc = mass > 0 ? physics.RAPIER.RigidBodyDesc.dynamic() : physics.RAPIER.RigidBodyDesc.fixed();
		desc.setTranslation( ...position );
		if ( quaternion !== null ) desc.setRotation( quaternion );

		const body = physics.world.createRigidBody( desc );
		const collider = physics.world.createCollider( shape, body );

		return { body, collider };

	}
}
