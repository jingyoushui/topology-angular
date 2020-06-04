import {ReportListNode} from './reportListNode';

// 这个类是生成的报目表中的节点和线
export class ReportList {
  id: string;
  muban_name: string;
  report_nodes: ReportListNode[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.muban_name = name;

  }

}
