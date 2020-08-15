import { Node } from 'topology-core/models/node';
import { Rect } from 'topology-core/models/rect';
import { getLines, getWords } from 'topology-core/middles/nodes/text';
import { Store } from 'le5le-store';

const txtMarginTop = 5;
const minSize = 30;

export function fenxianheRect(node: Node) {
  const x = node.rect.x;
  const y = node.rect.y;
  let width = node.rect.width;
  if (node.imageWidth) {
    width = node.imageWidth;
  }

  // let height = node.rect.height - node.textRect.height - txtMarginTop;
  // if (height < minSize) {
  //   height = minSize;
  // }
  const height = node.rect.height;
  node.iconRect = new Rect(x, y, width, height);
  node.textRect.y = node.iconRect.y ;
  node.textRect.ey = node.textRect.y + node.textRect.height;
  node.fullIconRect = node.rect;
}

export function fenxianheTextRect(node: Node) {

  const imgWidth = getImgWidth(node);

  node.textRect = new Rect(node.rect.x + imgWidth + 8, node.rect.y, 100, 20);
  node.fullTextRect = node.rect;
}



function getImgHeight(node: Node) {
  let imgHeight = minSize;
  if (node.image) {
    if (node.imageHeight > 0) {
      imgHeight = node.imageHeight;
    }
  } else if (node.icon) {
    if (node.iconSize > 0) {
      imgHeight = node.iconSize;
    }
  }

  return imgHeight;
}

function getImgWidth(node: Node) {
  let imgWidth = minSize;
  if (node.image) {
    if (node.imageWidth > 0) {
      imgWidth = node.imageWidth;
    }
  } else if (node.icon) {
    if (node.iconSize > 0) {
      imgWidth = node.iconSize;
    }
  }

  return imgWidth;
}
