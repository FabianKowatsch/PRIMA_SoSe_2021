namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class Avatar extends f.Node {
    public cmpCamera: f.ComponentCamera;
    public cmpRigid: f.ComponentRigidbody;
    public camNode: f.Node = new f.Node("Cam");
    public gun: GravityGun;
    private defaultSpeed: number;
    private movementSpeed: number;
    private isGrounded: boolean = false;
    private jumpForce: number;
    private weight: number;
    private activeProp: f.Node = null;
    private hasProp: boolean = false;
    private propRigid: f.ComponentRigidbody = null;

    constructor(_cmpCamera: f.ComponentCamera, _speed: number, _force: number, _weight: number) {
      super("Avatar");
      //Properties
      this.weight = _weight;
      this.defaultSpeed = _speed;
      this.movementSpeed = _speed;
      this.jumpForce = _force;
      //Transform
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
      cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
      this.addComponent(cmpTransform);
      //Rigid
      this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
      this.addComponent(this.cmpRigid);
      this.cmpRigid.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
      this.cmpRigid.friction = 0.01;
      this.cmpRigid.restitution = 0;
      //Camera
      this.addChild(this.camNode);
      this.cmpCamera = _cmpCamera;
      this.cmpCamera.projectCentral(1, 90, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 2000);
      this.cmpCamera.clrBackground = f.Color.CSS("SlateGrey");
      this.cmpCamera.mtxPivot.rotate(new f.Vector3(0, 90, 0));
      let cmpCamTransform: f.ComponentTransform = new f.ComponentTransform();
      this.camNode.addComponent(cmpCamTransform);
      this.camNode.addComponent(this.cmpCamera);
      this.camNode.mtxLocal.translateY(1);
      //audio
      this.camNode.addComponent(new f.ComponentAudioListener());
      //Gun
      this.gun = new GravityGun();
      this.camNode.addChild(this.gun);
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
      this.checkIfGrounded();
      if (this.isGrounded) this.cmpRigid.applyLinearImpulse(new f.Vector3(0, this.jumpForce, 0));
    }

    public sprint(): void {
      if (this.movementSpeed != 8) this.movementSpeed = 8;
    }
    public walk(): void {
      if (this.movementSpeed != this.defaultSpeed) this.movementSpeed = this.defaultSpeed;
    }

    public shootPull(): void {
      if (this.hasProp == false) {
        let direction: f.Vector3 = this.camNode.mtxLocal.getX();
        direction.normalize();
        let hitInfo: f.RayHitInfo = this.avatarHitInfo(10);
        if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
          hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, -100));
          this.activeProp = hitInfo.rigidbodyComponent.getContainer();
        }
      }
      this.gun.playPullSound();
    }
    public shootPush(): void {
      let direction: f.Vector3 = this.camNode.mtxLocal.getX();
      direction.normalize();
      if (!this.hasProp) {
        let hitInfo: f.RayHitInfo = this.avatarHitInfo(10);
        if (hitInfo.hit) {
          if (hitInfo.rigidbodyComponent.physicsType != 1) {
            hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, 100));
          }
        }
      } else {
        this.letFall(true);
        this.propRigid.applyImpulseAtPoint(f.Vector3.SCALE(direction, 100));
        this.propRigid = null;
      }
      this.gun.playPushSound();
    }

    public tryGrabLastNode(): void {
      if (this.activeProp == null || this.hasProp == true) return;

      let hitInfo: f.RayHitInfo = this.avatarHitInfo(2);
      if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1 && hitInfo.rigidbodyComponent.getContainer() == this.activeProp) {
        this.pickUp(this.activeProp);
        this.hasProp = true;
      }
    }

    public switchCloseNode(): void {
      if (this.hasProp == true) {
        this.letFall(false);
        return;
      }

      let hitInfo: f.RayHitInfo = this.avatarHitInfo(2);
      if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
        let node: f.Node = hitInfo.rigidbodyComponent.getContainer();
        this.activeProp = node;
        this.pickUp(node);
        this.hasProp = true;
      }
    }

    public pickUp(_node: f.Node): void {
      this.propRigid = _node.getComponent(f.ComponentRigidbody);
      _node.removeComponent(this.propRigid);
      this.camNode.addChild(_node);
      _node.mtxLocal.translation = new f.Vector3(3, 0, 0);
      //_node.mtxLocal.rotation = new f.Vector3(0, 0, 0);
    }

    public letFall(_shooting: boolean = false): void {
      if (this.hasProp) {
        this.propRigid.setAngularVelocity(f.Vector3.ZERO());
        this.propRigid.setVelocity(f.Vector3.ZERO());
        let direction: f.Vector3 = this.camNode.mtxLocal.getX();
        direction.normalize();
        let origin: f.Vector3 = this.cmpRigid.getPosition();
        origin.transform(f.Matrix4x4.TRANSLATION(new f.Vector3(direction.x, direction.y + 1, direction.z)));
        this.propRigid.setPosition(origin);
        this.activeProp.addComponent(this.propRigid);
        this.getParent().addChild(this.activeProp);
        this.activeProp = null;
        this.hasProp = false;
        if (!_shooting) {
          this.propRigid = null;
        }
      }
    }

    public useHook(): void {
      let direction: f.Vector3 = this.camNode.mtxLocal.getX();
      direction.normalize();
      if (!this.hasProp) {
        let hitInfo: f.RayHitInfo = this.avatarHitInfo(10);
        if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType == 1) {
          //ROPE
          let nextNode: f.Node = hitInfo.rigidbodyComponent.getContainer();
          let rope: f.Node = new f.Node("Rope");
          let cmpScript: ComponentScriptRope = new ComponentScriptRope(nextNode, 0.05);
          console.log("starting");
          this.gun.addChild(rope);
          rope.addComponent(cmpScript);
        }
      }
      //this.cmpRigid.applyForce(new f.Vector3(0, this.weight * 111, 0));
      // this.gun.playPushSound();
    }

    private checkIfGrounded(): void {
      let hitInfo: f.RayHitInfo;
      hitInfo = f.Physics.raycast(this.cmpRigid.getPosition(), new f.Vector3(0, -1, 0), 1.1);
      if (hitInfo.hit) {
        this.isGrounded = true;
      } else {
        this.isGrounded = false;
      }
    }

    private avatarHitInfo(_distance: number): f.RayHitInfo {
      let direction: f.Vector3 = this.camNode.mtxLocal.getX();
      direction.normalize();
      let origin: f.Vector3 = this.cmpRigid.getPosition();
      origin.transform(f.Matrix4x4.TRANSLATION(new f.Vector3(direction.x, direction.y + 1, direction.z)));
      return f.Physics.raycast(origin, direction, _distance);
    }
  }
}
