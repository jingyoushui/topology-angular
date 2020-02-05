import { Point } from '../../models/point';

export function imageSolid(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, fillStyle?: string) {
  size += ctx.lineWidth * 3;
  const r = size / 2;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  const img = new Image();
  img.src = 'http://localhost:3200/assets/img/tools/xiantou.png';
  ctx.drawImage(img, 0 - 20, 0 - 8);
  ctx.stroke();
  // ctx.rotate(90 * Math.PI / 180 );
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function image(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  imageSolid(ctx, from, to, size, '#fff');
}
