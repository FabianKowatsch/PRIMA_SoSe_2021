"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class Barrier extends f.Node {
        constructor(_x, _y) {
            super("Barrier" + _x + "/" + _y);
            let translate = new f.Vector3(_x, _y, 0);
            let scale = new f.Vector3(1, 1, 0);
            let transform = new f.ComponentTransform();
            transform.mtxLocal.translate(translate);
            transform.mtxLocal.scale(scale);
            this.addComponent(transform);
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < 10; j++) {
                    if (!((j < 2 && i > 1 && i < 8) ||
                        (j < 3 && i > 2 && i < 7) ||
                        (j < 4 && i > 3 && i < 6) ||
                        (j > 7 && (i < 1 || i > 8)) ||
                        (j > 8 && (i < 2 || i > 7)))) {
                        let x = -0.45 + i / 10;
                        let y = -0.45 + j / 10;
                        let subPart = new SpaceInvaders.BarrierSubPart(x, y);
                        this.addChild(subPart);
                    }
                }
            }
        }
    }
    SpaceInvaders.Barrier = Barrier;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Barrier.js.map