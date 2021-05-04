"use strict";
var L06_PuzzleGame;
(function (L06_PuzzleGame) {
    var f = FudgeCore;
    class Avatar extends f.Node {
        constructor(_cmpCamera) {
            super("Avatar");
            this.camNode = new f.Node("Cam");
            this.cmpRigid = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
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
        move(_forward, _sideward) { }
    }
    L06_PuzzleGame.Avatar = Avatar;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=avatar.js.map