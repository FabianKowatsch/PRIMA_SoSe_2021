namespace L06_PuzzleGame {
  import f = FudgeCore;
  export class Tools {
    public static drawLine(_viewport: f.Viewport, _point1: f.Vector3, _point2: f.Vector3): void {
      let canvas: HTMLCanvasElement = document.querySelector("canvas");

      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
      //   let v1: f.Vector2 =
      let pos1: f.Vector2 = _viewport.pointWorldToClient(_point1);
      let pos2: f.Vector2 = _viewport.pointWorldToClient(_point2);

      ctx.beginPath();
      ctx.moveTo(pos1.x, pos1.y);
      ctx.lineTo(pos2.x, pos2.y);

      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }
}
