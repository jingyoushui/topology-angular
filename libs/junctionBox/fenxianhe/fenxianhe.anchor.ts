import { Node } from 'topology-core/models/node';
import { Point } from 'topology-core/models/point';
import { Direction } from 'topology-core/models/direction';

export function fenXianHeAnchors(node: Node) {
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 123 / 230, node.iconRect.y, Direction.Up));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 154 / 230, node.iconRect.y, Direction.Up));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 185 / 230, node.iconRect.y, Direction.Up));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 216 / 230, node.iconRect.y, Direction.Up));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 123 / 230, node.iconRect.y + node.iconRect.height, Direction.Bottom));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 154 / 230, node.iconRect.y + node.iconRect.height, Direction.Bottom));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 185 / 230, node.iconRect.y + node.iconRect.height, Direction.Bottom));
  node.anchors.push(new Point(node.iconRect.x + node.iconRect.width * 216 / 230, node.iconRect.y + node.iconRect.height, Direction.Bottom));
  node.anchors.push(new Point(node.iconRect.x, node.iconRect.y + node.iconRect.height * 1 / 2, Direction.Left));

}
