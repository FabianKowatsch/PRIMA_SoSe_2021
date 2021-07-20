namespace JumpandHook {
  import f = FudgeCore;
  export class ComponentScriptTrap extends ComponentScriptProp {
    public name: string = "CmpScriptProp";

    constructor() {
      super();
    }

    protected hndComponentAdd(_event: f.Eventƒ): void {
      super.hndComponentAdd(new Event(f.EVENT.COMPONENT_ADD));
    }
  }
}
