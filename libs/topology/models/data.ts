import { Pen } from './pen';
import { Node } from './node';
import { Line } from './line';
import {FileTypes, Lock} from './status';

export class TopologyData {
  pens: Pen[] = [];
  lineName = 'curve';
  fromArrowType = '';
  toArrowType = 'triangleSolid';
  scale = 1;
  locked = Lock.None;
  bkImage: string;
  bkColor: string;
  grid?: boolean;
  websocket?: string;
  data?: any;
  // 画布文件的类型
  filetype: number;
  constructor(json?: any) {
    if (json) {
      this.pens = [];
      for (const item of json.pens) {
        if (item.from) {
          this.pens.push(new Line(item));
        } else {
          this.pens.push(new Node(item));
        }
      }
      this.filetype = json.filetype || FileTypes.Default;
      this.lineName = json.lineName || 'curve';
      this.fromArrowType = json.fromArrowType || '';
      this.toArrowType = json.toArrowType || 'triangleSolid';
      this.scale = json.scale || 1;
      this.locked = json.locked || Lock.None;
      this.bkImage = json.bkImage;
      this.bkColor = json.bkColor;
      this.grid = json.grid;
      this.filetype = json.filetype || FileTypes.Default;
      if (typeof json.data === 'object') {
        this.data = JSON.parse(JSON.stringify(json.data));
      } else {
        this.data = json.data || '';
      }
    }
  }
}
