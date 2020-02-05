import { Point } from '../../models/point';

export function tou1Solid(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  size?: number,
  fillStyle?: string
) {
  size += ctx.lineWidth * 3;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  ctx.translate(-to.x , -to.y - ctx.lineWidth / 10);
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(to.x, to.y - size / 5);
  ctx.lineTo(to.x - size / 4, to.y - size / 5);
  ctx.lineTo(to.x - size / 4, to.y + size / 5);
  ctx.lineTo(to.x, to.y + size / 5);
  ctx.closePath();
  ctx.moveTo(to.x - size / 4 , to.y);
  ctx.lineTo(to.x - size / 4 , to.y - size / 2);
  ctx.lineTo(to.x - size / 2, to.y - size / 2);
  ctx.lineTo(to.x - size / 2, to.y + size / 2);
  ctx.lineTo(to.x - size / 4, to.y + size / 2);
  ctx.closePath();
  ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }

  ctx.fill();
}

export function tou1(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  tou1Solid(ctx, from, to, size, '#fff');
}
