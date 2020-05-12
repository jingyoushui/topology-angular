import { Node } from 'topology-core/models/node';
import { Rect } from 'topology-core/models/rect';
import { getLines, getWords } from 'topology-core/middles/nodes/text';
import { Store } from 'le5le-store';

const txtMarginTop = 5;
const minSize = 30;

export function jitingButtonRect(node: Node) {
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

export function jitingButtonTextRect(node: Node) {
  let height = 0;
  const lineHeight = node.font.fontSize * node.font.lineHeight;
  const l = getWords(node.text);
  if (node.textMaxLine) {
    height = lineHeight * node.textMaxLine;
  } else {
    const canvas = Store.get('LT:offscreen');
    const lines = getLines(canvas.getContext('2d'), l, node.rect.width);
    height = lineHeight * lines.length;
  }

  let top = node.rect.ey - height;
  const imgHeight = getImgHeight(node);
  if (top - imgHeight - txtMarginTop < node.rect.y) {
    top = node.rect.y + imgHeight + txtMarginTop;
  }
  // node.textRect = new Rect(node.rect.x, top, node.rect.width, height);

  const imgWidth = getImgWidth(node);

  // if (l.length)
  const nodeW = (l.length + 1) * node.font.fontSize + imgWidth;
  if (nodeW < 70) {
    node.rect.width = 70;
  } else if (nodeW > 400) {
    node.rect.width = 400;
  } else {
    node.rect.width = nodeW;
  }

  node.textRect = new Rect(node.rect.x + imgWidth + 3, node.rect.y, node.rect.width - imgWidth, imgHeight);
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
