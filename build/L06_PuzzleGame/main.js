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
    let props;
    const propAmount = 12;
    let camBufferX = 0;
    let camBufferY = 0;
    const camSpeed = -0.15;
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
        createProps();
        createRigidbodies();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, app);
        f.Physics.adjustTransforms(root, true);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start(); //Stard the game loop
        //console.log(root);
        // Attach events to the document
        document.addEventListener("keydown", hndKeyDown);
        document.addEventListener("keyup", hndKeyRelease);
        document.addEventListener("mousemove", hndMouseMovement);
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("pointerlockchange", pointerLockChange);
    }
    function update() {
        f.Physics.world.simulate(f.Loop.timeFrameReal / 1000);
        checkKeyboardInputs();
        updateCamera(camBufferX, camBufferY);
        avatar.checkIfGrounded();
        avatar.move(forwardMovement, sideMovement);
        avatar.tryGrabLastNode();
        viewport.draw();
    }
    function initPhysics() {
        f.Physics.initializePhysics();
        f.Physics.world.setSolverIterations(1000);
        f.Physics.settings.defaultRestitution = 0.3;
        f.Physics.settings.defaultFriction = 0.8;
        f.Physics.settings.debugDraw = false;
    }
    function createAvatar() {
        cmpCamera = new f.ComponentCamera();
        avatar = new L06_PuzzleGame.Avatar(cmpCamera);
        root.appendChild(avatar);
    }
    function createRigidbodies() {
        let level = root.getChildrenByName("level")[0];
        let cmpRigid;
        for (let node of level.getChildren()) {
            switch (node.getComponent(f.ComponentMesh).mesh.name) {
                case "meshCube":
                    cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
                    break;
                case "meshExtrusion":
                    cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
                    break;
                default:
                    cmpRigid = new f.ComponentRigidbody(0, f.PHYSICS_TYPE.STATIC, f.COLLIDER_TYPE.CUBE, f.PHYSICS_GROUP.DEFAULT);
                    break;
            }
            node.addComponent(cmpRigid);
        }
        let ball = root.getChildrenByName("ball")[0];
        cmpRigid = new f.ComponentRigidbody(7, f.PHYSICS_TYPE.DYNAMIC, f.COLLIDER_TYPE.SPHERE, f.PHYSICS_GROUP.DEFAULT);
        ball.addComponent(cmpRigid);
    }
    function createProps() {
        props = new f.Node("Props");
        for (let i = 0; i < propAmount; i++) {
            let randomPos = Math.random() + i;
            let randomScale = 1 + Math.random();
            let prop = new L06_PuzzleGame.Prop(`prop-${i}`, new f.Vector3(randomPos, randomPos, randomPos), new f.Vector3(randomScale, randomScale, randomScale));
            props.addChild(prop);
        }
        root.addChild(props);
    }
    function hndMouseMovement(_event) {
        if (isLocked) {
            camBufferX += _event.movementX;
            camBufferY += _event.movementY;
            // let playerForward: f.Vector3 = avatar.camNode.mtxLocal.getZ();
            // console.log(playerForward);
        }
    }
    function updateCamera(_x, _y) {
        //avatar.mtxLocal.rotateY(-_x * camSpeed, true);
        avatar.camNode.mtxLocal.rotateY(_x * camSpeed, true);
        avatar.camNode.mtxLocal.rotateZ(_y * camSpeed);
        camBufferX = 0;
        camBufferY = 0;
    }
    function checkKeyboardInputs() {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.SPACE])) {
            avatar.jump();
        }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.Y])) {
            f.Physics.settings.debugDraw = !f.Physics.settings.debugDraw;
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
        }
        else {
            switch (_event.button) {
                case 1:
                    avatar.shootPush();
                    break;
                case 2:
                    avatar.shootPull();
                    break;
                default:
                    avatar.shootPush();
                    break;
            }
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