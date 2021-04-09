namespace SpaceInvaders {
  import f = FudgeCore;

  export class InvaderNode extends f.Node {
    constructor(_pos: f.Vector2) {
      super("Invaders");
      let translate: f.Vector3 = new f.Vector3(_pos.x, _pos.y, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.translate(translate);
      this.addComponent(cmpTransform);
    }

    public move(_direction: f.Vector2): void {
      this.mtxLocal.translateX(_direction.x);
      this.mtxLocal.translateY(_direction.y);
      for (let invader of this.getChildren() as Invader[]) {
        invader.updateRectPosition();
      }
    }
  }
}
