"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    const frameRate = 60;
    const movementSpeed = 5;
    const enemiesPerRow = 9;
    const rowAmount = 4;
    const barrierAmount = 5;
    const startPosX = -(enemiesPerRow - 1) / 2 - 0.5;
    const startPosY = 9;
    const maxHeight = 11;
    let interval = 3000;
    let fireTimeout = false;
    let invaderMovementX = 0.2;
    let invaderMovementY = 0;
    let intervalCount = 0;
    const root = new f.Node("Root");
    const invaderNode = new SpaceInvaders.InvaderNode(new f.Vector2(0, 0));
    const barrierNode = new f.Node("Barriers");
    const projectileNode = new f.Node("Projectiles");
    root.appendChild(projectileNode);
    createEnemies();
    createMothership();
    createSpaceShip();
    createBarriers();
    const spaceShip = root.getChildrenByName("SpaceShip")[0];
    let cmpCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 5, 15));
    cmpCamera.mtxPivot.rotateY(180);
    let viewport = new f.Viewport();
    window.addEventListener("load", init);
    window.addEventListener("keydown", hndKeyDown);
    function init(_event) {
        const canvas = document.querySelector("#viewport");
        console.log(root);
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        f.Loop.start(f.LOOP_MODE.TIME_REAL, frameRate);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        moveInvaderNode();
    }
    function update(_event) {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.A])) {
            spaceShip.mtxLocal.translateX(-(movementSpeed * f.Loop.timeFrameReal) / 1000);
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.D])) {
            spaceShip.mtxLocal.translateX((movementSpeed * f.Loop.timeFrameReal) / 1000);
        }
        projectileNode.getChildren().forEach((element) => {
            let projectile = element;
            projectile.move();
            if (projectile.mtxLocal.translation.y >= maxHeight) {
                projectileNode.removeChild(projectile);
            }
        });
        checkProjectileCollision();
        viewport.draw();
    }
    function hndKeyDown(_event) {
        if (_event.code === "Space")
            fireBullet();
    }
    function createEnemies() {
        let counterRow = 0;
        let counterEnemies = 0;
        for (let i = 0; i < enemiesPerRow * rowAmount; i++) {
            let invader = new SpaceInvaders.Invader(new f.Vector2(startPosX + counterEnemies, startPosY - counterRow));
            invaderNode.appendChild(invader);
            if (counterEnemies === enemiesPerRow - 1) {
                counterRow++;
                counterEnemies = 0;
            }
            else {
                counterEnemies++;
            }
        }
        root.appendChild(invaderNode);
    }
    function createSpaceShip() {
        let spaceShip = new SpaceInvaders.SpaceShip();
        root.appendChild(spaceShip);
    }
    function createMothership() {
        let spaceShip = new SpaceInvaders.Mothership(new f.Vector2(0, startPosY + 1));
        root.appendChild(spaceShip);
    }
    function createBarriers() {
        let counter = 0;
        for (let i = 0; i < barrierAmount; i++) {
            let barrier = new SpaceInvaders.Barrier(startPosX + counter, 2);
            barrierNode.appendChild(barrier);
            counter += -((2 * startPosX) / (barrierAmount - 1));
        }
        root.appendChild(barrierNode);
    }
    function fireBullet() {
        if (fireTimeout === true)
            return;
        let spaceShipPos = new f.Vector2(spaceShip.mtxLocal.translation.x, 1);
        let bullet = new SpaceInvaders.Projectile(spaceShipPos);
        projectileNode.addChild(bullet);
        fireTimeout = true;
        setTimeout(() => {
            fireTimeout = false;
        }, 500);
    }
    function checkProjectileCollision() {
        for (let projectile of projectileNode.getChildren()) {
            for (let invader of invaderNode.getChildren()) {
                if (projectile.checkCollision(invader)) {
                    projectileNode.removeChild(projectile);
                    invaderNode.removeChild(invader);
                }
            }
        }
    }
    function moveInvaderNode() {
        if (intervalCount % 5 === 0 && intervalCount > 0) {
            invaderMovementX *= -1;
            invaderMovementY -= 0.1;
        }
        else {
            invaderMovementY = 0;
        }
        invaderNode.move(new f.Vector2(invaderMovementX, invaderMovementY));
        if (interval > 100) {
            interval -= 100;
        }
        intervalCount++;
        console.log(interval);
        setTimeout(moveInvaderNode, interval);
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Main.js.map