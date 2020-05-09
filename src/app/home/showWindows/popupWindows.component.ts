import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tools} from '../tools/config';

@Component({
  selector: 'app-windows',
  templateUrl: './popupWindows.component.html',
  styleUrls: ['./popupWindows.component.scss'],
})
export class PopupWindowsComponent implements OnInit {
  @Input()
  plug_type: string;
  @Input()
  jixing: any;
  @Input()
  leixing: any;
  @Input()
  xianzhi: any;
  @Input()
  jiekou: any;
  @Input()
  current: any;
  @Input()
  name: any;
  @Input()
  desc: any;

  @Output()
  changeShow = new EventEmitter<any>();

  @Output()
  setNodeData = new EventEmitter<any>();

  tools: any[] = Tools;
  // 根据条件筛选出的底层组件
  zujianList = [];
  selectedZujian = [];

  selected: any;

  ngOnInit(): void {
    for (const tool of this.tools) {
      if (tool.group === '终端产品') {
        for (const item of tool.children) {
          this.zujianList.push(item);
          this.selectedZujian.push(item);
        }
      }
    }
  }

  closeWindows() {
    this.changeShow.emit(false);
  }
  closeWindowsAndSetData() {
    this.changeShow.emit(false);
    // 将select中的数据传到home中，然后根据数据创建一个新的节点，并将该节点放到plug中。
    // TODO
    this.setNodeData.emit(this.selected.data);

  }
  selectZujian() {
    // this.selectedZujian = this.zujianList.filter(x => x.data.property.jixing === this.jixing
    //   && x.data.property.leixing === this.leixing && x.data.property.xianzhi === this.xianzhi
    //   && x.data.property.jiekou === this.jiekou );
    this.selectedZujian = this.zujianList.filter( (item) => {
      let a1 = true;
      let a2 = true;
      let a3 = true;
      let a4 = true;
      if (this.jixing !== '') {
        a1 = (item.data.property.jixing === this.jixing);
      }
      if (this.leixing !== '') {
        a2 = (item.data.property.leixing === this.leixing);
      }
      if (this.xianzhi !== '') {
        a3 = (item.data.property.xianzhi === this.xianzhi);
      }
      if (this.jiekou !== '') {
        a4 = (item.data.property.jiekou === this.jiekou);
      }
      return a1 && a2 && a3 && a4;
    });
    console.log(this.selectedZujian);
  }
  onclick(data: any) {
    this.selected = data;
    console.log(this.selected);
  }




}
