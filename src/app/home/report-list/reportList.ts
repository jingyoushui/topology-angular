import {ReportListNode} from './reportListNode';

// 这个类是生成的报目表中的节点和线
export class ReportList {
  muban_id: number;
  muban_name: string;
  report_nodes: ReportListNode[] = [];

  constructor(id: number, name: string) {
    this.muban_id = id;
    this.muban_name = name;

  }

}
