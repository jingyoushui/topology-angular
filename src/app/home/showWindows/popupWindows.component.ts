import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {M8json} from '../json/M8_json';
import {ToolsService} from '../tools/tools.service';



@Component({
  selector: 'app-windows',
  templateUrl: './popupWindows.component.html',
  styleUrls: ['./popupWindows.component.scss'],
  providers: [ToolsService],
})
export class PopupWindowsComponent implements OnInit {
  @Input()
  plug_type: string;

  // 下面的是弹窗中的属性
  jixing = '';
  leixing = '';
  xianzhi = '';
  jiekou = '';
  current = 0;
  name = '';
  desc = '';

  leftType = '';

  @Output()
  changeShow = new EventEmitter<any>();

  @Output()
  setNodeData = new EventEmitter<any>();
  @Output()
  setNodeLeftData = new EventEmitter<any>();

  tools: any[];
  // 根据条件筛选出的底层组件
  zujianList = [];
  selectedZujian = [];
  //左边连接器
  LeftTypeList = [];
  selectedLeftType = [];

  selected: any;
  //左边选择线长；
  lineLength = "010";
  linelength = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: '010',
        name: '1m'
      },
      {
        id: '020',
        name: '2m'
      },
      {
        id: '030',
        name: '3m'
      },
      {
        id: '050',
        name: '5m'
      }
    ],
    noDefaultOption: true
  };

  m8_json = (new M8json()).M8_json;

  constructor(
    private service: ToolsService
  ){}

  ngOnInit(): void {
    this.tools = this.service.getTools();
    for (const tool of this.tools) {
      if (tool.group === '终端产品') {
        for (const item of tool.children) {
          this.zujianList.push(item);
          this.selectedZujian.push(item);
        }
      }
      if (tool.group === '法兰连接器产品') {
        for (const item of tool.children) {
          this.LeftTypeList.push(item);
          this.selectedLeftType.push(item);
        }
      }
    }

  }

  closeWindows() {
    this.changeShow.emit(false);
  }
  closeWindowsAndSetData(type?:any) {
    this.changeShow.emit(false);
    // 将select中的数据传到home中，然后根据数据创建一个新的节点，并将该节点放到plug中。
    // TODO
    if(!type){
      if(this.selected){
        this.setNodeData.emit(this.selected.data);
      }
    }else if(type === 'yuliu'){
      const data = this.m8_json.yuliu;
      if(this.desc){
        data.data.children[0].text = this.desc;
      }
      this.setNodeData.emit(data.data);


    }else if(type === 'zidingyi'){
      const data = this.m8_json.zidingyi;
      if(this.name){
        data.data.text = this.name;
      }
      if(this.desc){
        data.data.children[0].text = this.desc;
      }
      data.data.property = {
        jixing: this.jixing,
        leixing: this.leixing,
        xianzhi: this.xianzhi,
        jiekou: this.jiekou,
        current: this.current,
        name: this.name,
        desc: this.desc,
      };
      this.setNodeData.emit(data.data);
    }


  }
  closeWindowsAndSetLeftData(){
    this.changeShow.emit(false);
    // console.log(this.selected);
    if(this.selected){
      var data = {
        node:this.selected.data,
        linelength:this.lineLength
      }
      this.setNodeLeftData.emit(data);
    }
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
  }
  onclick(data: any) {
    this.selected = data;
    // console.log(this.selected);
  }

  onClickLine(){

    console.log(this.lineLength);

  }



}
