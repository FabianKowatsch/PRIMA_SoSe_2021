namespace SpaceInvaders {
  import f = FudgeCore;

  // const frameRate: number = 60;
  const enemiesPerRow: number = 9;
  const rowAmount: number = 4;
  const barrierAmount: number = 5;
  const startPosX: number = -(enemiesPerRow - 1) / 2;
  const startPosY: number = 10;

  export const enemyMesh: f.MeshSphere = new f.MeshSphere("EnemySphere", 10, 9);
  export const whiteMaterial: f.Material = new f.Material(
    "Mat",
    f.ShaderUniColor,
    new f.CoatColored(new f.Color(1, 1, 1, 1))
  );
  export const barrierMesh: f.MeshCube = new f.MeshCube("barrierCube");
  export const greenMaterial: f.Material = new f.Material(
    "Mat",
    f.ShaderUniColor,
    new f.CoatColored(new f.Color(0.3, 1, 0, 1))
  );
  export const spaceShipMesh: f.MeshCube = new f.MeshCube("ShipCube");

  const root: f.Node = new f.Node("Root");
  const invaderNode: f.Node = new f.Node("Invaders");
  const barrierNode: f.Node = new f.Node("Barriers");
  createEnemies();
  createSpaceShip();
  createBarriers();

  let viewport: f.Viewport = new f.Viewport();
  window.addEventListener("load", init);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("#viewport");
    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 5, 15));
    cmpCamera.mtxPivot.rotateY(180);
    console.log(root);
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();
  }

  function createEnemies(): void {
    let counterRow: number = 0;
    let counterEnemies: number = 0;
    for (let i: number = 0; i < enemiesPerRow * rowAmount; i++) {
      let invader: Invader = new Invader(counterEnemies, -counterRow);
      invaderNode.appendChild(invader);

      if (counterEnemies === enemiesPerRow - 1) {
        counterRow++;
        counterEnemies = 0;
      } else {
        counterEnemies++;
      }
    }
    let translate: f.Vector3 = new f.Vector3(startPosX, startPosY, 0);
    let transform: f.ComponentTransform = new f.ComponentTransform();
    transform.mtxLocal.translate(translate);
    invaderNode.addComponent(transform);
    root.appendChild(invaderNode);
  }

  function createSpaceShip(): void {
    let spaceShip: SpaceShip = new SpaceShip();
    root.appendChild(spaceShip);
  }

  function createBarriers(): void {
    let counter: number = 0;
    for (let i: number = 0; i < barrierAmount; i++) {
      let barrier: Barrier = new Barrier(startPosX + counter, 2);
      barrierNode.appendChild(barrier);
      counter += -((2 * startPosX) / (barrierAmount - 1));
    }
    root.appendChild(barrierNode);
  }
}
