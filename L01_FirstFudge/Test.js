"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndlLoad);
    function hndlLoad(_event) {
        const canvas = document.querySelector("#viewport");
        let node = new f.Node("test");
        let mesh = new f.MeshQuad("Quad");
        let material = new f.Material("Mat", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        node.addComponent(new f.ComponentMesh(mesh));
        node.addComponent(new f.ComponentMaterial(material));
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(170);
        let viewport = new f.Viewport();
        console.log(cmpCamera);
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        viewport.draw();
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map