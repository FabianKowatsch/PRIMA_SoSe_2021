namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class SphereProp extends Prop {
    private static mesh: f.Mesh = new f.MeshSphere("Sphere");
    constructor(_name: string, _position: f.Vector3, _scale: f.Vector3) {
      super(_name, _position, _scale, SphereProp.mesh, f.COLLIDER_TYPE.SPHERE);
    }
  }
}
