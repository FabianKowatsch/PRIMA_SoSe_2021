"use strict";
var L06_PuzzleGame;
(function (L06_PuzzleGame) {
    var f = FudgeCore;
    const graphId = "Graph|2021-04-27T14:37:53.620Z|93013";
    let app;
    let viewport;
    let cmpCamera;
    let avatar;
    let root = new f.Graph("root");
    let camBufferX = 0;
    let camBufferY = 0;
    const camSpeed = 0.15;
    let isLocked = false;
    let forwardMovement = 0;
    let sideMovement = 0;
    window.addEventListener("load", init);
    async function init(_event) {
        await f.Project.loadResourcesFromHTML();
        let resource = f.Project.resources[graphId];
        root = resource;
        app = document.querySelector("canvas");
        //cmpCamera.mtxPivot.lookAt(new f.Vector3(0, 0, 110));
        initPhysics();
        createAvatar();
        createRigidbodies();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, app);
        f.Physics.adjustTransforms(root, false);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(); //Stard the game loop
        console.log(root);
        // Attach events to the document
        document.addEventListener("keydown", hndKeyDown);
        document.addEventListener("keyup", hndKeyRelease);
        app.addEventListener("mousemove", hndMouseMovement);
        app.addEventListener("mousedown", onPointerDown);
        document.addEventListener("pointerlockchange", pointerLockChange);
    }
    function update() {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        checkKeyboardInputs();
        updateCamera(camBufferX, camBufferY);
        avatar.checkIfGrounded();
        avatar.move(forwardMovement, sideMovement);
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
        cmpCamera = new f.ComponentCamera();
        avatar = new L06_PuzzleGame.Avatar(cmpCamera);
        root.appendChild(avatar);
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        for (let node of level.getChildren()) {
            let cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
            node.addComponent(cmpRigid);
        }
    }
    function hndMouseMovement(_event) {
        if (isLocked) {
            camBufferX += _event.movementX;
            camBufferY += _event.movementY;
            let playerForward = avatar.camNode.mtxLocal.getZ();
            console.log(playerForward);
        }
    }
    function updateCamera(_x, _y) {
        //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
        avatar.camNode.mtxLocal.rotateY(-_x * camSpeed, true);
        cmpCamera.mtxPivot.rotateX(_y * camSpeed);
        camBufferX = 0;
        camBufferY = 0;
    }
    function checkKeyboardInputs() {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
            avatar.jump();
        }
    }
    function hndKeyDown(_event) {
        if (_event.code == f.KEYBOARD_CODE.W) {
            forwardMovement = 1;
        }
        if (_event.code == f.KEYBOARD_CODE.A) {
            sideMovement = -1;
        }
        if (_event.code == f.KEYBOARD_CODE.S) {
            forwardMovement = -1;
        }
        if (_event.code == f.KEYBOARD_CODE.D) {
            sideMovement = 1;
        }
        if (_event.code == f.KEYBOARD_CODE.SHIFT_LEFT) {
            avatar.sprint();
        }
    }
    function hndKeyRelease(_event) {
        if (_event.code == f.KEYBOARD_CODE.W) {
            forwardMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.A) {
            sideMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.S) {
            forwardMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.D) {
            sideMovement = 0;
        }
        if (_event.code == f.KEYBOARD_CODE.SHIFT_LEFT) {
            avatar.walk();
        }
    }
    function onPointerDown(_event) {
        if (!isLocked) {
            app.requestPointerLock();
            console.log("locked");
        }
    }
    function pointerLockChange(_event) {
        if (!document.pointerLockElement) {
            isLocked = false;
        }
        else {
            isLocked = true;
        }
    }
})(L06_PuzzleGame || (L06_PuzzleGame = {}));
//# sourceMappingURL=main.js.map