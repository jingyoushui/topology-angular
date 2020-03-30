import { Node } from '../../../models/node';
import { Point } from '../../../models/point';
import { Direction } from '../../../models/direction';

export function fenXianHeAnchors(node: Node) {
  node.anchors.push(new Point(node.rect.x + node.rect.width * 107 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 138 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 170 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 200 / 230, node.rect.y, Direction.Up));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 107 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 138 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 170 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x + node.rect.width * 200 / 230, node.rect.y + node.rect.height, Direction.Bottom));
  node.anchors.push(new Point(node.rect.x, node.rect.y + node.rect.height * 1 / 2, Direction.Left));

}
