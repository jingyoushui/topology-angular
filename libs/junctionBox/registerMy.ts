import {registerNode} from 'topology-core/middles';
import {Rect} from 'topology-core/models';
import {jitingButtonAnchors, jitingButtonRect, jitingButtonTextRect} from './jitingButton';


export function registerMy(name) {

  registerNode(name, (ctx: CanvasRenderingContext2D, node: Rect) => { },jitingButtonAnchors,  jitingButtonRect, jitingButtonTextRect);
}

