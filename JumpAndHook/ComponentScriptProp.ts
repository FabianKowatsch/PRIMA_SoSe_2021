namespace JumpandHook {
  import f = FudgeCore;
  export class ComponentScriptProp extends f.ComponentScript {
    public name: string = "CmpScriptProp";

    constructor() {
      super();
      this.addEventListener(f.EVENT.COMPONENT_ADD, this.hndComponentAdd.bind(this));
    }

    protected hndComponentAdd(_event: f.Eventƒ): void {
      this.getContainer().getComponent(f.ComponentRigidbody).addEventListener(f.EVENT_PHYSICS.COLLISION_ENTER, this.onCollision.bind(this));
    }

    private onCollision(_event: f.EventPhysics): void {
      let parent: f.Node = this.getContainer();
      if (_event.cmpRigidbody != parent.getAncestor().getChildrenByName("Avatar")[0].getComponent(f.ComponentRigidbody)) parent.getComponent(f.ComponentAudio).play(true);
    }
  }
}
