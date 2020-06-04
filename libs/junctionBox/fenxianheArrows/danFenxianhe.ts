import { Point } from 'topology-core/models/point';

export function danFenxianheSolid(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  size?: number,
  fillStyle?: string
) {
  size += ctx.lineWidth * 5;
  let arrowWidth = ctx.lineWidth / 10;
  if (ctx.lineWidth < 4) {
    ctx.lineWidth = 4;
    arrowWidth = 0;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  ctx.translate(-to.x - ctx.lineWidth + arrowWidth * 3, -to.y);

  const x = to.x;
  const y = to.y;
  ctx.moveTo(x,y);
  ctx.lineTo(x,y-4);
  ctx.lineTo(x-2,y-4);
  ctx.lineTo(x-2,y+4);
  ctx.lineTo(x,y+4);
  ctx.closePath();

  ctx.moveTo(x-2,y-2);
  ctx.lineTo(x-4,y-2);
  ctx.lineTo(x-4,y+2);
  ctx.lineTo(x-2,y+2);
  ctx.closePath();

  ctx.moveTo(x-4,y-3.5);
  ctx.lineTo(x-20,y-3.5);
  ctx.lineTo(x-20,y+3.5);
  ctx.lineTo(x-4,y+3.5);
  ctx.closePath();

  ctx.moveTo(x-20,y-1.5);
  ctx.lineTo(x-25,y-1.5);
  ctx.lineTo(x-25,y+1.5);
  ctx.lineTo(x-20,y+1.5);
  ctx.closePath();


  // ctx.moveTo(to.x, to.y + arrowWidth);
  // ctx.lineTo(to.x, to.y - arrowWidth);
  // ctx.lineTo(to.x - size, to.y - size / 3);
  // ctx.lineTo(to.x - size, to.y + size / 3);

  // ctx.lineTo()
  ctx.closePath();
  // ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function danFenxianhe(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  danFenxianheSolid(ctx, from, to, size, '#fff');
}
