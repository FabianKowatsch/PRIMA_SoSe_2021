namespace SpaceInvaders {
  import f = FudgeCore;
  export class SpaceShip extends f.Node {
    constructor() {
      super("SpaceShip");

      let scale: f.Vector3 = new f.Vector3(1, 0.5, 0);
      let transform: f.ComponentTransform = new f.ComponentTransform();
      transform.mtxLocal.scale(scale);

      this.addComponent(transform);
      this.addComponent(new f.ComponentMaterial(greenMaterial));
      this.addComponent(new f.ComponentMesh(spaceShipMesh));
    }
  }
}
