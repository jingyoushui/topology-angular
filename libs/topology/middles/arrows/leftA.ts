import { Point } from '../../models/point';

export function leftASolid(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, fillStyle?: string) {
  size += ctx.lineWidth * 3;
  const r = size / 2;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  const img = new Image();
  img.src = 'assets/img/tools/leftA.png';
  img.crossOrigin = 'anonymous';
  ctx.drawImage(img, 0 - 28 , 0 - 4);
  ctx.stroke();
  // ctx.rotate(90 * Math.PI / 180 );
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function image(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  leftASolid(ctx, from, to, size, '#fff');
}
