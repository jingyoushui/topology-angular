import { registerNode } from '../topology/middles';
import {Rect} from '../topology/models/rect';
import {imageIconRect} from '../topology/middles/nodes/image.rect';
import {imageTextRect} from '../topology/middles/nodes/image.rect';

import {fenXianHeAnchors} from './fenxianhe';
import {jitingButtonAnchors, jitingButtonRect, jitingButtonTextRect} from './jitingButton';
import {OneToTwoAnchor} from './oneTotwo';
import {flangeCouplingConnectorAnchors} from './flangeCouplingConnector';
import {plug, plugAnchors} from './plug';
import {fenxianheMuban, fenxianheMubanIconRect, fenxianheMubanTextRect} from './fenxianheMuban';

export function register() {
  // 分线盒fenxianhe
  registerNode('fenxianhe', (ctx: CanvasRenderingContext2D, node: Rect) => { },fenXianHeAnchors,  imageIconRect, imageTextRect);
  // 急停按钮
  registerNode('jitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 急停按钮2
  registerNode('jitingButton2', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 吹气中继
  registerNode('zhongji', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // OK/NG显示
  registerNode('OKNG', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 开关
  registerNode('switch', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 一分二接头
  registerNode('OneToTwo', (ctx: CanvasRenderingContext2D, node: Rect) => { },OneToTwoAnchor,  jitingButtonRect, jitingButtonTextRect);
  // 电压上升电磁阀
  registerNode('diancifaUp', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 电压下降电磁阀
  registerNode('diancifaDown', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 法兰式连接器
  registerNode('flangeCouplingConnector', (ctx: CanvasRenderingContext2D, node: Rect) => { },flangeCouplingConnectorAnchors,  imageIconRect, imageTextRect);
  // 电箱
  registerNode('dianxiang', (ctx: CanvasRenderingContext2D, node: Rect) => { },plugAnchors,  imageIconRect, imageTextRect);
  // 默认的塞子
  registerNode('plug', plug,plugAnchors);
  registerNode('leftplug', plug,plugAnchors);

  registerNode('fenxianheMuban', fenxianheMuban, null, fenxianheMubanIconRect, fenxianheMubanTextRect);


}
