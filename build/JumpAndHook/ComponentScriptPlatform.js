"use strict";
var JumpandHook;
(function (JumpandHook) {
    var f = FudgeCore;
    class ComponentScriptPlatform extends f.ComponentScript {
        constructor() {
            super();
            this.name = "CmpScriptPlatform";
            this.prototypes = ["", "", "", "", ""];
            this.hndAdd = (_event) => {
                this.node = this.getContainer();
                this.node.addComponent(new f.ComponentMesh(this.mesh));
            };
            this.mesh = f.Project.resources[this.prototypes[Math.round(Math.random() * 4)]];
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndAdd);
        }
    }
    JumpandHook.ComponentScriptPlatform = ComponentScriptPlatform;
})(JumpandHook || (JumpandHook = {}));
//# sourceMappingURL=ComponentScriptPlatform.js.map