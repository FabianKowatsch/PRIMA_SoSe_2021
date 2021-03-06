namespace SpaceInvaders {
  import f = FudgeCore;
  export class BarrierSubPart extends QuadNode {
    constructor(_pos: f.Vector2) {
      let scale: f.Vector2 = new f.Vector2(0.1, 0.1);
      super("BarrierSubPart" + _pos.x + "/" + _pos.y, _pos, scale);
      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(
        0.3,
        1,
        0,
        1
      );
    }
  }
}
