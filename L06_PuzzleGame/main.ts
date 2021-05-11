namespace L06_PuzzleGame {
  import f = FudgeCore;

  const graphId: string = "Graph|2021-04-27T14:37:53.620Z|93013";
  let app: HTMLCanvasElement;
  let viewport: f.Viewport;
  let cmpCamera: f.ComponentCamera;
  let avatar: Avatar;
  let root: f.Graph = new f.Graph("root");
  let props: f.Node;
  const propAmount: number = 12;
  let camBufferX: number = 0;
  let camBufferY: number = 0;
  const camSpeed: number = -0.15;
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
    createProps();
    createRigidbodies();
    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, app);
    f.Physics.adjustTransforms(root, true);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(); //Stard the game loop
    //console.log(root);
    // Attach events to the document
    document.addEventListener("keydown", hndKeyDown);
    document.addEventListener("keyup", hndKeyRelease);
    document.addEventListener("mousemove", hndMouseMovement);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("pointerlockchange", pointerLockChange);
  }

  function update(): void {
    f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
    checkKeyboardInputs();
    updateCamera(camBufferX, camBufferY);
    avatar.move(forwardMovement, sideMovement);
    avatar.tryGrabLastNode();
    viewport.draw();
  }
  function initPhysics(): void {
    f.Physics.initializePhysics();
    f.Physics.world.setSolverIterations(1000);
    f.Physics.settings.defaultRestitution = 0.3;
    f.Physics.settings.defaultFriction = 0.8;
    f.Physics.settings.debugDraw = false;
  }
  function createAvatar(): void {
    cmpCamera = new f.ComponentCamera();
    avatar = new Avatar(cmpCamera);
    root.appendChild(avatar);
  }

  function createRigidbodies(): void {
    let level: f.Node = root.getChildrenByName("level")[0];
    let cmpRigid: f.ComponentRigidbody;
    for (let node of level.getChildren()) {
      switch (node.getComponent(f.ComponentMesh).mesh.name) {
        case "meshCube":
          cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
          break;
        case "meshExtrusion":
          cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
          break;
        default:
          cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
          break;
      }
      node.addComponent(cmpRigid);
    }
    let ball: f.Node = root.getChildrenByName("ball")[0];
    cmpRigid = new f.ComponentRigidbody(7, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.SPHERE, f.PHYSICS_GROUP.DEFAULT);
    ball.addComponent(cmpRigid);
  }

  function createProps(): void {
    props = new f.Node("Props");
    for (let i: number = 0; i < propAmount; i++) {
      let random: number = Math.random();
      let randomPos: number = random + i;
      let randomScale: number = 1 + random;
      if (random >= 0.5) {
        let prop: CubeProp = new CubeProp(`prop-${i}`, new f.Vector3(randomPos, randomPos, randomPos), new f.Vector3(randomScale, randomScale, randomScale));
        props.addChild(prop);
      } else {
        let prop: SphereProp = new SphereProp(`prop-${i}`, new f.Vector3(randomPos, randomPos, randomPos), new f.Vector3(randomScale, randomScale, randomScale));
        props.addChild(prop);
      }
    }
    root.addChild(props);
  }

  function hndMouseMovement(_event: MouseEvent): void {
    if (isLocked) {
      camBufferX += _event.movementX;
      camBufferY += _event.movementY;
      // let playerForward: f.Vector3 = avatar.camNode.mtxLocal.getZ();
      // console.log(playerForward);
    }
  }

  function updateCamera(_x: number, _y: number): void {
    //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
    avatar.camNode.mtxLocal.rotateY(_x * camSpeed, true);

    avatar.camNode.mtxLocal.rotateZ(_y * camSpeed);

    camBufferX = 0;
    camBufferY = 0;
  }

  function checkKeyboardInputs(): void {
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
      avatar.jump();
    }
    if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.Y])) {
      f.Physics.settings.debugDraw = !f.Physics.settings.debugDraw;
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
    if (_event.code == f.KEYBOARD_CODE.SHIFT_LEFT) {
      avatar.sprint();
    }
    if (_event.code == f.KEYBOARD_CODE.E) {
      avatar.switchCloseNode();
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
    if (_event.code == f.KEYBOARD_CODE.SHIFT_LEFT) {
      avatar.walk();
    }
  }

  function onPointerDown(_event: MouseEvent): void {
    if (!isLocked) {
      app.requestPointerLock();
    } else {
      switch (_event.button) {
        case 1:
          avatar.shootPush();
          break;
        case 2:
          avatar.shootPull();
          break;
        default:
          avatar.shootPush();
          break;
      }
    }
  }

  function pointerLockChange(_event: Event): void {
    if (!document.pointerLockElement) {
      isLocked = false;
    } else {
      isLocked = true;
    }
  }
}
