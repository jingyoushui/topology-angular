import { Store } from 'le5le-store';
import { Options } from './options';
import { Canvas } from './canvas';
import {ActiveLayer} from './activeLayer';
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


    const w = this.width / 3;
    const n = this.height / 500;
    const h = 500;
    const h1 = 490;
    for (let i = 0; i < n; i++) {

      ctx.fillStyle = '#E9E9EE';
      ctx.fillRect(0, 25 + h * i , w, h1);
      ctx.fillStyle = '#F3F3F3';
      ctx.fillRect(w, 25 + h * i, w , h1);
      ctx.fillStyle = '#E9E9E9';
      ctx.fillRect(2 * w, 25 + h * i, w, h1);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 25 + h1 + h * i, 3 * w, 10);
    }

    this.renderNodes();
    this.renderLines();
    this.activeLayer.render(ctx);
    this.animateLayer.render(ctx);
    this.hoverLayer.render(ctx);
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
