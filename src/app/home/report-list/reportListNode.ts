
// 这个类是生成的报目表中的节点和线
export class ReportListNode {
  node_id: string;
  node_name: string;
  node_type: string;
  remarks: string;

  constructor(id: string,  name: string,  type: string, remark?: string ) {
    this.node_id = id;
    this.node_name = name;
    this.node_type = type;
    this.remarks = remark;

  }

}
