namespace L06_PuzzleGame {
  import f = FudgeCore;

  const graphId: string = "Graph|2021-04-27T14:37:53.620Z|93013";
  let app: HTMLCanvasElement;
  let viewport: f.Viewport;
  let cmpCamera: f.ComponentCamera;
  let avatar: Avatar;
  let root: f.Graph = new f.Graph("root");
  let camBufferX: number = 0;
  let camBufferY: number = 0;
  const camSpeed: number = 0.2;
  const movementSpeed: number = 5;
  let isLocked: boolean = false;
  let forwardMovement: number = 0;
  let sideMovement: number = 0;

  window.addEventListener("load", init);

  async function init(_event: Event): Promise<void> {
    await f.Project.loadResourcesFromHTML();
    let resource: f.SerializableResource = f.Project.resources[graphId];
    root = <f.Graph>resource;

    app = document.querySelector("canvas");
    //cmpCamera.mtxPivot.lookAt(new f.Vector3(0, 0, 110));
    initPhysics();
    createAvatar();
    createRigidbodies();
    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, app);
    f.Physics.adjustTransforms(root, false);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(); //Stard the game loop
    console.log(root);
    // Attach events to the document
    document.addEventListener("keydown", hndKeyDown);
    document.addEventListener("keyup", hndKeyRelease);
    app.addEventListener("mousemove", hndMouseMovement);
    app.addEventListener("mousedown", onPointerDown);
    document.addEventListener("pointerlockchange", pointerLockChange);
  }

  function update(): void {
    f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
    checkKeyboardInputs();
    updateCamera(camBufferX, camBufferY);
    player_Movement(f.Loop.timeFrameReal / 1000);
    viewport.draw();
  }
  function initPhysics(): void {
    f.Physics.initializePhysics();
    f.Physics.world.setSolverIterations(1000);
    f.Physics.settings.defaultRestitution = 0.3;
    f.Physics.settings.defaultFriction = 0.8;
    f.Physics.settings.debugDraw = true;
  }
  function createAvatar(): void {
    cmpCamera = new f.ComponentCamera();
    avatar = new Avatar(cmpCamera);
    root.appendChild(avatar);
  }

  function createRigidbodies(): void {
    let level: f.Node = root.getChildrenByName("level")[0];
    for (let node of level.getChildren()) {
      let cmpRigid: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
      node.addComponent(cmpRigid);
    }
  }

  function hndMouseMovement(_event: MouseEvent): void {
    if (isLocked) {
      camBufferX += _event.movementX;
      camBufferY += _event.movementY;
      let playerForward: f.Vector3 = avatar.camNode.mtxLocal.getZ();
      console.log(playerForward);
    }
  }

  function updateCamera(_x: number, _y: number): void {
    //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
    avatar.camNode.mtxLocal.rotateY(-_x * camSpeed, true);
    cmpCamera.mtxPivot.rotateX(_y * camSpeed);
    camBufferX = 0;
    camBufferY = 0;
  }

  function checkKeyboardInputs(): void {
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
      // avatar.mtxLocal.translateX((movementSpeed * f.Loop.timeFrameReal) / 1000);
    }
  }

  function hndKeyDown(_event: KeyboardEvent): void {
    if (_event.code == f.KEYBOARD_CODE.W) {
      forwardMovement = 1;
    }
    if (_event.code == f.KEYBOARD_CODE.A) {
      sideMovement = -1;
    }
    if (_event.code == f.KEYBOARD_CODE.S) {
      forwardMovement = -1;
    }
    if (_event.code == f.KEYBOARD_CODE.D) {
      sideMovement = 1;
    }
  }

  function hndKeyRelease(_event: KeyboardEvent): void {
    if (_event.code == f.KEYBOARD_CODE.W) {
      forwardMovement = 0;
    }
    if (_event.code == f.KEYBOARD_CODE.A) {
      sideMovement = 0;
    }
    if (_event.code == f.KEYBOARD_CODE.S) {
      forwardMovement = 0;
    }
    if (_event.code == f.KEYBOARD_CODE.D) {
      sideMovement = 0;
    }
  }

  function onPointerDown(_event: MouseEvent): void {
    if (!isLocked) {
      app.requestPointerLock();
      console.log("locked");
    }
  }

  function pointerLockChange(_event: Event): void {
    if (!document.pointerLockElement) {
      isLocked = false;
    } else {
      isLocked = true;
    }
  }

  function player_Movement(_deltaTime: number): void {
    let playerForward: f.Vector3 = avatar.camNode.mtxLocal.getX();
    let playerSideward: f.Vector3 = avatar.camNode.mtxLocal.getZ();
    playerSideward.normalize();
    playerForward.normalize();
    let playerBody: f.ComponentRigidbody = avatar.cmpRigid;
    let movementVel: f.Vector3 = new f.Vector3();
    movementVel.z = (playerForward.z * forwardMovement + playerSideward.z * sideMovement) * movementSpeed;
    movementVel.y = playerBody.getVelocity().y;
    movementVel.x = (playerForward.x * forwardMovement + playerSideward.x * sideMovement) * movementSpeed;
    playerBody.setVelocity(movementVel);
  }
}
