"use strict";
var L05_TestScene;
(function (L05_TestScene) {
    var f = FudgeCore;
    const graphId = "Graph|2021-04-27T14:37:53.620Z|93013";
    let app;
    let viewport;
    let cmpCamera;
    let avatar = new f.Node("Avatar");
    let root = new f.Graph("root");
    let camBufferX = 0;
    let camBufferY = 0;
    const camSpeed = 0.2;
    const movementSpeed = 10;
    let isLocked = false;
    let forwardMovement = 0;
    let sideMovement = 0;
    window.addEventListener("load", init);
    async function init(_event) {
        await f.Project.loadResourcesFromHTML();
        let resource = f.Project.resources[graphId];
        root = resource;
        app = document.querySelector("canvas");
        cmpCamera = new f.ComponentCamera();
        cmpCamera.clrBackground = f.Color.CSS("GREY");
        cmpCamera.mtxPivot.translate(new f.Vector3(0, 1, 0));
        cmpCamera.mtxPivot.rotate(new f.Vector3(0, 90, 0));
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
        player_Movement(f.Loop.timeFrameReal / 1000);
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
        avatar.addComponent(cmpAvatar);
        avatar.addComponent(cmpCamera);
        avatar.addComponent(cmpTransform);
        cmpTransform.mtxLocal.scale(new f.Vector3(1, 1, 1));
        cmpTransform.mtxLocal.translate(new f.Vector3(0, 4, 0));
        cmpAvatar.rotationInfluenceFactor = new f.Vector3(0, 0, 0);
        //cmpAvatar.mtxPivot.scale(new f.Vector3(1, 0.85, 1));
        cmpAvatar.friction = 0.01;
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
        }
    }
    function updateCamera(_x, _y) {
        //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
        cmpCamera.mtxPivot.rotateY(-_x * camSpeed, true);
        cmpCamera.mtxPivot.rotateX(_y * camSpeed);
        camBufferX = 0;
        camBufferY = 0;
    }
    function checkKeyboardInputs() {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
            // avatar.mtxLocal.translateX((movementSpeed * f.Loop.timeFrameReal) / 1000);
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
    function player_Movement(_deltaTime) {
        let playerForward = new f.Vector3();
        playerForward = cmpCamera.mtxWorldToView.rotation;
        playerForward.normalize();
        playerForward.transform(avatar.mtxWorld, false);
        let playerBody = avatar.getComponent(f.ComponentRigidbody);
        //You can rotate a body like you would rotate a transform, incremental but keep in mind, normally we use forces in physics,
        //this is just a feature to make it easier to create player characters
        //playerBody.rotateBody(new f.Vector3(0, yTurn * turningspeed * _deltaTime, 0));
        let movementVelocity = new f.Vector3();
        movementVelocity.z = playerForward.x * forwardMovement * movementSpeed;
        movementVelocity.y = playerBody.getVelocity().y;
        movementVelocity.x = playerForward.z * sideMovement * movementSpeed;
        playerBody.setVelocity(movementVelocity);
    }
})(L05_TestScene || (L05_TestScene = {}));
//# sourceMappingURL=main.js.map