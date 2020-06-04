import {Node, Rect} from 'topology-core/models';
import {Store} from 'le5le-store';
import {getLines, getWords} from 'topology-core/middles/nodes/text';

export function fangshuisaiTextRect(node: Node) {
  const w = node.rect.width / 2;
  node.textRect = new Rect(node.rect.x + w, node.rect.y, w,node.rect.height);
  node.fullTextRect = new Rect(node.rect.x + w, node.rect.y, w,node.rect.height);

}
