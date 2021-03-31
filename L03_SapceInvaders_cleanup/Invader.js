"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class Invader extends f.Node {
        constructor(_x, _y) {
            super("Invader" + _x + "/" + _y);
            let translate = new f.Vector3(_x, _y, 0);
            let scale = new f.Vector3(0.5, 0.5, 0);
            let transform = new f.ComponentTransform();
            transform.mtxLocal.translate(translate);
            transform.mtxLocal.scale(scale);
            this.addComponent(transform);
            this.addComponent(new f.ComponentMaterial(SpaceInvaders.whiteMaterial));
            this.addComponent(new f.ComponentMesh(SpaceInvaders.enemyMesh));
        }
    }
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map