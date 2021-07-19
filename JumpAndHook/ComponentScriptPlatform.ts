namespace JumpandHook {
  import f = FudgeCore;
  export class ComponentScriptPlatform extends f.ComponentScript {
    private static material: f.Material = new f.Material("MaterialPlatform", f.ShaderFlat, new f.CoatColored(f.Color.CSS("white")));
    private static translationFactor: number = 10;
    public name: string = "CmpScriptPlatform";
    public index: number;
    private node: f.Node;
    private mesh: f.Mesh;
    private prototypes: string[] = ["", "", "", "", ""];
    private triggerNode: f.Node;
    constructor(_index: number) {
      super();
      this.index = _index;
      this.mesh = <f.Mesh>f.Project.resources[this.prototypes[Math.round(Math.random() * 4)]];
      this.addEventListener(f.EVENT.COMPONENT_ADD, this.hndAdd);
    }
    private hndAdd = (_event: f.Eventƒ) => {
      this.node = this.getContainer();
      this.node.addComponent(new f.ComponentMesh(this.mesh));
      this.node.addComponent(new f.ComponentMaterial(ComponentScriptPlatform.material));
      let transform: f.Matrix4x4 = new f.Matrix4x4();
      transform.translate(new f.Vector3(ComponentScriptPlatform.translationFactor * this.index, 0, (Math.random() - 0.5) * 2));
      this.node.addComponent(new f.ComponentTransform());
      this.node.addComponent(new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT));
      this.addTraps();
      this.addTrigger();
      f.Physics.adjustTransforms(this.node.getAncestor(), true);
    };

    private addTrigger(): void {
      this.triggerNode = new f.Node("PlatformTrigger" + this.index.toString());
      let cmpRigid: f.ComponentRigidbody = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.TRIGGER);
      this.triggerNode.addComponent(cmpRigid);
      this.triggerNode.addComponent(new f.ComponentTransform());
      this.triggerNode.mtxLocal.scale(new f.Vector3(2, 2, 2));
      this.triggerNode.mtxLocal.translate(new f.Vector3(this.node.getComponent(f.ComponentMesh).mesh.radius - 1, 0, 0));
      this.node.appendChild(this.triggerNode);
      cmpRigid.addEventListener(f.EVENT_PHYSICS.TRIGGER_ENTER, this.spawnNextPlatform);
    }

    private addTraps(): void {
      let trapArray: f.Node[] = new Array<f.Node>();

      for (let index: number = 0; index < Math.round(Math.random() * 3); index++) {
        trapArray.push(new f.Node("Trap" + index));
      }

      trapArray.forEach((trap) => {
        trap.addComponent(new ComponentScriptTrap());
      });
    }

    private spawnNextPlatform = (_event: f.EventPhysics) => {
      let nextPlatform: f.Node = new f.Node("Platform" + (this.index + 1));
      nextPlatform.addComponent(new ComponentScriptPlatform(this.index + 1));
      this.node.getParent().addChild(nextPlatform);
    };
  }
}
