namespace SpaceInvaders {
  import f = FudgeCore;
  export class Invader extends QuadNode {
    constructor(_pos: f.Vector2) {
      let _scale: f.Vector2 = new f.Vector2(0.5, 0.5);
      super("Invader" + _pos.x + "/" + _pos.y, _pos, _scale, "invader");
      this.setRectPosition();
    }
    public updateRectPosition(): void {
      if (this.getParent() == null) return;
      this.rect.position.x =
        this.mtxLocal.translation.x +
        this.getParent().mtxLocal.translation.x -
        this.rect.size.x / 2;
      this.rect.position.y =
        this.mtxLocal.translation.y +
        this.getParent().mtxLocal.translation.y -
        this.rect.size.y / 2;
    }
  }
}
