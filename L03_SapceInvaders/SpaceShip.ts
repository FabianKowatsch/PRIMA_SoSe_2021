namespace SpaceInvaders {
  import f = FudgeCore;
  export class SpaceShip extends f.Node {
    static mesh: f.MeshPolygon = new f.MeshPolygon(
      "ShipPolygon",
      [
        new f.Vector2(0.1, 0),
        new f.Vector2(0.5, 0),
        new f.Vector2(0.5, 0.3),
        new f.Vector2(0, 0.3),
        new f.Vector2(0.1, 0.5),
        new f.Vector2(-0.1, 0.5),
        new f.Vector2(-0.1, 0.3),
        new f.Vector2(-0.5, 0.3),
        new f.Vector2(-0.5, 0)
      ],
      true
    );
    static material: f.Material = new f.Material(
      "ShipMaterial",
      f.ShaderUniColor,
      new f.CoatColored(new f.Color(0.3, 1, 0, 1))
    );

    constructor() {
      super("SpaceShip");
      let scale: f.Vector3 = new f.Vector3(1, 1, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(scale);
      this.addComponent(cmpTransform);
      this.addComponent(new f.ComponentMaterial(SpaceShip.material));
      this.addComponent(new f.ComponentMesh(SpaceShip.mesh));
    }
  }
}
