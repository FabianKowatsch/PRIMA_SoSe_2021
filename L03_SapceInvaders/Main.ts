namespace SpaceInvaders {
  import f = FudgeCore;

  const frameRate: number = 60;
  const movementSpeed: number = 5;
  const enemiesPerRow: number = 9;
  const rowAmount: number = 4;
  const barrierAmount: number = 5;
  const startPosX: number = -(enemiesPerRow - 1) / 2;
  const startPosY: number = 9;
  const maxHeight: number = 12;
  let fireTimeout: boolean = false;
  const playerProjectileSpeed: number = 10;

  const root: f.Node = new f.Node("Root");
  const invaderNode: f.Node = new f.Node("Invaders");
  const barrierNode: f.Node = new f.Node("Barriers");
  createEnemies();
  createMothership();
  createSpaceShip();
  createBarriers();
  const spaceShip: f.Node = root.getChildrenByName("SpaceShip")[0];
  let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
  cmpCamera.mtxPivot.translate(new f.Vector3(0, 5, 15));
  cmpCamera.mtxPivot.rotateY(180);

  let viewport: f.Viewport = new f.Viewport();
  window.addEventListener("load", init);
  window.addEventListener("keydown", hndKeyDown);

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("#viewport");
    console.log(root);
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();
    f.Loop.start(f.LOOP_MODE.TIME_REAL, frameRate);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    viewport.draw();
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A])) {
      spaceShip.mtxLocal.translateX(
        -(movementSpeed * f.Loop.timeFrameReal) / 1000
      );
    }
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D])) {
      spaceShip.mtxLocal.translateX(
        (movementSpeed * f.Loop.timeFrameReal) / 1000
      );
    }

    root.getChildrenByName("Projectile").forEach((projectile) => {
      projectile.mtxLocal.translateY(
        (playerProjectileSpeed * f.Loop.timeFrameReal) / 1000
      );
      if (projectile.mtxLocal.get()[13] >= maxHeight) {
        projectile.activate(false);
      }
    });
  }
  function hndKeyDown(_event: KeyboardEvent): void {
    if (_event.code === "Space") fireBullet();
  }

  function createEnemies(): void {
    let counterRow: number = 0;
    let counterEnemies: number = 0;
    for (let i: number = 0; i < enemiesPerRow * rowAmount; i++) {
      let invader: Invader = new Invader(
        new f.Vector2(counterEnemies, -counterRow)
      );
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

  function createMothership(): void {
    let spaceShip: Mothership = new Mothership(new f.Vector2(0, startPosY + 1));
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
  function fireBullet(): void {
    if (fireTimeout === true) return;
    let spaceShipPos: f.Vector2 = new f.Vector2(
      spaceShip.mtxLocal.get()[12],
      1
    );
    let bullet: Projectile = new Projectile(spaceShipPos);
    root.addChild(bullet);
    fireTimeout = true;
    setTimeout(() => {
      fireTimeout = false;
    }, 1000);
  }
}
