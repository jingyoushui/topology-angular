import { Node } from 'topology-core/models/node';

export function xianbiaopai(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.lineTo(node.rect.x, node.rect.ey);
  ctx.closePath();
  ctx.save();
  ctx.font = ' 12px 宋体';
  ctx.fillStyle = 'black';
  ctx.fillText('线标牌：', node.rect.x + 10 , node.rect.y + 15);
  ctx.restore();
  ctx.fill();
  ctx.stroke();
}
