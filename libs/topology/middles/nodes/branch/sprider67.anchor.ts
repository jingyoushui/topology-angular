import { Node } from '../../../models/node';
import { Point } from '../../../models/point';
import { Direction } from '../../../models/direction';

export function sprider67Anchors(node: Node) {
  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height  * 5 / 19, Direction.Right));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height  * 7 / 19, Direction.Right));

  node.anchors.push(new Point(node.rect.x + node.rect.width / 2, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 7 / 19, Direction.Left));
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 5 / 19, Direction.Left));


}
