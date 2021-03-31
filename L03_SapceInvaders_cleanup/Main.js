"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var f = FudgeCore;
    // const frameRate: number = 60;
    const enemiesPerRow = 9;
    const rowAmount = 4;
    const barrierAmount = 5;
    const startPosX = -(enemiesPerRow - 1) / 2;
    const startPosY = 10;
    SpaceInvaders.enemyMesh = new f.MeshSphere("EnemySphere", 10, 9);
    SpaceInvaders.whiteMaterial = new f.Material("Mat", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
    SpaceInvaders.barrierMesh = new f.MeshCube("barrierCube");
    SpaceInvaders.greenMaterial = new f.Material("Mat", f.ShaderUniColor, new f.CoatColored(new f.Color(0.3, 1, 0, 1)));
    const vectorArray = [
        new f.Vector2(0.1, 0),
        new f.Vector2(0.5, 0),
        new f.Vector2(0.5, 0.3),
        new f.Vector2(0, 0.3),
        new f.Vector2(0.1, 0.5),
        new f.Vector2(-0.1, 0.5),
        new f.Vector2(-0.1, 0.3),
        new f.Vector2(-0.5, 0.3),
        new f.Vector2(-0.5, 0)
    ];
    SpaceInvaders.spaceShipMesh = new f.MeshPolygon("ShipCube", vectorArray, true);
    const root = new f.Node("Root");
    const invaderNode = new f.Node("Invaders");
    const barrierNode = new f.Node("Barriers");
    createEnemies();
    createSpaceShip();
    createBarriers();
    let cmpCamera = new f.ComponentCamera();
    cmpCamera.mtxPivot.translate(new f.Vector3(0, 5, 15));
    cmpCamera.mtxPivot.rotateY(180);
    let viewport = new f.Viewport();
    window.addEventListener("load", init);
    function init(_event) {
        const canvas = document.querySelector("#viewport");
        console.log(root);
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
    }
    function createEnemies() {
        let counterRow = 0;
        let counterEnemies = 0;
        for (let i = 0; i < enemiesPerRow * rowAmount; i++) {
            let invader = new SpaceInvaders.Invader(counterEnemies, -counterRow);
            invaderNode.appendChild(invader);
            if (counterEnemies === enemiesPerRow - 1) {
                counterRow++;
                counterEnemies = 0;
            }
            else {
                counterEnemies++;
            }
        }
        let translate = new f.Vector3(startPosX, startPosY, 0);
        let transform = new f.ComponentTransform();
        transform.mtxLocal.translate(translate);
        invaderNode.addComponent(transform);
        root.appendChild(invaderNode);
    }
    function createSpaceShip() {
        let spaceShip = new SpaceInvaders.SpaceShip();
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
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Main.js.map