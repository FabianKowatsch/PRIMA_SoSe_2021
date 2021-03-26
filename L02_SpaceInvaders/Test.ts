namespace L01_FirstFudge {
  import f = FudgeCore;

  // const frameRate: number = 60;
  const enemiesPerRow: number = 7;
  const rowAmount: number = 3;
  const barrierAmount: number = 4;
  const startPosX: number = -(enemiesPerRow - 1) / 2;
  const startPosY: number = 8;

  const root: f.Node = new f.Node("Root");
  let enemies: Array<f.Node> = createEnemies();
  let spaceShip: f.Node = createSpaceShip();
  let barriers: Array<f.Node> = createBarriers();

  root.addChild(spaceShip);
  barriers.forEach((barrier) => {
    root.addChild(barrier);
  });
  enemies.forEach((enemy) => {
    root.addChild(enemy);
  });

  let viewport: f.Viewport = new f.Viewport();
  window.addEventListener("load", hndlLoad);

  function hndlLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("#viewport");
    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 5, 15));
    cmpCamera.mtxPivot.rotateY(180);
    console.log(root);
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();
  }

  function createEnemies(): Array<f.Node> {
    let enemies: Array<f.Node> = [];
    let counterRow: number = 0;
    let counterEnemies: number = 0;
    const enemyMesh: f.MeshSphere = new f.MeshSphere("EnemyCube", 10, 10);
    const enemyMaterial: f.Material = new f.Material(
      "Mat",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(1, 1, 1, 1))
    );

    for (let i: number = 0; i < enemiesPerRow * rowAmount; i++) {
      enemies[i] = new f.Node("enemy_" + i.toString());

      let translate: f.Vector3 = new f.Vector3(
        startPosX + counterEnemies,
        startPosY + counterRow,
        0
      );
      let scale: f.Vector3 = new f.Vector3(0.5, 0.5, 0);

      let transform: f.ComponentTransform = new f.ComponentTransform();
      transform.mtxLocal.translate(translate);
      transform.mtxLocal.scale(scale);
      enemies[i].addComponent(transform);
      enemies[i].addComponent(new f.ComponentMaterial(enemyMaterial));
      enemies[i].addComponent(new f.ComponentMesh(enemyMesh));
      if (counterEnemies === enemiesPerRow - 1) {
        counterRow++;
        counterEnemies = 0;
      } else {
        counterEnemies++;
      }
    }
    return enemies;
  }

  function createSpaceShip(): f.Node {
    let spaceShip: f.Node = new f.Node("SpaceShip");
    const spaceShipMesh: f.MeshCube = new f.MeshCube("ShipCube");
    const spaceShipMaterial: f.Material = new f.Material(
      "Mat",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(0.3, 1, 0, 1))
    );
    let scale: f.Vector3 = new f.Vector3(1, 0.5, 0);
    let transform: f.ComponentTransform = new f.ComponentTransform();
    transform.mtxLocal.scale(scale);

    spaceShip.addComponent(transform);
    spaceShip.addComponent(new f.ComponentMaterial(spaceShipMaterial));
    spaceShip.addComponent(new f.ComponentMesh(spaceShipMesh));

    return spaceShip;
  }

  function createBarriers(): Array<f.Node> {
    let barriers: Array<f.Node> = [];
    let barrierMesh: f.MeshCube = new f.MeshCube("barrierMesh");
    let barrierMaterial: f.Material = new f.Material(
      "Mat",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(0.3, 1, 0, 1))
    );
    let counter: number = 0;
    for (let i: number = 0; i < barrierAmount; i++) {
      barriers[i] = new f.Node("barrier_" + i.toString());

      let translate: f.Vector3 = new f.Vector3(startPosX + counter, 2, 0);
      let scale: f.Vector3 = new f.Vector3(1, 1, 0);
      let transform: f.ComponentTransform = new f.ComponentTransform();
      transform.mtxLocal.translate(translate);
      transform.mtxLocal.scale(scale);
      barriers[i].addComponent(transform);

      barriers[i].addComponent(new f.ComponentMaterial(barrierMaterial));
      barriers[i].addComponent(new f.ComponentMesh(barrierMesh));
      counter += -((2 * startPosX) / (barrierAmount - 1));
    }
    console.log(startPosX);
    return barriers;
  }
}
