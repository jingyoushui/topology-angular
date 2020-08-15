import { registerNode , registerArrow} from '../topology/middles';
import {Rect} from '../topology/models/rect';
import {imageIconRect} from '../topology/middles/nodes/image.rect';
import {imageTextRect} from '../topology/middles/nodes/image.rect';

import {fenXianHeAnchors} from './fenxianhe';
import {jitingButtonAnchors, jitingButtonRect, jitingButtonTextRect} from './jitingButton';
import {OneToTwoAnchor} from './oneTotwo';
import {flangeCouplingConnectorAnchors} from './flangeCouplingConnector';
import {plug, plugAnchors} from './plug';
import {fenxianheMuban, fenxianheMubanIconRect, fenxianheMubanTextRect, fenxianheMubanTwo} from './fenxianheMuban';
import {
  interfaceClass,
  interfaceClassIconRect,
  interfaceClassTextRect,
  simpleClass,
  simpleClassIconRect,
  simpleClassTextRect
} from './class';
import {plugTextRect} from './plug/plug.rect';
import {fangshuisai, fangshuisaiAnchors, fangshuisaiTextRect, xianbiaopai} from './fangshuisai';

import {danFenxianheSolid} from './fenxianheArrows/danFenxianhe';
import {danFenxianheFromSolid} from './fenxianheArrows/danFenxianheFrom';
import {danFenxianheWanSolid} from './fenxianheArrows/danFenxianheWan';
import {fenxianheRect, fenxianheTextRect} from './fenxianhe/fenxianhe.rect';

export function register() {
  // 分线盒fenxianhe
  registerNode('fenxianhe', (ctx: CanvasRenderingContext2D, node: Rect) => { },fenXianHeAnchors,  fenxianheRect, fenxianheTextRect);
  // 急停按钮
  registerNode('jitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  //复位按钮
  registerNode('fuweiButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);

  //启动按钮
  registerNode('qidongButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  //启停按钮
  registerNode('qitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  //停止按钮
  registerNode('tingzhiButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);

  //16启停按钮
  registerNode('16qitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);

  //16急停按钮
  registerNode('16jitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  //16双位指示灯
  registerNode('16shuangweiButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 22急停按钮
  registerNode('22jitingButton', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
// M8圆柱形接近传感器
  registerNode('M8yuanzhu', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);

  // M8方形接近传感器
  registerNode('M8fangxing', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // M8对射式光电传感器传感器
  registerNode('M8duishe', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // M8自反式光电传感器
  registerNode('M8zifan', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 活接头
  registerNode('huojietou', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  // 猪尾式接近传感器
  registerNode('zhuwei', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);




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
  registerNode('plug', plug,plugAnchors,null,plugTextRect);
  registerNode('leftplug', plug,plugAnchors,null,plugTextRect);

  // 底层自定义组件
  registerNode('zidingyi', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
  //预留
  registerNode('yuliu', (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);


  registerNode('fenxianheMuban', fenxianheMuban, null, fenxianheMubanIconRect, fenxianheMubanTextRect);
  registerNode('fenxianheMubanTwo', fenxianheMubanTwo, null, fenxianheMubanIconRect, fenxianheMubanTextRect);

  registerNode('simpleClass', simpleClass, null, simpleClassIconRect, simpleClassTextRect);
  registerNode('interfaceClass', interfaceClass, null, interfaceClassIconRect, interfaceClassTextRect);

  registerNode('fangshuisai',fangshuisai,fangshuisaiAnchors,fangshuisaiTextRect);
  registerNode('xianbiaopai',xianbiaopai,fangshuisaiAnchors,fangshuisaiTextRect);

  //航线型，左边接头
  registerNode('hangxian',(ctx: CanvasRenderingContext2D, node: Rect) => { },plugAnchors,imageIconRect,plugTextRect);
  //散线，左边接头
  registerNode('sanxian',(ctx: CanvasRenderingContext2D, node: Rect) => { },plugAnchors,imageIconRect,plugTextRect);

  registerArrow('danFenxianheSolid',danFenxianheSolid);
  registerArrow('danFenxianheFromSolid',danFenxianheFromSolid);
  registerArrow('danFenxianheWanSolid',danFenxianheWanSolid);

}
