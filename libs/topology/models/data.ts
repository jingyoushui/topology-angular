import {Node} from './node';
import {Line} from './line';
import {FileTypes, Lock} from './status';

export class TopologyData {
  nodes: Node[] = [];
  lines: Line[] = [];
  lineName = 'curve';
  fromArrowType = '';
  toArrowType = '';
  scale = 1;
  bkImage: string;
  bkColor = '#ffffffff';
  locked = Lock.None;
  // 画布文件的类型
  filetype = FileTypes.Default;
  constructor(json?: any) {
    if (json) {
      this.nodes = [];
      for (const item of json.nodes) {
        this.nodes.push(new Node(item));
      }
      this.lines = [];
      for (const item of json.lines) {
        this.lines.push(new Line(item));
      }
      this.lineName = json.lineName || 'curve';
      this.fromArrowType = json.fromArrowType || '';
      this.toArrowType = json.toArrowType || '';
      this.scale = json.scale || 1;
      this.locked = json.locked || Lock.None;
      this.bkImage = json.bkImage;
      this.bkColor = json.bkColor || '';
      this.filetype = json.filetype || FileTypes.Default;
    }
  }
}
