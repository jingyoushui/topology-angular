import { Node } from '../../../models/node';
import { Point } from '../../../models/point';
import { Direction } from '../../../models/direction';

export function flangeCouplingConnectorAnchors(node: Node) {

  node.anchors.push(new Point(node.rect.x + node.rect.width, node.rect.y + node.rect.height * 7 / 24, Direction.Right));
  node.anchors.push(new Point(node.rect.x , node.rect.y + node.rect.height * 17 / 24, Direction.Left));

}
