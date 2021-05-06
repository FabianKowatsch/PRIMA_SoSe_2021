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
            this.jumpForce = 120;
            this.weight = 75;
            //Transform
            let cmpTransform = new f.ComponentTransform();
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
            let cmpCamTransform = new f.ComponentTransform();
            this.camNode.addComponent(cmpCamTransform);
            this.camNode.addComponent(this.cmpCamera);
            this.camNode.mtxLocal.translateY(1);
            //Gun
            this.gun = new L06_PuzzleGame.GravityGun();
            this.camNode.addChild(this.gun);
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
        shootPull() {
            let hitInfo;
            let direction = this.camNode.mtxLocal.getX();
            direction.normalize();
            let origin = this.cmpRigid.getPosition();
            origin.transform(f.Matrix4x4.TRANSLATION(new f.Vector3(direction.x, direction.y + 1, direction.z)));
            hitInfo = f.Physics.raycast(origin, direction, 10);
            if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
                hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, -100));
            }
            else {
                return;
            }
        }
        shootPush() {
            let hitInfo;
            let direction = this.camNode.mtxLocal.getX();
            direction.normalize();
            let origin = this.cmpRigid.getPosition();
            origin.transform(f.Matrix4x4.TRANSLATION(new f.Vector3(direction.x, direction.y + 1, direction.z)));
            hitInfo = f.Physics.raycast(origin, direction, 10);
            if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
                hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, 100));
            }
            else {
                return;
            }
        }
        tryPickUp(_node) {
            this.camNode.addChild(_node);
            _node.mtxLocal.set(f.Matrix4x4.TRANSLATION(f.Vector3.Z(1.5)));
        }
    }
    L06_PuzzleGame.Avatar = Avatar;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=Avatar.js.map