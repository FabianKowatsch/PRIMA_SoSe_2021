namespace SpaceInvaders {
  import f = FudgeCore;
  export class Invader extends f.Node {
    constructor(_x: number, _y: number) {
      super("Invader" + _x + "/" + _y);
      let translate: f.Vector3 = new f.Vector3(_x, _y, 0);
      let scale: f.Vector3 = new f.Vector3(0.5, 0.5, 0);
      let transform: f.ComponentTransform = new f.ComponentTransform();
      transform.mtxLocal.translate(translate);
      transform.mtxLocal.scale(scale);
      this.addComponent(transform);
      this.addComponent(new f.ComponentMaterial(whiteMaterial));
      this.addComponent(new f.ComponentMesh(enemyMesh));
    }
  }
}
