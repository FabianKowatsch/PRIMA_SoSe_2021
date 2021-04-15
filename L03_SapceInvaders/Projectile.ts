namespace SpaceInvaders {
  import f = FudgeCore;

  export class Projectile extends QuadNode {
    private velocity: number;
    public cmpAudio: f.ComponentAudio;
    constructor(_pos: f.Vector2) {
      let scale: f.Vector2 = new f.Vector2(0.1, 0.5);
      super("Projectile", _pos, scale);
      this.getComponent(f.ComponentMaterial).clrPrimary = new f.Color(
        1,
        1,
        0,
        1
      );
      this.velocity = 15;
      this.cmpAudio = new f.ComponentAudio(new f.Audio("./Assets/shoot.wav"));
      this.addComponent(this.cmpAudio);
    }
    public move(): void {
      this.mtxLocal.translateY((this.velocity * f.Loop.timeFrameReal) / 1000);
      this.setRectPosition();
    }
  }
}
