namespace SpaceInvaders {
  import f = FudgeCore;
  export class BarrierSubPart extends f.Node {
    constructor(_x: number, _y: number) {
      super("Barrier" + _x + "/" + _y);
      let translate: f.Vector3 = new f.Vector3(_x, _y, 0);
      let scale: f.Vector3 = new f.Vector3(0.1, 0.1, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.translate(translate);
      cmpTransform.mtxLocal.scale(scale);
      this.addComponent(cmpTransform);
      this.addComponent(new f.ComponentMaterial(greenMaterial));
      this.addComponent(new f.ComponentMesh(barrierMesh));
    }
  }
}
