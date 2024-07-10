
// Gameobjects
let scene = null;
let player = null;
// State variables
let score = 50;
let isGameStarted = false;
let isGameover = false;
// Arrays
let platformPositions = [];
let moveableObjects = [];
// Functions
let showInfo = null;

const getMesh = (name) => scene.meshes.find(mesh => mesh.name === `${name}`);

export const start = (mainScene, showInfoFunc) => {
  scene = mainScene;
  showInfo = showInfoFunc;
  showInfo("Press right or left key");
  player = getMesh("Player");
  // Getting base posible positions
  for(let i = 60; i >= 0; i--){
    if(i > 60 - 7){
      platformPositions.push({
        x: getMesh(i).position.x,
        z: getMesh(i).position.z,
      });
    }
    if(i < score - 1){
      getMesh(i).visibility = 0;
    }
  }
  moveableObjects.push(getMesh("LightParent"));
  moveableObjects.push(scene.activeCamera);
}

export const update = () => {
  if(isGameStarted && !isGameover){
    moveableObjects.map(mesh => mesh.position.y += 0.1);
  }
}

const updateScore = () => {
  score--;
  if(player.position.x === getMesh(score).position.x){
    if(score === 0){
      isGameover = true;
      showInfo("You win!");
    }else{
      showInfo(score);
      getMesh(score - 1).visibility = 1;
    }
  }else{
    isGameover = true;
    showInfo("Press Enter to try again");
  }
}

const replacePlayerPos = (direction) => {
  if(!isGameStarted) isGameStarted = true;
  if(isGameover) return;
  let index = 0;
  platformPositions.map((pos, posIndex) => {
    if(player.position.x === pos.x){
      index = posIndex;
    }
  });
  index = (index === 0) ? 1 : (index === 6) ? 5 : index + direction;
  player.position.x = platformPositions[index].x;
  player.position.y += 1.5;
  player.position.z = platformPositions[index].z;
  updateScore();
}

window.addEventListener("keydown", event => {
  switch(event.code){
    case "Enter": {
      window.location.reload();
    }
    case "KeyA", "ArrowLeft": {
      replacePlayerPos(1);
      break;
    }
    case "KeyD", "ArrowRight": {
      replacePlayerPos(-1);
      break;
    }
    default: break;
  }
});