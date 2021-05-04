namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class Avatar extends f.Node {
    public cmpCamera: f.ComponentCamera;
    public cmpRigid: f.ComponentRigidbody;
    public camNode: f.Node = new f.Node("Cam");

    constructor(_cmpCamera: f.ComponentCamera) {
      super("Avatar");
      this.cmpRigid = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      this.addComponent(this.cmpRigid);
      this.addComponent(cmpTransform);
      cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
      cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
      this.cmpRigid.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
      this.cmpRigid.friction = 0.01;
      this.addChild(this.camNode);
      //Camera
      this.cmpCamera = _cmpCamera;
      this.cmpCamera.mtxPivot.rotate(new f.Vector3(0, 90, 0));
      let cmpCamTransform: f.ComponentTransform = new f.ComponentTransform();
      this.camNode.addComponent(cmpCamTransform);
      this.camNode.addComponent(this.cmpCamera);
      this.camNode.mtxLocal.translateY(1);
    }

    public move(_forward: number, _sideward: number): void {}
  }
}
