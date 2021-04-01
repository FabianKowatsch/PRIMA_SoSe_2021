namespace SpaceInvaders {
  import f = FudgeCore;
  export class SpaceShip extends f.Node {
    constructor() {
      super("SpaceShip");

      let scale: f.Vector3 = new f.Vector3(1, 1, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(scale);

      this.addComponent(cmpTransform);
      this.addComponent(new f.ComponentMaterial(greenMaterial));
      this.addComponent(new f.ComponentMesh(spaceShipMesh));
    }
  }
}
