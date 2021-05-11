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
            this.activeProp = null;
            this.hasProp = false;
            this.propRigid = null;
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
            this.checkIfGrounded();
            if (this.isGrounded)
                this.cmpRigid.applyLinearImpulse(new f.Vector3(0, this.jumpForce, 0));
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
            if (this.hasProp == false) {
                let direction = this.camNode.mtxLocal.getX();
                direction.normalize();
                let hitInfo = this.avatarHitInfo(10);
                if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
                    hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, -100));
                    this.activeProp = hitInfo.rigidbodyComponent.getContainer();
                }
            }
        }
        shootPush() {
            let direction = this.camNode.mtxLocal.getX();
            direction.normalize();
            if (!this.hasProp) {
                let hitInfo = this.avatarHitInfo(10);
                if (hitInfo.hit) {
                    if (hitInfo.rigidbodyComponent.physicsType != 1) {
                        hitInfo.rigidbodyComponent.applyImpulseAtPoint(f.Vector3.SCALE(direction, 100));
                    }
                    else {
                        console.log(hitInfo.rigidbodyComponent.physicsType);
                    }
                }
            }
            else {
                this.letFall(true);
                this.propRigid.applyImpulseAtPoint(f.Vector3.SCALE(direction, 100));
                this.propRigid = null;
            }
        }
        tryGrabLastNode() {
            if (this.activeProp == null || this.hasProp == true)
                return;
            let hitInfo = this.avatarHitInfo(2);
            if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1 && hitInfo.rigidbodyComponent.getContainer() == this.activeProp) {
                this.pickUp(this.activeProp);
                this.hasProp = true;
            }
        }
        switchCloseNode() {
            if (this.hasProp == true) {
                this.letFall(false);
                return;
            }
            let hitInfo = this.avatarHitInfo(2);
            if (hitInfo.hit && hitInfo.rigidbodyComponent.physicsType != 1) {
                let node = hitInfo.rigidbodyComponent.getContainer();
                this.activeProp = node;
                this.pickUp(node);
                this.hasProp = true;
            }
        }
        pickUp(_node) {
            this.propRigid = _node.getComponent(f.ComponentRigidbody);
            _node.removeComponent(this.propRigid);
            this.camNode.addChild(_node);
            _node.mtxLocal.set(f.Matrix4x4.TRANSLATION(new f.Vector3(3, 0, 0)));
            // _node.getComponent(f.ComponentRigidbody).collisionGroup = f.PHYSICS_GROUP.DEFAULT;
        }
        letFall(_shooting = false) {
            if (this.hasProp) {
                this.propRigid.setAngularVelocity(f.Vector3.ZERO());
                this.propRigid.setVelocity(f.Vector3.ZERO());
                let direction = this.camNode.mtxLocal.getX();
                direction.normalize();
                let origin = this.cmpRigid.getPosition();
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
        avatarHitInfo(_distance) {
            let direction = this.camNode.mtxLocal.getX();
            direction.normalize();
            let origin = this.cmpRigid.getPosition();
            origin.transform(f.Matrix4x4.TRANSLATION(new f.Vector3(direction.x, direction.y + 1, direction.z)));
            return f.Physics.raycast(origin, direction, _distance);
        }
    }
    L06_PuzzleGame.Avatar = Avatar;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=Avatar.js.map