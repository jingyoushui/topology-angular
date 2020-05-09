import {Store} from 'le5le-store';
import {Options} from './options';
import {Canvas} from './canvas';
import {ActiveLayer} from './activeLayer';
import {HoverLayer} from './hoverLayer';
import {AnimateLayer} from './animateLayer';
import {FileTypes} from './models/status';


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
    if (this.data.filetype === FileTypes.Fenxianhe) {
      this.drawFenxianHeFile(ctx, this.width, this.height);
    }
    this.renderNodes();
    this.renderLines();
    this.activeLayer.render(ctx);
    this.animateLayer.render(ctx);
    this.hoverLayer.render(ctx);
  }
  drawFenxianHeFile(ctx: CanvasRenderingContext2D, width: number, height: number) {
    // const w = width / 3;
    const w = 500;
    const n = height / 450;
    const top_y = 30;
    const h = 450;
    const h1 = 440;
    for (let i = 0; i < n; i++) {

      ctx.fillStyle = '#E9E9EE';
      ctx.fillRect(0, top_y + h * i , w, h1);

      ctx.save();
      const message = '德荣工业';
      // 绘制空心文字
      ctx.font = '60px 微软雅黑';
      ctx.strokeStyle = '#ca9a06ff';
      ctx.translate(160 , 200 + h * i);
      ctx.rotate(35 * Math.PI / 180);
      ctx.strokeText(message, 0, 0);
      ctx.restore();


      ctx.fillStyle = '#F3F3F3';
      ctx.fillRect(w, top_y + h * i, w , h1);


      ctx.save();
      // 绘制空心文字
      ctx.font = '60px 微软雅黑';
      ctx.strokeStyle = '#ca9a06ff';
      ctx.translate(160 + w , 200 + h * i);
      ctx.rotate(35 * Math.PI / 180);
      ctx.strokeText(message, 0, 0);
      ctx.restore();


      ctx.fillStyle = '#E9E9E9';
      ctx.fillRect(2 * w, top_y + h * i, width - 2 * w, h1);

      ctx.save();
      // 绘制空心文字
      ctx.font = '60px 微软雅黑';
      ctx.strokeStyle = '#ca9a06ff';
      ctx.translate(160 + 2 * w , 200 + h * i);
      ctx.rotate(35 * Math.PI / 180);
      ctx.strokeText(message, 0, 0);
      ctx.restore();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, top_y + h1 + h * i, width, 10);

      ctx.save();
      ctx.font = 'bold 15px 宋体';
      ctx.fillStyle = 'black';
      ctx.fillText('附件：', w + 10, top_y + h * i + 400);
      ctx.fillText('号码牌：', w + 60, top_y + h * i + 400);
      ctx.fillText('板(10个/板)', w + 170, top_y + h * i + 400);
      ctx.fillText('线标牌：', w + 280, top_y + h * i + 400);
      ctx.fillText('包(16个/包)', w + 400, top_y + h * i + 400);
      ctx.restore();


    }
  }
  renderNodes() {
    if (!this.data.nodes.length) {
      return;
    }

    const ctx = this.canvas.getContext('2d');
    for (const item of this.data.nodes) {
      item.render(ctx);
    }
  }

  renderLines() {
    if (!this.data.lines.length) {
      return;
    }

    const ctx = this.canvas.getContext('2d');
    let i = 0;
    for (const item of this.data.lines) {
      if (!item.to) {
        this.data.lines.splice(i++, 1);
        continue;
      }
      item.render(ctx);
      ++i;
    }
  }
}
