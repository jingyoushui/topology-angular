import { Rect } from '../models/rect';
import { Point } from '../models/point';
import { Node } from '../models/node';
import { Line } from '../models/line';
import { rectangle } from './nodes/rectangle';
import { circle } from './nodes/circle';
import { triangle } from './nodes/triangle';
import { diamond } from './nodes/diamond';
import { leftArrow, rightArrow, twowayArrow } from './nodes/arrow';
import { text } from './nodes/text';
import {label} from './nodes/label';
import { line as nodeLine } from './nodes/line';
import { triangleAnchors } from './nodes/triangle.anchor';
import { arrowAnchors } from './nodes/arrow.anchor';
import { lineAnchors } from './nodes/line.anchor';
import { circleIconRect, circleTextRect } from './nodes/circle.rect';
import { triangleIconRect, triangleTextRect } from './nodes/triangle.rect';
import { diamondIconRect, diamondTextRect } from './nodes/diamond.rect';
import {
  twowayArrowIconRect,
  twowayArrowTextRect,
  leftArrowIconRect,
  leftArrowTextRect,
  rightArrowIconRect,
  rightArrowTextRect
} from './nodes/arrow.rect';
import { lineIconRect, lineTextRect } from './nodes/line.rect';
import { line, lineControlPoints, calcLineControlPoints } from './lines/line';
import {
  polyline,
  polylineControlPoints,
  pointInPolyline,
  calcPolylineControlPoints,
  dockPolylineControlPoint
} from './lines/polyline';
import { curve, curveControlPoints, pointInCurve, calcCurveControlPoints, calcMindControlPoints } from './lines/curve';
import { triangleSolid, triangle as arrowTriangle } from './arrows/triangle';
import { diamondSolid, diamond as arrowDiamond } from './arrows/diamond';
import { circleSolid, circle as arrowCircle } from './arrows/circle';
import {leftASolid} from './arrows/leftA';
import {rightASolid} from './arrows/rightA';
import {rightBSolid} from './arrows/rightB';

import { circleAnchors } from './nodes/circle.anchor';
import { lineUp, lineDown, line as arrowLine } from './arrows/line';
import { pentagon } from './nodes/pentagon';
import { pentagonIconRect, pentagonTextRect } from './nodes/pentagon.rect';
import { pentagonAnchors } from './nodes/pentagon.anchor';
import { hexagon } from './nodes/hexagon';
import { hexagonAnchors } from './nodes/hexagon.anchor';
import { hexagonIconRect, hexagonTextRect } from './nodes/hexagon.rect';
import { pentagram } from './nodes/pentagram';
import { pentagramAnchors } from './nodes/pentagram.anchor';
import { pentagramIconRect, pentagramTextRect } from './nodes/pentagram.rect';
import { cloud } from './nodes/cloud';
import { cloudAnchors } from './nodes/cloud.anchor';
import { cloudIconRect, cloudTextRect } from './nodes/cloud.rect';
import { message } from './nodes/message';
import { messageIconRect, messageTextRect } from './nodes/message.rect';
import { messageAnchors } from './nodes/message.anchor';
import { file } from './nodes/file';
import { imageIconRect, imageTextRect } from './nodes/image.rect';

import {fenXianHeAnchors} from './nodes/branch/fenxianhe.anchor';
import {jitingButtonAnchors} from './nodes/branch/jitingButton.anchor';
import {jitingButtonRect, jitingButtonTextRect} from './nodes/branch/jitingButton.rect';
import {flangeCouplingConnectorAnchors} from './nodes/branch/flangeCouplingConnector.anchor';
import {plug} from './nodes/branch/plug';
import {plugAnchors} from './nodes/branch/plug.anchor';
import {OneToTwoAnchor} from './nodes/branch/onetotwo.anchor';

import { cube } from './nodes/cube';
import { cubeAnchors } from './nodes/cube.anchor';
import { cubeIconRect, cubeTextRect } from './nodes/cube.rect';
import { people } from './nodes/people';
import { peopleIconRect, peopleTextRect } from './nodes/people.rect';

// Functions of drawing a node.
export const drawNodeFns: any = {};
// Calc the occupy rect of icon.
export const iconRectFns: any = {};
// Calc the occupy rect of text.
export const textRectFns: any = {};
// Calc the anchors of node.
export const anchorsFns: any = {};

// Functions of drawing a line.
export const drawLineFns: any = {};

// Functions of drawing a arrow.
export const drawArrowFns: any = {};

function init() {
  console.log('Init middles.');

  // ********Default nodes.*******
  // Combine
  drawNodeFns.combine = rectangle;

  // Div
  drawNodeFns.div = rectangle;

  // Rectangle
  drawNodeFns.rectangle = rectangle;

  // Ciricle
  drawNodeFns.circle = circle;
  iconRectFns.circle = circleIconRect;
  textRectFns.circle = circleTextRect;
  anchorsFns.circle = circleAnchors;

  // Triangle
  drawNodeFns.triangle = triangle;
  anchorsFns.triangle = triangleAnchors;
  iconRectFns.triangle = triangleIconRect;
  textRectFns.triangle = triangleTextRect;

  // Diamond
  drawNodeFns.diamond = diamond;
  iconRectFns.diamond = diamondIconRect;
  textRectFns.diamond = diamondTextRect;

  // Hexagon
  drawNodeFns.hexagon = hexagon;
  iconRectFns.hexagon = hexagonIconRect;
  textRectFns.hexagon = hexagonTextRect;
  anchorsFns.hexagon = hexagonAnchors;

  // Pentagon
  drawNodeFns.pentagon = pentagon;
  iconRectFns.pentagon = pentagonIconRect;
  textRectFns.pentagon = pentagonTextRect;
  anchorsFns.pentagon = pentagonAnchors;

  // Pentagram
  drawNodeFns.pentagram = pentagram;
  iconRectFns.pentagram = pentagramIconRect;
  textRectFns.pentagram = pentagramTextRect;
  anchorsFns.pentagram = pentagramAnchors;

  // Left arrow
  drawNodeFns.leftArrow = leftArrow;
  anchorsFns.leftArrow = arrowAnchors;
  iconRectFns.leftArrow = leftArrowIconRect;
  textRectFns.leftArrow = leftArrowTextRect;

  // Right arrow
  drawNodeFns.rightArrow = rightArrow;
  anchorsFns.rightArrow = arrowAnchors;
  iconRectFns.rightArrow = rightArrowIconRect;
  textRectFns.rightArrow = rightArrowTextRect;

  // Two-way arrow
  drawNodeFns.twowayArrow = twowayArrow;
  anchorsFns.twowayArrow = arrowAnchors;
  iconRectFns.twowayArrow = twowayArrowIconRect;
  textRectFns.twowayArrow = twowayArrowTextRect;

  // Cloud
  drawNodeFns.cloud = cloud;
  anchorsFns.cloud = cloudAnchors;
  iconRectFns.cloud = cloudIconRect;
  textRectFns.cloud = cloudTextRect;

  // Message
  drawNodeFns.message = message;
  anchorsFns.message = messageAnchors;
  iconRectFns.message = messageIconRect;
  textRectFns.message = messageTextRect;

  // File
  drawNodeFns.file = file;

  // Text
  drawNodeFns.text = text;
  iconRectFns.text = lineIconRect;
  anchorsFns.text = (node: Rect) => { };

  // label
  drawNodeFns.label = label;
  anchorsFns.label = (node: Rect) => { };

  // Line
  drawNodeFns.line = nodeLine;
  anchorsFns.line = lineAnchors;
  iconRectFns.line = lineIconRect;
  textRectFns.line = lineTextRect;

  // Image
  drawNodeFns.image = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.image = imageIconRect;
  textRectFns.image = imageTextRect;

  // // branchbox
  // drawNodeFns.branchbox = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  // iconRectFns.branchbox = imageIconRect;
  // textRectFns.branchbox = imageTextRect;
  // anchorsFns.branchbox = branchboxAnchors;

  // 分线盒fenxianhe
  drawNodeFns.fenxianhe = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.fenxianhe = imageIconRect;
  textRectFns.fenxianhe = imageTextRect;
  anchorsFns.fenxianhe = fenXianHeAnchors;

  // 急停按钮
  drawNodeFns.jitingButton = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.jitingButton = jitingButtonRect;
  textRectFns.jitingButton = jitingButtonTextRect;
  anchorsFns.jitingButton = jitingButtonAnchors;

  // 急停按钮2
  drawNodeFns.jitingButton2 = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.jitingButton2 = jitingButtonRect;
  textRectFns.jitingButton2 = jitingButtonTextRect;
  anchorsFns.jitingButton2 = jitingButtonAnchors;

  // 吹气中继
  drawNodeFns.zhongji = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.zhongji = jitingButtonRect;
  textRectFns.zhongji = jitingButtonTextRect;
  anchorsFns.zhongji = jitingButtonAnchors;

  // OK/NG显示
  drawNodeFns.OKNG = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.OKNG = jitingButtonRect;
  textRectFns.OKNG = jitingButtonTextRect;
  anchorsFns.OKNG = jitingButtonAnchors;

  // 开关
  drawNodeFns.switch = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.switch = jitingButtonRect;
  textRectFns.switch = jitingButtonTextRect;
  anchorsFns.switch = jitingButtonAnchors;

  // 一分二接头
  drawNodeFns.OneToTwo = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.OneToTwo = jitingButtonRect;
  textRectFns.OneToTwo = jitingButtonTextRect;
  anchorsFns.OneToTwo = OneToTwoAnchor;

  // 电压上升电磁阀
  drawNodeFns.diancifaUp = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.diancifaUp = jitingButtonRect;
  textRectFns.diancifaUp = jitingButtonTextRect;
  anchorsFns.diancifaUp = jitingButtonAnchors;

  // 电压下降电磁阀
  drawNodeFns.diancifaDown = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.diancifaDown = jitingButtonRect;
  textRectFns.diancifaDown = jitingButtonTextRect;
  anchorsFns.diancifaDown = jitingButtonAnchors;

  // 法兰式连接器
  drawNodeFns.flangeCouplingConnector = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.flangeCouplingConnector = imageIconRect;
  textRectFns.flangeCouplingConnector = imageTextRect;
  anchorsFns.flangeCouplingConnector = flangeCouplingConnectorAnchors;
// 电箱
  drawNodeFns.dianxiang = (ctx: CanvasRenderingContext2D, node: Rect) => { };
  iconRectFns.dianxiang = imageIconRect;
  textRectFns.dianxiang = imageTextRect;
  anchorsFns.dianxiang = plugAnchors;
  // 默认的塞子
  drawNodeFns.plug = plug;
  anchorsFns.plug = plugAnchors;
// 默认的塞子
  drawNodeFns.leftplug = plug;
  anchorsFns.leftplug = plugAnchors;

  // Cube
  drawNodeFns.cube = cube;
  anchorsFns.cube = cubeAnchors;
  iconRectFns.cube = cubeIconRect;
  textRectFns.cube = cubeTextRect;

  // Cube
  drawNodeFns.people = people;
  iconRectFns.people = peopleIconRect;
  textRectFns.people = peopleTextRect;
  // ********end********

  // ********Default lines.*******
  drawLineFns.line = {
    drawFn: line,
    drawControlPointsFn: lineControlPoints,
    controlPointsFn: calcLineControlPoints,
    pointIn: pointInPolyline
  };
  drawLineFns.polyline = {
    drawFn: polyline,
    drawControlPointsFn: polylineControlPoints,
    controlPointsFn: calcPolylineControlPoints,
    dockControlPointFn: dockPolylineControlPoint,
    pointIn: pointInPolyline
  };
  drawLineFns.curve = {
    drawFn: curve,
    drawControlPointsFn: curveControlPoints,
    controlPointsFn: calcCurveControlPoints,
    pointIn: pointInCurve
  };
  drawLineFns.mind = {
    drawFn: curve,
    drawControlPointsFn: curveControlPoints,
    controlPointsFn: calcMindControlPoints,
    pointIn: pointInCurve
  };
  // ********end********

  // ********Default nodes.*******
  drawArrowFns.triangleSolid = triangleSolid;
  drawArrowFns.triangle = arrowTriangle;

  drawArrowFns.diamondSolid = diamondSolid;
  drawArrowFns.diamond = arrowDiamond;

  drawArrowFns.circleSolid = circleSolid;
  drawArrowFns.circle = arrowCircle;

  drawArrowFns.leftASolid = leftASolid;
  drawArrowFns.rightASolid = rightASolid;
  drawArrowFns.rightBSolid = rightBSolid;

  drawArrowFns.line = arrowLine;
  drawArrowFns.lineUp = lineUp;
  drawArrowFns.lineDown = lineDown;

  // ********end********
}
init();

// registerNode: Register a custom node.
// name - The name of node.
// drawFn - How to draw.
// anchorsFn - How to get the anchors.
// iconRectFn - How to get the icon rect.
// textRectFn - How to get the text rect.
// force - Overwirte the node if exists.
export function registerNode(
  name: string,
  drawFn: (ctx: CanvasRenderingContext2D, node: Node) => void,
  anchorsFn?: (node: Node) => void,
  iconRectFn?: (node: Node) => void,
  textRectFn?: (node: Node) => void,
  force?: boolean
) {
  // Exist
  if (drawNodeFns[name] && !force) {
    return false;
  }

  drawNodeFns[name] = drawFn;
  anchorsFns[name] = anchorsFn;
  iconRectFns[name] = iconRectFn;
  textRectFns[name] = textRectFn;

  return true;
}

// registerLine: Register a custom line.
// name - The name of line.
// drawFn - How to draw.
// drawControlPointsFn - Draw the control points.
// controlPointsFn - How to get the controlPoints.
// dockControlPointFn - Dock a point to horizontal/vertial or related position.
// force - Overwirte the node if exists.
export function registerLine(
  name: string,
  drawFn: (ctx: CanvasRenderingContext2D, line: Line) => void,
  drawControlPointsFn?: (ctx: CanvasRenderingContext2D, line: Line) => void,
  controlPointsFn?: (line: Line) => void,
  dockControlPointFn?: (point: Point, line: Line) => void,
  pointInFn?: (point: Point, line: Line) => boolean,
  force?: boolean
) {
  // Exist
  if (drawLineFns[name] && !force) {
    return false;
  }

  drawLineFns[name] = {
    drawFn: drawFn,
    drawControlPointsFn: drawControlPointsFn,
    controlPointsFn: controlPointsFn,
    dockControlPointFn: dockControlPointFn,
    pointIn: pointInFn
  };
  return true;
}

// registerArrow: Register a custom arrow.
// name - the name of arrow.
// drawFn - how to draw.
// force - Overwirte the node if exists.
export function registerArrow(
  name: string,
  drawFn: (ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) => void,
  force?: boolean
) {
  // Exist
  if (drawArrowFns[name] && !force) {
    return false;
  }

  drawArrowFns[name] = drawFn;
  return true;
}
