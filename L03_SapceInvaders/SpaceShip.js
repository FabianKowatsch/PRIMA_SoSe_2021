"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class SpaceShip extends f.Node {
        constructor() {
            super("SpaceShip");
            let scale = new f.Vector3(1, 1, 0);
            let cmpTransform = new f.ComponentTransform();
            cmpTransform.mtxLocal.scale(scale);
            this.addComponent(cmpTransform);
            this.addComponent(new f.ComponentMaterial(SpaceInvaders.greenMaterial));
            this.addComponent(new f.ComponentMesh(SpaceInvaders.spaceShipMesh));
        }
    }
    SpaceInvaders.SpaceShip = SpaceShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceShip.js.map