namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class CubeProp extends Prop {
    private static mesh: f.Mesh = new f.MeshCube("Cube");
    constructor(_name: string, _position: f.Vector3, _scale: f.Vector3) {
      super(_name, _position, _scale, CubeProp.mesh, f.COLLIDER_TYPE.CUBE);
    }
  }
}
