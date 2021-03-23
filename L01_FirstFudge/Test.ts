namespace L01_FirstFudge {
  import f = FudgeCore;

  window.addEventListener("load", hndlLoad);

  function hndlLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("#viewport");
    let node: f.Node = new f.Node("test");
    let mesh: f.MeshQuad = new f.MeshQuad("Quad");
    let material: f.Material = new f.Material(
      "Mat",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(1, 1, 1, 1))
    );
    node.addComponent(new f.ComponentMesh(mesh));
    node.addComponent(new f.ComponentMaterial(material));

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(3);
    cmpCamera.mtxPivot.rotateY(170);
    let viewport: f.Viewport = new f.Viewport();
    console.log(cmpCamera);
    viewport.initialize("Viewport", node, cmpCamera, canvas);
    viewport.draw();
  }
}
