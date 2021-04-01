namespace SpaceInvaders {
  import f = FudgeCore;

  export class QuadNode extends f.Node {
    static mesh: f.Mesh = new f.MeshQuad("Quad");
    static material: f.Material = new f.Material(
      "Material",
      f.ShaderUniColor,
      new f.CoatColored()
    );
    constructor(_name: string, _pos: f.Vector2, _scale: f.Vector2) {
      super(_name);
      let translate: f.Vector3 = new f.Vector3(_pos.x, _pos.y, 0);
      let scale: f.Vector3 = new f.Vector3(_scale.x, _scale.y, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.translate(translate);
      cmpTransform.mtxLocal.scale(scale);
      this.addComponent(cmpTransform);
      this.addComponent(new f.ComponentMaterial(QuadNode.material));
      this.addComponent(new f.ComponentMesh(QuadNode.mesh));
    }
  }
}
