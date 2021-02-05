import Game from "~/Game";
export default class Segment {
   public scene!: Game;
   public level!: number
   public startX!: number
   public startY!: number
   public endX!: number
   public endY!: number
   public scoreText!: Phaser.GameObjects.DynamicBitmapText;
   private line: Phaser.Geom.Line;

   constructor(scene: Game, startX: number, startY: number, endX: number, endY: number, level: number) {
      this.scene = scene;
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.level = level;
      this.line = new Phaser.Geom.Line();
   }

   draw(style, style1): void {
      this.line.x1 = this.startX;
      this.line.y1 = this.startY;
      this.line.x2 = this.endX;
      this.line.y2 = this.endY;
      //this.scene.add.shader();
      if (this.level <= 1) {
         style.strokeLineShape(this.line);
         // this.scene.tweens.add({
         //    targets: style,
         //    duration: 400,
         //    alpha: 0
         // })
      } else {
         style1.strokeLineShape(this.line);
         // this.scene.tweens.add({
         //    targets: style1,
         //    duration: 600,
         //    alpha: 0
         // })
      }

   }

}