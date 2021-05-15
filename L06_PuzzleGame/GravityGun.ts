namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class GravityGun extends f.Node {
    private static audioPull: f.Audio = new f.Audio("../../L06_PuzzleGame/Assets/Sound/pull.mp3");
    private static audioPush: f.Audio = new f.Audio("../../L06_PuzzleGame/Assets/Sound/push.mp3");
    private static mesh: f.Mesh = new f.MeshCube("Gun");
    private static material: f.Material = new f.Material("MaterialGun", f.ShaderFlat, new f.CoatColored(f.Color.CSS("grey")));
    public cmpRigid: f.ComponentRigidbody;
    private grip: f.Node;
    private cmpAudioPush: f.ComponentAudio;
    private cmpAudioPull: f.ComponentAudio;
    constructor() {
      super("GravityGun");
      //Transform
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.scale(new f.Vector3(0.3, 0.05, 0.05));
      cmpTransform.mtxLocal.translate(new f.Vector3(1.4, -2.5, 4));
      cmpTransform.mtxLocal.rotate(new f.Vector3(0, 0, 0));
      this.addComponent(cmpTransform);
      //Mesh
      let barrel: f.ComponentMesh = new f.ComponentMesh(GravityGun.mesh);
      this.addComponent(barrel);
      //Material
      let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(GravityGun.material);
      this.addComponent(cmpMaterial);
      //Grip
      this.grip = new f.Node("grip");
      let gripMesh: f.ComponentMesh = new f.ComponentMesh(GravityGun.mesh);
      this.grip.addComponent(gripMesh);
      let gripMat: f.ComponentMaterial = new f.ComponentMaterial(GravityGun.material);
      this.grip.addComponent(gripMat);
      let gripTr: f.ComponentTransform = new f.ComponentTransform();
      gripTr.mtxLocal.scale(new f.Vector3(0.2, 2.2, 0.8));
      gripTr.mtxLocal.translate(new f.Vector3(-1.8, -0.5, 0));
      gripTr.mtxLocal.rotate(new f.Vector3(0, 0, 0));
      this.grip.addComponent(gripTr);
      this.addChild(this.grip);
      //Audio
      let audioNodePush: f.Node = new f.Node("AudioPush");
      this.cmpAudioPush = new f.ComponentAudio(GravityGun.audioPush, false, false);
      audioNodePush.addComponent(this.cmpAudioPush);
      this.cmpAudioPush.setPanner(f.AUDIO_PANNER.CONE_OUTER_ANGLE, 360);
      this.cmpAudioPush.setPanner(f.AUDIO_PANNER.CONE_INNER_ANGLE, 360);
      this.addChild(audioNodePush);

      let audioNodePull: f.Node = new f.Node("AudioPull");
      this.cmpAudioPull = new f.ComponentAudio(GravityGun.audioPull, false, false);
      audioNodePull.addComponent(this.cmpAudioPull);
      this.cmpAudioPull.setPanner(f.AUDIO_PANNER.CONE_OUTER_ANGLE, 360);
      this.cmpAudioPull.setPanner(f.AUDIO_PANNER.CONE_INNER_ANGLE, 360);
      this.addChild(audioNodePull);
    }

    public playPushSound(): void {
      this.cmpAudioPush.play(true);
    }
    public playPullSound(): void {
      this.cmpAudioPull.play(true);
    }
  }
}
