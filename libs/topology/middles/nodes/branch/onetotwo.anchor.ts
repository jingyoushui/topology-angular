import { Node } from '../../../models/node';
import { Point } from '../../../models/point';
import { Direction } from '../../../models/direction';

export function OneToTwoAnchor(node: Node) {

  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 1 / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height * 1 / 6, Direction.Right));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height * 7 / 9, Direction.Right));

}
