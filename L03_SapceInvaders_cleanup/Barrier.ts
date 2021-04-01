namespace SpaceInvaders {
  import f = FudgeCore;
  export class Barrier extends f.Node {
    constructor(_x: number, _y: number) {
      super("Barrier" + _x + "/" + _y);
      let translate: f.Vector3 = new f.Vector3(_x, _y, 0);
      let scale: f.Vector3 = new f.Vector3(1, 1, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.translate(translate);
      cmpTransform.mtxLocal.scale(scale);
      this.addComponent(cmpTransform);

      for (let i: number = 0; i < 5; i++) {
        for (let j: number = 0; j < 9; j++) {
          if ((i > 2 || i + j > 4) && i + j < 11) {
            let x1: number = -0.05 - i / 10;
            let y: number = -0.45 + j / 10;
            let subPart1: BarrierSubPart = new BarrierSubPart(x1, y);
            this.addChild(subPart1);
            let x2: number = 0.05 + i / 10;
            let subPart2: BarrierSubPart = new BarrierSubPart(x2, y);
            this.addChild(subPart2);
          }
        }
      }
    }
  }
}
