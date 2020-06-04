import { Point } from 'topology-core/models/point';

export function danFenxianheFromSolid(
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
  ctx.translate(-to.x, -to.y);

  const x = to.x;
  const y = to.y;
  ctx.moveTo(x,y);
  ctx.lineTo(x,y-2.5);
  ctx.lineTo(x-4,y-2.5);
  ctx.lineTo(x-4,y+2.5);
  ctx.lineTo(x,y+2.5);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = '#747171ff';
  ctx.fill();
  ctx.restore();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x-4,y-2.5);
  ctx.lineTo(x-20,y-2.5);
  ctx.lineTo(x-20,y+2.5);
  ctx.lineTo(x-4,y+2.5);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x-20,y-1.5);
  ctx.lineTo(x-25,y-1.5);
  ctx.lineTo(x-25,y+1.5);
  ctx.lineTo(x-20,y+1.5);
  ctx.fillStyle = '#332f2fff';
  ctx.fill();
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

}

export function danFenxianheFrom(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  danFenxianheFromSolid(ctx, from, to, size, '#fff');
}
