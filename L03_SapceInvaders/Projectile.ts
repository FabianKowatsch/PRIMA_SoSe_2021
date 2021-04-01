namespace SpaceInvaders {
  import f = FudgeCore;
  export class Projectile extends QuadNode {
    constructor(_pos: f.Vector2) {
      let scale: f.Vector2 = new f.Vector2(0.1, 0.5);
      super("Projectile", _pos, scale);
      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(
        1,
        1,
        0,
        1
      );
    }
  }
}
