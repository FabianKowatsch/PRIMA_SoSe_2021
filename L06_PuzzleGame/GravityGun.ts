namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class GravityGun extends f.Node {
    private static mesh: f.Mesh = new f.MeshCube("Gun");
    private static material: f.Material = new f.Material("MaterialGun", f.ShaderFlat, new f.CoatColored(f.Color.CSS("grey")));
    public cmpRigid: f.ComponentRigidbody;
    private grip: f.Node;
    constructor() {
      super("GravityGun");
      //Transform
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(new f.Vector3(0.3, 0.05, 0.05));
      cmpTransform.mtxLocal.translate(new f.Vector3(1.4, -2.5, 4));
      cmpTransform.mtxLocal.rotate(new f.Vector3(0, 0, 0));
      this.addComponent(cmpTransform);
      //Mesh
      let barrel: f.ComponentMesh = new f.ComponentMesh(GravityGun.mesh);
      this.addComponent(barrel);
      //Material
      let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(GravityGun.material);
      this.addComponent(cmpMaterial);
      //Grip
      this.grip = new f.Node("grip");
      let gripMesh: f.ComponentMesh = new f.ComponentMesh(GravityGun.mesh);
      this.grip.addComponent(gripMesh);
      let gripMat: f.ComponentMaterial = new f.ComponentMaterial(GravityGun.material);
      this.grip.addComponent(gripMat);
      let gripTr: f.ComponentTransform = new f.ComponentTransform();
      gripTr.mtxLocal.scale(new f.Vector3(0.2, 2.2, 0.8));
      gripTr.mtxLocal.translate(new f.Vector3(-1.8, -0.5, 0));
      gripTr.mtxLocal.rotate(new f.Vector3(0, 0, 0));
      this.grip.addComponent(gripTr);
      this.addChild(this.grip);
    }
  }
}
