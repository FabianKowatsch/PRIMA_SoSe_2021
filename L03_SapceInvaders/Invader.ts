namespace SpaceInvaders {
  import f = FudgeCore;
  export class Invader extends QuadNode {
    constructor(_pos: f.Vector2) {
      let _scale: f.Vector2 = new f.Vector2(0.5, 0.5);
      super("Invader" + _pos.x + "/" + _pos.y, _pos, _scale, "invader");
      this.setRectPosition();
    }
  }
}
