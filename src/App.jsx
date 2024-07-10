import { SceneLoader, GlowLayer } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';

function App () {

  let url = 'http://localhost:5173/src/assets/';
  let filename = 'GameScene.babylon';

  const load = (scene) => {
    new GlowLayer('glow', scene);
    // scene.activeCamera 
    // scene.lights 
    let player = scene.meshes.find(mesh => mesh.name === 'Player');
    window.addEventListener('click', () => player.position.y += 1);
  }

  return <SceneComponent 
    antialias
    onSceneReady={scene => SceneLoader.Append(url, filename, scene, load)}
    onSceneUpdate={() => {}}
  />;
}

export default App;