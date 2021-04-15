namespace SpaceInvaders {
  import f = FudgeCore;

  export class QuadNode extends f.Node {
    private static mesh: f.Mesh = new f.MeshQuad("Quad");
    private static material: f.Material = new f.Material(
      "Material",
      f.ShaderUniColor,
      new f.CoatColored()
    );
    private static textureInvader: f.TextureImage = new f.TextureImage(
      "./Assets/Invader.png"
    );
    private static materialInvader: f.Material = new f.Material(
      "Invader",
      f.ShaderTexture,
      new f.CoatTextured(f.Color.CSS("White"), QuadNode.textureInvader)
    );
    private static textureMothership: f.TextureImage = new f.TextureImage(
      "./Assets/mothership.png"
    );
    private static materialMothership: f.Material = new f.Material(
      "Invader",
      f.ShaderTexture,
      new f.CoatTextured(f.Color.CSS("White"), QuadNode.textureMothership)
    );
    public rect: f.Rectangle;
    constructor(
      _name: string,
      _pos: f.Vector2,
      _scale: f.Vector2,
      _texture?: string
    ) {
      super(_name);
      this.rect = new f.Rectangle(
        _pos.x,
        _pos.y,
        _scale.x,
        _scale.y,
        f.ORIGIN2D.CENTER
      );
      let translate: f.Vector3 = new f.Vector3(_pos.x, _pos.y, 0);
      let scale: f.Vector3 = new f.Vector3(_scale.x, _scale.y, 0);
      let cmpTransform: f.ComponentTransform = new f.ComponentTransform();
      cmpTransform.mtxLocal.translate(translate);
      cmpTransform.mtxLocal.scale(scale);
      this.addComponent(cmpTransform);
      switch (_texture) {
        case "invader":
          this.addComponent(new f.ComponentMaterial(QuadNode.materialInvader));
          break;
        case "mothership":
          this.addComponent(
            new f.ComponentMaterial(QuadNode.materialMothership)
          );
          break;

        default:
          this.addComponent(new f.ComponentMaterial(QuadNode.material));
          break;
      }

      this.addComponent(new f.ComponentMesh(QuadNode.mesh));
    }
    public checkCollision(_target: QuadNode): boolean {
      return this.rect.collides(_target.rect);
    }

    public setRectPosition(): void {
      this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
      this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
    }

    public updateRectPosition(): void {
      if (this.getParent() == null) return;
      this.rect.position.x =
        this.mtxLocal.translation.x +
        this.getParent().mtxLocal.translation.x -
        this.rect.size.x / 2;
      this.rect.position.y =
        this.mtxLocal.translation.y +
        this.getParent().mtxLocal.translation.y -
        this.rect.size.y / 2;
    }
  }
}
