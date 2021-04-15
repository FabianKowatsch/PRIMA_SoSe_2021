namespace SpaceInvaders {
  import f = FudgeCore;

  const frameRate: number = 60;
  const movementSpeed: number = 5;
  const enemiesPerRow: number = 9;
  const rowAmount: number = 4;
  const barrierAmount: number = 5;
  const startPosX: number = -(enemiesPerRow - 1) / 2 - 0.5;
  const startPosY: number = 9;
  const maxHeight: number = 11;

  let state: GameState = GameState.menu;
  const defaultInterval: number = 1000;
  let interval: number = defaultInterval;
  let fireTimeout: boolean = false;
  let invaderMovementX: number = 0.2;
  let invaderMovementY: number = 0;
  let intervalCount: number = 0;

  const root: f.Node = new f.Node("Root");
  const invaderNode: InvaderNode = new InvaderNode(new f.Vector2(0, 0));
  const barrierNode: f.Node = new f.Node("Barriers");
  const projectileNode: f.Node = new f.Node("Projectiles");
  root.appendChild(projectileNode);
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
    state = GameState.running;
    f.Loop.start(f.LOOP_MODE.TIME_REAL, frameRate);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    moveInvaderNode();
  }

  function update(_event: Event): void {
    if (state === GameState.running) {
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

      projectileNode.getChildren().forEach((element) => {
        let projectile: Projectile = element as Projectile;
        projectile.move();
        if (projectile.mtxLocal.translation.y >= maxHeight) {
          projectileNode.removeChild(projectile);
        }
      });
      checkProjectileCollision();
      checkForStateUpdate();
    }
    viewport.draw();
  }
  function hndKeyDown(_event: KeyboardEvent): void {
    if (_event.code === f.KEYBOARD_CODE.SPACE) fireBullet();
    else if (_event.code === f.KEYBOARD_CODE.R) reset();
  }

  function createEnemies(): void {
    let counterRow: number = 0;
    let counterColumns: number = 0;
    for (let i: number = 0; i < enemiesPerRow * rowAmount; i++) {
      let invader: Invader = new Invader(
        new f.Vector2(startPosX + counterColumns, startPosY - counterRow)
      );
      invaderNode.appendChild(invader);

      if (counterColumns === enemiesPerRow - 1) {
        counterRow++;
        counterColumns = 0;
      } else {
        counterColumns++;
      }
    }
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
      spaceShip.mtxLocal.translation.x,
      1
    );
    let bullet: Projectile = new Projectile(spaceShipPos);
    projectileNode.addChild(bullet);
    bullet.cmpAudio.play(true);
    fireTimeout = true;
    setTimeout(() => {
      fireTimeout = false;
    }, 500);
  }
  function checkProjectileCollision(): void {
    for (let projectile of projectileNode.getChildren() as Projectile[]) {
      for (let invader of invaderNode.getChildren() as Invader[]) {
        if (projectile.checkCollision(invader)) {
          projectileNode.removeChild(projectile);
          invaderNode.removeChild(invader);
        }
      }
    }
  }
  function moveInvaderNode(): void {
    if (intervalCount % 5 === 0 && intervalCount > 0) {
      invaderMovementX *= -1;
      invaderMovementY -= 0.1;
    } else {
      invaderMovementY = 0;
    }
    invaderNode.move(new f.Vector2(invaderMovementX, invaderMovementY));
    if (interval > 200) {
      interval -= 100;
    }
    intervalCount++;

    if (state === GameState.running) setTimeout(moveInvaderNode, interval);
  }

  function checkForStateUpdate(): void {
    for (let invader of invaderNode.getChildren() as Invader[]) {
      if (
        invader.mtxLocal.translation.y + invaderNode.mtxLocal.translation.y <=
        1
      ) {
        state = GameState.over;
      }
    }

    if (invaderNode.getChildren().length === 0) state = GameState.over;
  }

  function reset(): void {
    console.log("reset");
    invaderNode.removeAllChildren();
    invaderNode.mtxLocal.translateX(-invaderNode.mtxLocal.translation.x);
    invaderNode.mtxLocal.translateY(-invaderNode.mtxLocal.translation.y);
    createEnemies();
    interval = defaultInterval;
    invaderMovementX = 0.2;
    invaderMovementY = 0;
    intervalCount = 0;
    if (state === GameState.over) moveInvaderNode();
    state = GameState.running;
  }
}
