import { Node } from 'topology-core/models/node';

export function fenxianheMuban(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();
  const leftarea = 20;
  const toparea = 20;
  const buttonarea = 20;

  const offsetX = (node.rect.width - leftarea) / 3;
  ctx.moveTo(node.rect.x, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.y);
  ctx.lineTo(node.rect.ex, node.rect.ey);
  ctx.lineTo(node.rect.x, node.rect.ey);
  ctx.closePath();

  ctx.moveTo(node.rect.x + leftarea, node.rect.y);
  ctx.lineTo(node.rect.x + leftarea, node.rect.ey);

  ctx.moveTo(node.rect.x + leftarea, node.rect.y + toparea);
  ctx.lineTo(node.rect.ex, node.rect.y + toparea);

  ctx.moveTo(node.rect.x + leftarea + offsetX / 2, node.rect.y);
  ctx.lineTo(node.rect.x + leftarea + offsetX / 2, node.rect.y + toparea);

  ctx.moveTo(node.rect.x + leftarea + offsetX *3/2, node.rect.y);
  ctx.lineTo(node.rect.x + leftarea + offsetX *3/2, node.rect.y + toparea);

  ctx.moveTo(node.rect.x + leftarea + offsetX *5/2, node.rect.y);
  ctx.lineTo(node.rect.x + leftarea + offsetX *5/2, node.rect.y + toparea);

  ctx.moveTo(node.rect.x + offsetX, node.rect.y);
  ctx.lineTo(node.rect.x + offsetX, node.rect.ey);

  ctx.moveTo(node.rect.ex - offsetX, node.rect.y);
  ctx.lineTo(node.rect.ex - offsetX, node.rect.ey);
  ctx.save();

  ctx.font = ' 12px 宋体';
  ctx.fillStyle = 'black';
  ctx.fillText(' 控制系统', node.rect.x + leftarea, node.rect.y + toparea - 5);
  ctx.fillText(' 连接器', node.rect.x + leftarea + offsetX * 1/2, node.rect.y + toparea - 5);
  ctx.fillText(' 智能集线器', node.rect.x + leftarea + offsetX, node.rect.y + toparea - 5);
  ctx.fillText(' 连接器', node.rect.x + leftarea + offsetX * 3/2, node.rect.y + toparea - 5);
  ctx.fillText(' 终端设备', node.rect.x + leftarea + offsetX * 2, node.rect.y + toparea - 5);
  ctx.fillText(' 备注', node.rect.x + leftarea + offsetX * 5/2, node.rect.y + toparea - 5);
  ctx.restore();


  ctx.fill();
  ctx.stroke();
}
