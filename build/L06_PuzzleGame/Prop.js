"use strict";
var L06_PuzzleGame;
(function (L06_PuzzleGame) {
    var f = FudgeCore;
    let Prop = /** @class */ (() => {
        class Prop extends f.Node {
            constructor(_name, _position, _scale, _mesh, _collider) {
                super(_name);
                this.weight = 10;
                //Transform
                let cmpTransform = new f.ComponentTransform();
                cmpTransform.mtxLocal.scale(_scale);
                cmpTransform.mtxLocal.translate(_position);
                this.addComponent(cmpTransform);
                //Mesh
                let cmpMesh = new f.ComponentMesh(_mesh);
                this.addComponent(cmpMesh);
                //Material
                let cmpMaterial = new f.ComponentMaterial(Prop.material);
                this.addComponent(cmpMaterial);
                //Rigidbody
                this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, _collider, f.PHYSICS_GROUP.DEFAULT);
                this.addComponent(this.cmpRigid);
                this.cmpRigid.rotationInfluenceFactor = new f.Vector3(0.5, 0.5, 0.5);
                this.cmpRigid.friction = 0.8;
                //Audio
                this.cmpAudio = new f.ComponentAudio(Prop.audio, false, false);
                this.addComponent(this.cmpAudio);
                this.cmpAudio.setPanner(f.AUDIO_PANNER.CONE_OUTER_ANGLE, 360);
                this.cmpAudio.setPanner(f.AUDIO_PANNER.CONE_INNER_ANGLE, 360);
            }
            onCollision(_event) {
                let rigid = _event.target;
                let node = rigid.getContainer();
                node.cmpAudio.play(true);
            }
        }
        Prop.audio = new f.Audio("../../L06_PuzzleGame/Assets/Sound/impact.mp3");
        Prop.material = new f.Material("MaterialProp", f.ShaderFlat, new f.CoatColored(f.Color.CSS("grey")));
        return Prop;
    })();
    L06_PuzzleGame.Prop = Prop;
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=Prop.js.map