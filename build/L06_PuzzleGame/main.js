"use strict";
var L05_TestScene;
(function (L05_TestScene) {
    var f = FudgeCore;
    let graphId = "Graph|2021-04-27T14:37:53.620Z|93013";
    let viewport;
    let ball;
    let cmpCamera;
    let player = new f.Node("Avatar");
    let root = new f.Graph("root");
    window.addEventListener("load", init);
    async function init(_event) {
        await f.Project.loadResourcesFromHTML();
        let resource = f.Project.resources[graphId];
        root = resource;
        const app = document.querySelector("canvas");
        ball = root.getChildrenByName("ball")[0];
        cmpCamera = new f.ComponentCamera();
        cmpCamera.clrBackground = f.Color.CSS("GREY");
        cmpCamera.mtxPivot.translate(new f.Vector3(0, 0, -20));
        cmpCamera.mtxPivot.lookAt(new f.Vector3(0, 0, 110));
        initPhysics();
        createAvatar();
        createRigidbodies();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, app);
        f.Physics.start(root);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(); //Stard the game loop
        console.log(root);
    }
    function update() {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        cmpCamera.mtxPivot.lookAt(ball.mtxLocal.translation);
        viewport.draw();
    }
    function initPhysics() {
        f.Physics.initializePhysics();
        f.Physics.world.setSolverIterations(1000);
        f.Physics.settings.defaultRestitution = 0.3;
        f.Physics.settings.defaultFriction = 0.8;
        f.Physics.settings.debugDraw = true;
    }
    function createAvatar() {
        let cmpAvatar = new f.ComponentRigidbody(1, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.CAPSULE, f.PHYSICS_GROUP.DEFAULT);
        let cmpTransform = new f.ComponentTransform();
        player.addComponent(cmpAvatar);
        player.addComponent(cmpCamera);
        player.addComponent(cmpTransform);
        cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
        cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
        cmpAvatar.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
        //cmpAvatar.mtxPivot.scale(new f.Vector3(1, 0.85, 1));
        cmpAvatar.friction = 0.01;
        root.appendChild(player);
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigid);
        }
    }
})(L05_TestScene || (L05_TestScene = {}));
//# sourceMappingURL=main.js.map