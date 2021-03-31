"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class BarrierSubPart extends f.Node {
        constructor(_x, _y) {
            super("Barrier" + _x + "/" + _y);
            let translate = new f.Vector3(_x, _y, 0);
            let scale = new f.Vector3(0.1, 0.1, 0);
            let transform = new f.ComponentTransform();
            transform.mtxLocal.translate(translate);
            transform.mtxLocal.scale(scale);
            this.addComponent(transform);
            this.addComponent(new f.ComponentMaterial(SpaceInvaders.greenMaterial));
            this.addComponent(new f.ComponentMesh(SpaceInvaders.barrierMesh));
        }
    }
    SpaceInvaders.BarrierSubPart = BarrierSubPart;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=BarrierSubPart.js.map