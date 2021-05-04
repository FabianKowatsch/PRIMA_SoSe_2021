namespace L05_TestScene {
  import f = FudgeCore;

  const graphId: string = "Graph|2021-04-27T14:37:53.620Z|93013";
  let app: HTMLCanvasElement;
  let viewport: f.Viewport;
  let cmpCamera: f.ComponentCamera;
  let avatar: f.Node = new f.Node("Avatar");
  let root: f.Graph = new f.Graph("root");
  let camBufferX: number = 0;
  let camBufferY: number = 0;
  const camSpeed: number = 0.2;
  const movementSpeed: number = 10;
  let isLocked: boolean = false;
  let forwardMovement: number = 0;
  let sideMovement: number = 0;

  window.addEventListener("load", init);

  async function init(_event: Event): Promise<void> {
    await f.Project.loadResourcesFromHTML();
    let resource: f.SerializableResource = f.Project.resources[graphId];
    root = <f.Graph>resource;

    app = document.querySelector("canvas");

    cmpCamera = new f.ComponentCamera();
    cmpCamera.clrBackground = f.Color.CSS("GREY");
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 1, 0));
    cmpCamera.mtxPivot.rotate(new f.Vector3(0, 90, 0));
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
    let cmpAvatar: f.ComponentRigidbody = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
    let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
    avatar.addComponent(cmpAvatar);
    avatar.addComponent(cmpCamera);
    avatar.addComponent(cmpTransform);
    cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
    cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
    cmpAvatar.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
    //cmpAvatar.mtxPivot.scale(new f.Vector3(1, 0.85, 1));
    cmpAvatar.friction = 0.01;
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
    }
  }

  function updateCamera(_x: number, _y: number): void {
    //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
    cmpCamera.mtxPivot.rotateY(-_x * camSpeed, true);
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
    let playerForward: f.Vector3 = new f.Vector3();
    playerForward = cmpCamera.mtxWorldToView.rotation;

    playerForward.normalize();
    playerForward.transform(avatar.mtxWorld, false);
    let playerBody: f.ComponentRigidbody = avatar.getComponent(f.ComponentRigidbody);
    //You can rotate a body like you would rotate a transform, incremental but keep in mind, normally we use forces in physics,
    //this is just a feature to make it easier to create player characters
    //playerBody.rotateBody(new f.Vector3(0, yTurn * turningspeed * _deltaTime, 0));

    let movementVelocity: f.Vector3 = new f.Vector3();
    movementVelocity.z = playerForward.x * forwardMovement * movementSpeed;
    movementVelocity.y = playerBody.getVelocity().y;
    movementVelocity.x = playerForward.z * sideMovement * movementSpeed;
    playerBody.setVelocity(movementVelocity);
  }
}
