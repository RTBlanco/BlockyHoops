

> This readme is obvious AI generated. I’ll change that. This is just a placeholder readme, to give it a bit of "life?"
# Blocky Hoops
Blocky Hoops is a physics-based puzzle game built with Three.js and Rapier. The player controls a basketball and thier objective is to use what objects are around in order to make themselves in the baseket 

After completing a basket, the game is intended to continue to a new level with more obstacles and movable objects arranged randomly. Each level challenges the player to understand the environment, reposition objects, and use the game's physics to reach the hoop.

> This project is currently a work in progress. The repository contains the core movement, rendering, object structure, and physics experimentation that will support the complete level loop.

<!-- ![Blocky Hoops](src/assets/hero.png) -->

## Purpose

The main purpose of this project is to learn graphics and game development through practical experimentation with Three.js and Rapier Physics. It serves as a place to explore how rendered objects, player input, collision shapes, and rigid-body physics work together in a browser game.

## Inspiration
While I was creating the game most of the movment and camera movement was based on the game called Marble Blasts

## Current features

- A physics-controlled basketball player
- WASD and arrow-key movement
- Jumping with coyote time and input buffering
- Dynamic blocks and obstacles that can be pushed around
- A static textured floor
- Rapier rigid bodies and colliders
- Three.js lighting, shadows, materials, and textures
- Orbit camera controls
- A reusable `GameObject` structure for meshes, updates, and physics initialization
- Rapier physics debug rendering

## Controls

| Action | Input |
| --- | --- |
| Move forward | `W` or `Arrow Up` |
| Move backward | `S` or `Arrow Down` |
| Move left | `A` or `Arrow Left` |
| Move right | `D` or `Arrow Right` |
| Jump | `Space` |
| Orbit camera | Mouse |

## What I learned

Building Blocky Hoops has helped me learn:

- How to structure a small game project around managers and reusable game objects
- How to create and manipulate Three.js scenes, cameras, lights, meshes, geometry, and materials
- How to load and apply textures and other 3D assets
- How to connect Three.js meshes to Rapier rigid bodies and colliders
- How to control velocity, gravity, impulses, damping, and collision behavior
- How to process keyboard input and update player movement every frame
- How player-friendly mechanics such as coyote time and jump buffering work
- How vertices and geometry form the objects displayed on screen
- How vectors, direction, velocity, and other basic game math affect movement
- How a rendering loop and physics simulation work together

## Built with

- [Three.js](https://threejs.org/) for 3D rendering
- [Rapier](https://rapier.rs/) for rigid-body physics and collisions
- [Vite](https://vite.dev/) for local development and production builds
- JavaScript and HTML Canvas

## Getting started

### Requirements

- Node.js
- npm
- An internet connection when Rapier is loaded by the current physics module

### Installation

Clone the repository and install its dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local address displayed by Vite in your browser.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
```

## Project structure

```text
BlockyHoops/
├── public/             # Public textures and icons
├── src/
│   ├── Ball.js         # Player input, movement, and ball physics
│   ├── Block.js        # Movable block game object
│   ├── Camera.js       # Three.js camera configuration
│   ├── Floor.js        # Static textured floor
│   ├── GameObject.js   # Shared game-object interface
│   ├── Light.js        # Scene lighting
│   ├── Manager.js      # Scene, rendering, and object orchestration
│   ├── Ramp.js         # Movable ramp/obstacle experiment
│   ├── RapierPhysics.js # Local Three.js/Rapier integration
│   └── main.js         # Application entry point and game loop
├── index.html
└── package.json
```

## Planned gameplay

- Add a basketball hoop and basket detection
- Complete a level when the player reaches the hoop
- Generate new layouts with randomized obstacles and movable objects
- Increase the difficulty as the player progresses
- Improve collision events and ground detection
- Add a score, level indicator, and restart flow
- Add more object types, textures, and imported 3D models

## Project status

Blocky Hoops is an educational prototype under active development. Its current focus is building a solid understanding of Three.js, Rapier, game architecture, and the foundational mathematics behind interactive 3D graphics.
