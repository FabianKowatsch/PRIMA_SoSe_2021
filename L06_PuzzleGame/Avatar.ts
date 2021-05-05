namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class Avatar extends f.Node {
    public cmpCamera: f.ComponentCamera;
    public cmpRigid: f.ComponentRigidbody;
    public camNode: f.Node = new f.Node("Cam");
    private defaultSpeed: number = 5;
    private movementSpeed: number = 5;
    private isGrounded: boolean = false;
    private jumpForce: number = 200;
    private weight: number = 75;
    constructor(_cmpCamera: f.ComponentCamera) {
      super("Avatar");
      this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
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

    public move(_forward: number, _sideward: number): void {
      let playerForward: f.Vector3 = this.camNode.mtxLocal.getX();
      let playerSideward: f.Vector3 = this.camNode.mtxLocal.getZ();
      playerSideward.normalize();
      playerForward.normalize();
      let movementVel: f.Vector3 = new f.Vector3();
      movementVel.z = (playerForward.z * _forward + playerSideward.z * _sideward) * this.movementSpeed;
      movementVel.y = this.cmpRigid.getVelocity().y;
      movementVel.x = (playerForward.x * _forward + playerSideward.x * _sideward) * this.movementSpeed;
      this.cmpRigid.setVelocity(movementVel);
    }
    public jump(): void {
      if (this.isGrounded) this.cmpRigid.applyLinearImpulse(new f.Vector3(0, this.jumpForce, 0));
    }
    public checkIfGrounded(): void {
      let hitInfo: f.RayHitInfo;
      hitInfo = f.Physics.raycast(this.cmpRigid.getPosition(), new f.Vector3(0, -1, 0), 1.1);
      if (hitInfo.hit) {
        this.isGrounded = true;
      } else {
        this.isGrounded = false;
      }
    }
    public sprint(): void {
      if (this.movementSpeed != 8) this.movementSpeed = 8;
    }
    public walk(): void {
      if (this.movementSpeed != this.defaultSpeed) this.movementSpeed = this.defaultSpeed;
    }
  }
}
