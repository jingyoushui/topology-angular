import { Store } from 'le5le-store';
import { Options } from './options';
import { Canvas } from './canvas';
import { ActiveLayer } from './activeLayer';
import { HoverLayer } from './hoverLayer';
import { AnimateLayer } from './animateLayer';

export class Offscreen extends Canvas {
  public activeLayer: ActiveLayer = Store.get('LT:ActiveLayer');
  public hoverLayer: HoverLayer = Store.get('LT:HoverLayer');
  public animateLayer: AnimateLayer = Store.get('LT:AnimateLayer');
  constructor(public parentElem: HTMLElement, public options: Options = {}) {
    super(parentElem, options);
    Store.set('LT:offscreen', this.canvas);
  }

  render() {
    super.render();

    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = this.options.color;

    for (const item of this.data.pens) {
      item.render(ctx);
    }
    this.drawFenxianHeFile(ctx,this.canvas.width,this.canvas.height);

    this.activeLayer.render(ctx);
    this.animateLayer.render(ctx);
    this.hoverLayer.render(ctx);
  }
  drawFenxianHeFile(ctx: CanvasRenderingContext2D, width: number, height: number) {
    // const w = width / 3;
    const n = height / 300;
    const m = width / 300;
    const message = 'DERON';
    const message_zh = '德荣工业';

    ctx.strokeStyle = '#ebe9bcff';
    ctx.fillStyle = '#ebe9bcff';
    for (let i = 0; i <n; i++) {
      for (let j=0;j<m;j++){
        ctx.save();
        // 绘制空心文字
        ctx.translate(300 * j + 40 , 300 * i + 50);
        ctx.rotate(35 * Math.PI / 180);
        ctx.font = '20px 微软雅黑';
        ctx.fillText(message, 0, 0);
        ctx.restore();
        ctx.save();
        ctx.translate(300 * j , 300 * i + 60);
        ctx.rotate(35 * Math.PI / 180);
        ctx.font = '30px 微软雅黑';
        ctx.fillText(message_zh, 0, 0);
        ctx.restore();
      }
    }
  }

}
