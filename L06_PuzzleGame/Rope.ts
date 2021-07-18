namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class Rope extends f.Node {
    private static material: f.Material = new f.Material("MaterialRope", f.ShaderFlat, new f.CoatColored(f.Color.CSS("brown")));
    private static mesh: f.Mesh = new f.MeshCube("Cube");
    public cmpRigid: f.ComponentRigidbody;
    //private weight: number = 10;
    constructor(_position: f.Vector3, _direction: f.Vector3, _scale: f.Vector3) {
      super("rope");
      //Transform
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      //cmpTransform.mtxLocal.translate(_position);
      // let directionXZ: f.Vector2 = new f.Vector2(_direction.x, _direction.z);
      // directionXZ.normalize();
      // let rotationXZ: f.Vector2 = f.Vector2.X(1);
      // let dotXZ: number = f.Vector2.DOT(rotationXZ, directionXZ);
      // let angleXZ: number = (Math.acos(dotXZ) * 180) / -Math.PI;

      // let directionYZ: f.Vector2 = new f.Vector2(_direction.x, _direction.y);
      // directionYZ.normalize();
      // let rotationYZ: f.Vector2 = f.Vector2.Y(-1);
      // let dotYZ: number = f.Vector2.DOT(rotationYZ, directionYZ);
      // let angleYZ: number = (Math.acos(dotYZ) * 180) / Math.PI;

      cmpTransform.mtxLocal.scale(_scale);
      this.addComponent(cmpTransform);

      //Mesh
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(Rope.mesh);
      this.addComponent(cmpMesh);
      //Material
      let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(Rope.material);
      this.addComponent(cmpMaterial);
      //Rigidbody
      // this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
      // this.addComponent(this.cmpRigid);
      // this.cmpRigid.rotationInfluenceFactor = new f.Vector3(0.5, 0.5, 0.5);
      // this.cmpRigid.friction = 0.8;
      // this.cmpRigid.mtxPivot.translation = _position;
      // //this.cmpRigid.mtxPivot.rotation = new f.Vector3(0, angleXZ, angleYZ);
      // this.cmpRigid.mtxPivot.lookAt(_direction);
    }
  }
}
