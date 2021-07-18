namespace JumpandHook {
  import f = FudgeCore;
  export class Prop extends f.Node {
    private static audio: f.Audio = new f.Audio("../../L06_PuzzleGame/Assets/Sound/impact.mp3");
    private static material: f.Material = new f.Material("MaterialProp", f.ShaderFlat, new f.CoatColored(f.Color.CSS("grey")));
    public cmpRigid: f.ComponentRigidbody;
    private weight: number = 10;
    private cmpAudio: f.ComponentAudio;
    constructor(_name: string, _position: f.Vector3, _scale: f.Vector3, _mesh: f.Mesh, _collider: f.COLLIDER_TYPE) {
      super(_name);
      //Transform
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(_scale);
      cmpTransform.mtxLocal.translate(_position);
      this.addComponent(cmpTransform);
      //Mesh
      let cmpMesh: f.ComponentMesh = new f.ComponentMesh(_mesh);
      this.addComponent(cmpMesh);
      //Material
      let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(Prop.material);
      this.addComponent(cmpMaterial);
      //Rigidbody
      this.cmpRigid = new f.ComponentRigidbody(this.weight, f.PHYSICS_TYPE.DYNAMIC, _collider, f.PHYSICS_GROUP.DEFAULT);
      this.addComponent(this.cmpRigid);
      this.cmpRigid.rotationInfluenceFactor = new f.Vector3(0.5, 0.5, 0.5);
      this.cmpRigid.friction = 0.8;
      //Audio
      this.cmpAudio = new f.ComponentAudio(Prop.audio, false, false);
      this.addComponent(this.cmpAudio);
      this.cmpAudio.setPanner(f.AUDIO_PANNER.CONE_OUTER_ANGLE, 360);
      this.cmpAudio.setPanner(f.AUDIO_PANNER.CONE_INNER_ANGLE, 360);
      this.addComponent(new ComponentScriptProp());
    }
  }
}
