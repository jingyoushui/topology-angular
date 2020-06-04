import { s8 } from '../utils/uuid';
import { Point } from './point';
import { Rect } from './rect';
import { pointInRect } from '../utils/canvas';
import { EventType, EventAction } from './event';

import { Store } from 'le5le-store';

export enum PenType {
  Node,
  Line,
}

export abstract class Pen {
  id = '';
  type = PenType.Node;
  name = '';
  tags: string[] = [];
  rect: Rect = new Rect(0, 0, 0, 0);
  lineWidth = 1;
  rotate = 0;
  offsetRotate = 0;
  globalAlpha = 1;

  dash = 0;
  lineDash: number[];
  lineDashOffset: number;
  strokeStyle = '';
  fillStyle = '';
  lineCap: string;
  font = {
    color: '',
    fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
    fontSize: 12,
    lineHeight: 1.5,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    textBaseline: 'middle',
    background: ''
  };

  text: string;
  textMaxLine: number;
  textRect: Rect;
  fullTextRect: Rect;
  textOffsetX: number;
  textOffsetY: number;

  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;

  // animateType仅仅是辅助标识
  animateType: string;
  // Date.getTime
  animateStart: number;
  // Cycle count. Infinite if <= 0.
  animateCycle: number;
  animateCycleIndex = 0;
  nextAnimate: string;
  // Auto-play
  animatePlay: boolean;

  locked: boolean;
  // 作为子节点，是否可以直接点击选中
  stand: boolean;
  hideInput: boolean;
  hideRotateCP: boolean;
  hideSizeCP: boolean;
  hideAnchor: boolean;

  markdown: string;
  // 外部用于提示的dom id
  tipId: string;
  title: string;

  events: { type: EventType; action: EventAction; value: string; params: string; name?: string; }[] = [];
  private eventFns: string[] = ['link', 'doAnimate', 'doFn', 'doWindowFn'];

  parentId: string;
  rectInParent: {
    x: number | string;
    y: number | string;
    width: number | string;
    height: number | string;
    marginTop?: number | string;
    marginRight?: number | string;
    marginBottom?: number | string;
    marginLeft?: number | string;
    rotate: number;
    rect?: Rect;
  };

  paddingTopNum: number;
  paddingBottomNum: number;
  paddingLeftNum: number;
  paddingRightNum: number;

  // User data.
  data: any;

  active: boolean;
  mubanId: string;
  property?: any;
  attribute?: any;
  contain?: string[];
  constructor(json?: any) {
    if (json) {
      this.id = json.id || s8();
      if (json.mubanId) {
        this.mubanId = json.mubanId;
      }
      if(json.contain){
        this.contain = json.contain;
      }
      this.name = json.name || '';
      this.tags = Object.assign([], json.tags);
      if (json.rect) {
        this.rect = new Rect(json.rect.x, json.rect.y, json.rect.width, json.rect.height);
      }
      this.dash = json.dash || 0;
      this.lineDash = json.lineDash;
      this.lineDashOffset = json.lineDashOffset || 0;
      if (json.lineWidth || json.lineWidth === 0) {
        this.lineWidth = json.lineWidth;
      }
      this.strokeStyle = json.strokeStyle || '';
      this.fillStyle = json.fillStyle || '';
      this.lineCap = json.lineCap;
      this.globalAlpha = json.globalAlpha || 1;
      this.rotate = json.rotate || 0;
      this.offsetRotate = json.offsetRotate || 0;
      if (json.font) {
        Object.assign(this.font, json.font);
      }
      this.text = json.text;
      if (json.textMaxLine) {
        this.textMaxLine = +json.textMaxLine || 0;
      }
      this.textOffsetX = json.textOffsetX || 0;
      this.textOffsetY = json.textOffsetY || 0;

      this.shadowColor = json.shadowColor;
      this.shadowBlur = json.shadowBlur;
      this.shadowOffsetX = json.shadowOffsetX;
      this.shadowOffsetY = json.shadowOffsetY;

      this.animateType = json.animateType;
      this.animateCycle = json.animateCycle;
      this.nextAnimate = json.nextAnimate;
      this.animatePlay = json.animatePlay;

      this.locked = json.locked;
      this.stand = json.stand;
      this.hideInput = json.hideInput;
      this.hideRotateCP = json.hideRotateCP;
      this.hideSizeCP = json.hideSizeCP;
      this.hideAnchor = json.hideAnchor;
      this.events = json.events || [];
      this.markdown = json.markdown;
      this.tipId = json.tipId;
      this.title = json.title;

      if (json.rectInParent) {
        this.rectInParent = json.rectInParent;
      }

      if (typeof json.data === 'object') {
        this.data = JSON.parse(JSON.stringify(json.data));
      } else {
        this.data = json.data || '';
      }
    } else {
      this.id = s8();
      this.textOffsetX = 0;
      this.textOffsetY = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if ((this as any).from && !(this as any).to) {
      return;
    }

    ctx.save();

    if (this.rotate || this.offsetRotate) {
      ctx.translate(this.rect.center.x, this.rect.center.y);
      ctx.rotate(((this.rotate + this.offsetRotate) * Math.PI) / 180);
      ctx.translate(-this.rect.center.x, -this.rect.center.y);
    }

    if (this.lineWidth > 1) {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.strokeStyle = this.strokeStyle || '#242424';
    ctx.fillStyle = this.fillStyle || 'transparent';

    if (this.lineCap) {
      ctx.lineCap = this.lineCap as CanvasLineCap;
    }

    if (this.globalAlpha < 1) {
      ctx.globalAlpha = this.globalAlpha;
    }

    if (this.lineDash) {
      ctx.setLineDash(this.lineDash);
    } else {
      switch (this.dash) {
        case 1:
          ctx.setLineDash([5, 5]);
          break;
        case 2:
          ctx.setLineDash([10, 10]);
          break;
        case 3:
          ctx.setLineDash([10, 10, 2, 10]);
          break;
      }
    }
    if (this.lineDashOffset) {
      ctx.lineDashOffset = this.lineDashOffset;
    }

    if (this.shadowColor) {
      ctx.shadowColor = this.shadowColor;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;
      ctx.shadowBlur = this.shadowBlur;
    }

    this.draw(ctx);

    ctx.restore();

    if ((this as any).children) {
      for (const item of (this as any).children) {
        item.render(ctx);
      }
    }
  }

  hit(point: Point, padding = 0) {
    if (this.rotate % 360 === 0) {
      return this.rect.hit(point, padding);
    }

    const pts = this.rect.toPoints();
    for (const pt of pts) {
      pt.rotate(this.rotate, this.rect.center);
    }
    return pointInRect(point, pts);
  }

  click() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.Click) {
        continue;
      }

      this[this.eventFns[item.action]] && this[this.eventFns[item.action]](item.value, item.params);
    }
  }

  dblclick() {
    if (!this.events) {
      return;
    }

    for (const item of this.events) {
      if (item.type !== EventType.DblClick) {
        continue;
      }

      this[this.eventFns[item.action]] && this[this.eventFns[item.action]](item.value, item.params);
    }
  }

  doSocket(item: { type: EventType; action: EventAction; value: string; params: string; name?: string; }, msg: any, socket: WebSocket) {
    if (item.action < EventAction.Function) {
      this[this.eventFns[event.type]](msg.value || msg || item.value, msg.params || item.params, socket);
    } else {
      this[this.eventFns[event.type]](item.value, msg || item.params, socket);
    }
  }

  private link(url: string, params: string) {
    window.open(url, '_blank');
  }

  private doAnimate(tag: string, params: string) {
    Store.set('LT:AnimatePlay', {
      tag,
      pen: this
    });
  }

  private doFn(fn: string, params: string, socket?: WebSocket) {
    let func: Function;
    if (socket) {
      func = new Function('pen', 'params', 'websocket', fn);
    } else {
      func = new Function('pen', 'params', fn);
    }
    func(this, params, socket);
  }

  private doWindowFn(fn: string, params: string, socket?: WebSocket) {
    (window as any)[fn](this, params, socket);
  }

  abstract getTextRect(): Rect;
  abstract calcRectInParent(parent: Pen): void;
  abstract calcRectByParent(parent: Pen): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract animate(now: number): string;
  abstract translate(x: number, y: number): void;
  abstract scale(scale: number, center?: Point): void;
  abstract clone(): Pen;
}
