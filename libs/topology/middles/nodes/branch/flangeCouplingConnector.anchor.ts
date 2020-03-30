import { Node } from '../../../models/node';
import { Point } from '../../../models/point';
import { Direction } from '../../../models/direction';

export function flangeCouplingConnectorAnchors(node: Node) {

  node.anchors.push(new Point(node.rect.x + node.rect.width - 5, node.rect.y + node.rect.height * 1 / 5, Direction.Right));

}
