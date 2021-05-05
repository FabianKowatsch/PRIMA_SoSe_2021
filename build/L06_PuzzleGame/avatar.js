"use strict";
var L06_PuzzleGame;
(function (L06_PuzzleGame) {
    var f = FudgeCore;
    class Avatar extends f.Node {
        constructor(_cmpCamera) {
            super("Avatar");
            this.camNode = new f.Node("Cam");
            this.defaultSpeed = 5;
            this.movementSpeed = 5;
            this.isGrounded = false;
            this.jumpForce = 200;
            this.weight = 75;
            this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
            let cmpTransform = new f.ComponentTransform();
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
            let cmpCamTransform = new f.ComponentTransform();
            this.camNode.addComponent(cmpCamTransform);
            this.camNode.addComponent(this.cmpCamera);
            this.camNode.mtxLocal.translateY(1);
        }
        move(_forward, _sideward) {
            let playerForward = this.camNode.mtxLocal.getX();
            let playerSideward = this.camNode.mtxLocal.getZ();
            playerSideward.normalize();
            playerForward.normalize();
            let movementVel = new f.Vector3();
            movementVel.z = (playerForward.z * _forward + playerSideward.z * _sideward) * this.movementSpeed;
            movementVel.y = this.cmpRigid.getVelocity().y;
            movementVel.x = (playerForward.x * _forward + playerSideward.x * _sideward) * this.movementSpeed;
            this.cmpRigid.setVelocity(movementVel);
        }
        jump() {
            if (this.isGrounded)
                this.cmpRigid.applyLinearImpulse(new f.Vector3(0, this.jumpForce, 0));
        }
        checkIfGrounded() {
            let hitInfo;
            hitInfo = f.Physics.raycast(this.cmpRigid.getPosition(), new f.Vector3(0, -1, 0), 1.1);
            if (hitInfo.hit) {
                this.isGrounded = true;
            }
            else {
                this.isGrounded = false;
            }
        }
        sprint() {
            if (this.movementSpeed != 8)
                this.movementSpeed = 8;
        }
        walk() {
            if (this.movementSpeed != this.defaultSpeed)
                this.movementSpeed = this.defaultSpeed;
        }
    }
    L06_PuzzleGame.Avatar = Avatar;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=Avatar.js.map