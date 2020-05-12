import { Point } from 'topology-core/models/point';

export function rightBSolid(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, fillStyle?: string) {
  size += ctx.lineWidth * 3;
  const r = size / 2;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  const img = new Image();
  // img.src = 'http://localhost:3200/assets/img/tools/rightB.png';
  img.src = 'assets/img/tools/rightB.png'
  img.crossOrigin = 'anonymous';
  ctx.drawImage(img, 0 - 30 , 0 - 14);
  ctx.stroke();
  // ctx.rotate(90 * Math.PI / 180 );
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function rightBimage(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  rightBSolid(ctx, from, to, size, '#fff');
}
