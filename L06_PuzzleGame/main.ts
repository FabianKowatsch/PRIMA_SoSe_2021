namespace L05_TestScene {
  import f = FudgeCore;
  let graphId: string = "Graph|2021-04-27T14:37:53.620Z|93013";
  let viewport: f.Viewport;
  let cmpCamera: f.ComponentCamera;
  let player: f.Node = new f.Node("Avatar");
  let root: f.Graph = new f.Graph("root");
  let camBufferX: number = 0;
  let camBufferY: number = 0;
  const camSpeed: number = 0.2;

  window.addEventListener("load", init);

  async function init(_event: Event): Promise<void> {
    await f.Project.loadResourcesFromHTML();
    let resource: f.SerializableResource = f.Project.resources[graphId];
    root = <f.Graph>resource;

    const app: HTMLCanvasElement = document.querySelector("canvas");

    cmpCamera = new f.ComponentCamera();
    cmpCamera.clrBackground = f.Color.CSS("GREY");
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 1, 0));
    //cmpCamera.mtxPivot.lookAt(new f.Vector3(0, 0, 110));
    initPhysics();
    createAvatar();
    createRigidbodies();
    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, app);
    f.Physics.start(root);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
    f.Loop.start(); //Stard the game loop
    console.log(root);
    app.addEventListener("mousemove", hndMouseMovement);
  }

  function update(): void {
    f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);

    updateCamera(camBufferX, camBufferY);
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
    player.addComponent(cmpAvatar);
    player.addComponent(cmpCamera);
    player.addComponent(cmpTransform);
    cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
    cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
    cmpAvatar.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
    //cmpAvatar.mtxPivot.scale(new f.Vector3(1, 0.85, 1));
    cmpAvatar.friction = 0.01;
    root.appendChild(player);
  }

  function createRigidbodies(): void {
    let level: f.Node = root.getChildrenByName("level")[0];
    for (let node of level.getChildren()) {
      let cmpRigid: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
      node.addComponent(cmpRigid);
    }
  }

  function hndMouseMovement(_event: MouseEvent): void {
    camBufferX += _event.movementX;
    camBufferY += _event.movementY;
  }

  function updateCamera(_x: number, _y: number): void {
    cmpCamera.mtxPivot.rotateY(-_x * camSpeed, true);
    cmpCamera.mtxPivot.rotateX(_y * camSpeed);

    camBufferX = 0;
    camBufferY = 0;
  }
}
