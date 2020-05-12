import { Point } from 'topology-core/models/point';

export function rightASolid(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, fillStyle?: string) {
  size += ctx.lineWidth * 3;
  const r = size / 2;
  if (ctx.lineWidth < 2) {
    ctx.lineWidth = 2;
  }
  ctx.translate(to.x, to.y);
  ctx.rotate(Math.atan2(to.y - from.y, to.x - from.x));
  const img = new Image();
  img.src = 'assets/img/tools/rightA.png';
  // img.setAttribute('crossorigin', 'anonymous'); // 注意设置图片跨域应该在图片加载之前
  img.crossOrigin = 'anonymous';
  ctx.drawImage(img, 0 - 35 , 0 - 6);
  ctx.stroke();
  // ctx.rotate(90 * Math.PI / 180 );
  if (fillStyle) {
    ctx.fillStyle = fillStyle;
  }
  ctx.fill();
}

export function rightAimage(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  rightASolid(ctx, from, to, size, '#fff');
}
