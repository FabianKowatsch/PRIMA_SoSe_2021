"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class SpaceShip extends f.Node {
        constructor() {
            super("SpaceShip");
            let scale = new f.Vector3(1, 1, 0);
            let transform = new f.ComponentTransform();
            transform.mtxLocal.scale(scale);
            this.addComponent(transform);
            this.addComponent(new f.ComponentMaterial(SpaceInvaders.greenMaterial));
            this.addComponent(new f.ComponentMesh(SpaceInvaders.spaceShipMesh));
        }
    }
    SpaceInvaders.SpaceShip = SpaceShip;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=SpaceShip.js.map