import {Node, Rect} from 'topology-core/models';
import {Store} from 'le5le-store';
import {getLines, getWords} from 'topology-core/middles/nodes/text';

export function plugTextRect(node: Node) {
  node.textRect = new Rect(node.rect.x, node.rect.y, 0,0);
  node.fullTextRect = new Rect(node.rect.x, node.rect.y, 0,0);

}
