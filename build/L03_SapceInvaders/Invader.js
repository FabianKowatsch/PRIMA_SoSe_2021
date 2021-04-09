"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    class Invader extends SpaceInvaders.QuadNode {
        constructor(_pos) {
            let _scale = new f.Vector2(0.5, 0.5);
            super("Invader" + _pos.x + "/" + _pos.y, _pos, _scale, "invader");
            this.setRectPosition();
        }
        updateRectPosition() {
            if (this.getParent() == null)
                return;
            this.rect.position.x =
                this.mtxLocal.translation.x +
                    this.getParent().mtxLocal.translation.x -
                    this.rect.size.x / 2;
            this.rect.position.y =
                this.mtxLocal.translation.y +
                    this.getParent().mtxLocal.translation.y -
                    this.rect.size.y / 2;
        }
    }
    SpaceInvaders.Invader = Invader;
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Invader.js.map