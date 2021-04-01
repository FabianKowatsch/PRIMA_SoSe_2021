namespace SpaceInvaders {
  import f = FudgeCore;
  export class Mothership extends QuadNode {
    constructor(_pos: f.Vector2) {
      let _scale: f.Vector2 = new f.Vector2(1, 0.5);
      super("Invader" + _pos.x + "/" + _pos.y, _pos, _scale);
    }
  }
}
