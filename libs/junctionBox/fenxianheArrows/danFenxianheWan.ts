import { Point } from 'topology-core/models/point';

export function danFenxianheWanSolid(
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
  ctx.translate(-to.x - ctx.lineWidth, -to.y);

  const x = to.x;
  const y = to.y;

  ctx.moveTo(x+1,y-8);
  ctx.lineTo(x+1,y-12);
  ctx.lineTo(x-7,y-12);
  ctx.lineTo(x-7,y-8);
  ctx.closePath();
  ctx.save();
  ctx.fillStyle = '#747171ff';
  ctx.fill();
  ctx.restore();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x,y-8);
  ctx.lineTo(x-6,y-8);
  ctx.lineTo(x-6,y+4);
  ctx.lineTo(x,y+4);
  ctx.fill();
  ctx.closePath();



  ctx.beginPath();
  ctx.moveTo(x-4,y-3.5);
  ctx.lineTo(x-20,y-3.5);
  ctx.lineTo(x-20,y+3.5);
  ctx.lineTo(x-4,y+3.5);
  ctx.fill();
  ctx.closePath();


  ctx.moveTo(x-20,y-1.5);
  ctx.lineTo(x-25,y-1.5);
  ctx.lineTo(x-25,y+1.5);
  ctx.lineTo(x-20,y+1.5);
  ctx.fill();
  ctx.closePath();



  ctx.closePath();
  // ctx.stroke();
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function danFenxianheWan(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  danFenxianheWanSolid(ctx, from, to, size, '#fff');
}
