import { Node } from 'topology-core/models/node';
import { Point } from 'topology-core/models/point';
import { Direction } from 'topology-core/models/direction';

export function fenXianHeAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x + node.rect.width * 123 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 154 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 185 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 216 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 123 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 154 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 185 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 216 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 1 / 2, Direction.Left));

}
