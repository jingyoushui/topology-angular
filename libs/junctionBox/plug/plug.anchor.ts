import { Node } from 'topology-core/models/node';
import { Point } from 'topology-core/models/point';
import { Direction } from 'topology-core/models/direction';

export function plugAnchors(node: Node) {

  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 1 / 2, Direction.Left));
  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height * 1 / 2, Direction.Right));

}
