import { SceneLoader, GlowLayer } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import { start, update } from './utilities/game';
import { useRef } from 'react';

function App () {

  let url = '/assets/';
  let filename = 'GameScene.babylon';
  let infoRef = useRef(null);

  const showInfo = (text) => infoRef.current.innerText = text;

  const load = (scene) => {
    new GlowLayer('glow', scene);
    start(scene, showInfo);
  }

  return (
    <>
      <p
        ref={infoRef}
        style={{
          position: 'absolute',
          top: '-1rem',
          right: '3rem',
          width: '100vw',
          textAlign: 'right',
          fontSize: '3rem',
          color: '#1DE8FF',
          fontFamily: '"Black Ops One"',
          textShadow: 'black 4px 4px, black 4px -4px, black -4px -4px, black -4px 4px'
        }}
      ></p>
      <SceneComponent 
        antialias
        onSceneReady={scene => SceneLoader.Append(url, filename, scene, load)}
        onRender={update}
      />    
    </>
  );
}

export default App;