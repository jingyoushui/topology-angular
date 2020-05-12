import { Node } from 'topology-core/models/node';
import { Rect } from 'topology-core/models/rect';

export function fenxianheMubanIconRect(node: Node) {
  node.iconRect = new Rect(0, 0, 0, 0);
}

export function fenxianheMubanTextRect(node: Node) {
  node.textRect = new Rect(
    node.rect.x ,
    node.rect.y,
    20,
    node.rect.height
  );
  node.fullTextRect = node.textRect;
}
