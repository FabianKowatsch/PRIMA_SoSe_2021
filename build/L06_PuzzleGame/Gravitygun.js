"use strict";
var L06_PuzzleGame;
(function (L06_PuzzleGame) {
    var f = FudgeCore;
    let GravityGun = /** @class */ (() => {
        class GravityGun extends f.Node {
            constructor() {
                super("GravityGun");
                //Transform
                let cmpTransform = new f.ComponentTransform();
                cmpTransform.mtxLocal.scale(new f.Vector3(0.3, 0.05, 0.05));
                cmpTransform.mtxLocal.translate(new f.Vector3(1.4, -2.5, 4));
                cmpTransform.mtxLocal.rotate(new f.Vector3(0, 0, 0));
                this.addComponent(cmpTransform);
                //Mesh
                let barrel = new f.ComponentMesh(GravityGun.mesh);
                this.addComponent(barrel);
                //Material
                let cmpMaterial = new f.ComponentMaterial(GravityGun.material);
                this.addComponent(cmpMaterial);
                //Grip
                this.grip = new f.Node("grip");
                let gripMesh = new f.ComponentMesh(GravityGun.mesh);
                this.grip.addComponent(gripMesh);
                let gripMat = new f.ComponentMaterial(GravityGun.material);
                this.grip.addComponent(gripMat);
                let gripTr = new f.ComponentTransform();
                gripTr.mtxLocal.scale(new f.Vector3(0.2, 2.2, 0.8));
                gripTr.mtxLocal.translate(new f.Vector3(-1.8, -0.5, 0));
                gripTr.mtxLocal.rotate(new f.Vector3(0, 0, 0));
                this.grip.addComponent(gripTr);
                this.addChild(this.grip);
            }
        }
        GravityGun.mesh = new f.MeshCube("Gun");
        GravityGun.material = new f.Material("MaterialGun", f.ShaderFlat, new f.CoatColored(f.Color.CSS("grey")));
        return GravityGun;
    })();
    L06_PuzzleGame.GravityGun = GravityGun;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=GravityGun.js.map