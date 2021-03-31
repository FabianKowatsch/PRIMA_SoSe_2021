namespace SpaceInvaders {
  import f = FudgeCore;
  export class Barrier extends f.Node {
    constructor(_x: number, _y: number) {
      super("Barrier" + _x + "/" + _y);
      let translate: f.Vector3 = new f.Vector3(_x, _y, 0);
      let scale: f.Vector3 = new f.Vector3(1, 1, 0);
      let transform: f.ComponentTransform = new f.ComponentTransform();
      transform.mtxLocal.translate(translate);
      transform.mtxLocal.scale(scale);
      this.addComponent(transform);

      for (let i: number = 0; i < 10; i++) {
        for (let j: number = 0; j < 10; j++) {
          if (
            !(
              (j < 2 && i > 1 && i < 8) ||
              (j < 3 && i > 2 && i < 7) ||
              (j < 4 && i > 3 && i < 6) ||
              (j > 7 && (i < 1 || i > 8)) ||
              (j > 8 && (i < 2 || i > 7))
            )
          ) {
            let x: number = -0.45 + i / 10;
            let y: number = -0.45 + j / 10;
            let subPart: BarrierSubPart = new BarrierSubPart(x, y);
            this.addChild(subPart);
          }
        }
      }
    }
  }
}
