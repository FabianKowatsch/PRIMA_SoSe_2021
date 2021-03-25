namespace L01_FirstFudge {
  import f = FudgeCore;

  const frameRate: number = 60;
  const rotSpeed: number = 90;

  let node: f.Node = new f.Node("test");
  let viewport: f.Viewport = new f.Viewport();

  window.addEventListener("load", hndlLoad);

  function hndlLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("#viewport");
    let mesh: f.MeshCube = new f.MeshCube("Cube");
    let material: f.Material = new f.Material(
      "Mat",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(0.6, 1, 0, 1))
    );
    node.addComponent(new f.ComponentTransform());
    node.addComponent(new f.ComponentMesh(mesh));
    node.addComponent(new f.ComponentMaterial(material));

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(3);
    cmpCamera.mtxPivot.rotateY(180);
    console.log(cmpCamera);
    viewport.initialize("Viewport", node, cmpCamera, canvas);
    viewport.draw();

    f.Loop.start(f.LOOP_MODE.TIME_REAL, frameRate);
    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
  }
  function update(_event: Event): void {
    node
      .getComponent(f.ComponentTransform)
      .mtxLocal.rotateY((rotSpeed * f.Loop.timeFrameReal) / 1000);
    viewport.draw();
  }
}
