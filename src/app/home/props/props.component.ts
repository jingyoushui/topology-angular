import {Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange, SimpleChanges, HostListener} from '@angular/core';

import { NoticeService } from 'le5le-components/notice';

import { Node } from 'topology-core/models/node';
import { Props } from './props.model';
import { PropsService } from './props.service';
import {EventAction, EventType, Pen} from 'topology-core/models';
import {getRect} from 'topology-core/utils';
import {Topology} from 'topology-core/topology';

@Component({
  selector: 'app-props',
  templateUrl: './props.component.html',
  styleUrls: ['./props.component.scss'],
  providers: [PropsService],

})
export class PropsComponent implements OnInit, OnChanges {
  @Input() canvas: Topology;
  @Input() selection: {
    pen?: Pen;
    pens?: Pen[];
  };

  @Input() report_list:any;
  report_list2:any;
  @Input() zh_en:any;
  @Output() ok = new EventEmitter<any>();
  @Output() animateChange = new EventEmitter<any>();
  @Input() readonly = false;
  @Input() currentFile :number;

  @Output()
  changeProps = new EventEmitter<any>();

  tab = 1;
  pen: any;
  lineLength = "010";
  icon: any;
  drowdown = 0;

  tag = '';
  data = '';

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

  fontStyleOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'normal',
        name: '正常'
      },
      {
        id: 'italic',
        name: '倾斜'
      }
    ],
    noDefaultOption: true
  };

  fontWeightOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'normal',
        name: '正常'
      },
      {
        id: 'bold',
        name: '加粗'
      }
    ],
    noDefaultOption: true
  };


  channelTypeOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'dan-dan',
        name: '单信号'
      },
      {
        id: 'dan-duo',
        name: '双信号'
      }

    ],
    noDefaultOption: true
  };
  signalTypeOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'NPN',
        name: 'NPN'
      },
      {
        id: 'PNP',
        name: 'PNP'
      }

    ],
    noDefaultOption: true
  };
  portTypeOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'M8',
        name: 'M8系列'
      },
      {
        id: 'M12',
        name: 'M12系列'
      }

    ],
    noDefaultOption: true
  };

  bkTypeOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 0,
        name: '纯色背景'
      },
      {
        id: 1,
        name: '线性渐变'
      },
      {
        id: 2,
        name: '径向渐变'
      }
    ],
    noDefaultOption: true
  };

  playOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 1,
        name: '自动播放'
      },
      {
        id: 2,
        name: '跟随动画播放'
      }
    ]
  };

  showDialog = 0;
  images: { id: string; image: string }[];

  cpPresetColors = [
    '#1890ff',
    '#096dd9',
    '#bae7ff',
    '#52c41a',
    '#3fad09',
    '#c6ebb4',
    '#faad14',
    '#d9a116',
    '#fff6dd',
    '#f50000',
    '#ff0000',
    '#ffc2c5',
    '#fa541c',
    '#531dab',
    '#314659',
    '#777777',
    '#E7E27A'
  ];

  animateOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'upDown',
        name: '上下跳动'
      },
      {
        id: 'leftRight',
        name: '左右跳动'
      },
      {
        id: 'heart',
        name: '心跳'
      },
      {
        id: 'success',
        name: '成功'
      },
      {
        id: 'warning',
        name: '警告'
      },
      {
        id: 'error',
        name: '错误'
      },
      {
        id: 'show',
        name: '炫耀'
      },
      {
        id: 'custom',
        name: '自定义'
      }
    ]
  };

  lineAnimateOptions = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'beads',
        name: '水珠流动'
      },
      {
        id: 'dot',
        name: '圆点'
      },
      {
        id: 'comet',
        name: '彗星'
      }
    ]
  };

  iconAligns = {
    id: 'id',
    name: 'name',
    list: [
      {
        id: 'center',
        name: '居中'
      },
      {
        id: 'top',
        name: '上'
      },
      {
        id: 'bottom',
        name: '下'
      },
      {
        id: 'left',
        name: '左'
      },
      {
        id: 'right',
        name: '右'
      },
      {
        id: 'left-top',
        name: '左上'
      },
      {
        id: 'right-top',
        name: '右上'
      },
      {
        id: 'left-bottom',
        name: '左下'
      },
      {
        id: 'right-bottom',
        name: '右下'
      }
    ],
    noDefaultOption: true
  };

  nodesAlgin = ['left', 'right', 'top', 'bottom', 'center', 'middle'];
  icons: any[] = [];
  layout = {
    maxWidth: 1000,
    nodeWidth: 0,
    nodeHeight: 0,
    maxCount: 0,
    spaceWidth: 30,
    spaceHeight: 30
  };
  show: any = {};
  Node: Node;
  constructor(private service: PropsService) {
    // this.getImages();
  }

  ngOnInit() {
    this.show = {};
    if (this.selection.pen) {
      this.pen = this.selection.pen;
      if (typeof this.pen.data === 'object') {
        this.data = JSON.stringify(this.pen.data, null, 2);
      } else {
        this.data = this.pen.data + '';
      }
      this.report_list2 = this.report_list.filter(x => x.id === this.pen.id);

    } else {
      this.pen = {};
    }

    if (!this.pen.font) {
      this.pen.font = {
        color: '#242424',
        fontFamily: '"Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial',
        fontSize: 12,
        lineHeight: 1.5,
        fontStyle: 'normal',
        fontWeight: 'normal',
        textAlign: 'center',
        textBaseline: 'middle'
      };
    }
    if (!this.pen.font.fontStyle) {
      this.pen.font.fontStyle = 'normal';
    }
    if (!this.pen.font.fontWeight) {
      this.pen.font.fontWeight = 'normal';
    }

    if (this.pen.icon) {
      if (this.icon) {
        this.icon.checked = false;
      }
      for (const item of this.icons) {
        if (String.fromCharCode(+item.unicode) === this.pen.icon) {
          item.checked = true;
          this.icon = item;
          break;
        }
      }
    } else {
      this.icon = null;
    }

    if (!this.pen.bkType) {
      this.pen.bkType = 0;
    }

    if (!this.pen.imageAlign) {
      this.pen.imageAlign = 'center';
    }

    this.icons = this.service.GetIcons();

    const rect = getRect(this.canvas.activeLayer.pens);
    this.layout.maxWidth = rect.width;
  }

  async getImages() {
    // this.images = await this.service.GetImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selection) {
      this.ngOnInit();
    }
  }

  getBackground(color: string) {
    return {
      'background-color': color
    };
  }
  // 当更改参数的时候，也要更新ReportList中对应的数据
  changeProp(){
    if(this.selection.pen){
      const pen = this.selection.pen;
      if(pen.name === 'fenxianheMuban'){
        const data = {
          id: pen.id,
          text: pen.text,
        }
        this.changeProps.emit(data);

      }
      if((<Node>this.selection.pen).children){
        const text = (<Node>this.selection.pen).children[0];
        const data = {
          id:this.selection.pen.id,
          text: text.text,
          mubanid: this.selection.pen.mubanId,
        }
        this.changeProps.emit(data);
      }
      //选中了线
      if(this.selection.pen.type===1){
        const data = {
          type:1,
          id:this.selection.pen.id,
          text: this.selection.pen.text,
          mubanid: this.selection.pen.mubanId,
        }
        this.changeProps.emit(data);
      }

    }

    // console.log(this.selection.pen);
  }

  onChangeProp() {
    if (this.selection.pens) {
      for (const item of this.selection.pens) {
        item.dash = this.pen.dash;
        item.strokeStyle = this.pen.strokeStyle;
        item.lineWidth = this.pen.lineWidth;
        item.globalAlpha = this.pen.globalAlpha;
        item.font = Object.assign({}, this.pen.font);
        item.textMaxLine = this.pen.textMaxLine;
        item.textOffsetX = this.pen.textOffsetX;
        item.textOffsetY = this.pen.textOffsetY;
      }
    }
    if (this.selection.pen && this.data) {
      let obj: any;
      try {
        obj = JSON.parse(this.data);
      } catch (e) { }
      if (obj) {
        this.pen.data = obj;
      }
    }
    // //如果选中了连线
    // if(this.selection.pen&&this.selection.pen.type===1){
    //   // console.log(this.selection.pen,this.lineLength);
    //   if(this.selection.pen.text){
    //     this.selection.pen.text = this.selection.pen.text.slice(0,-3) + this.lineLength;
    //     this.changeProp();
    //   }
    //
    // }

    this.canvas.updateProps();
  }
  onClickLine(lineLength){

    console.log(this.lineLength);
    if(this.selection.pen.text){
      this.selection.pen.text = this.selection.pen.text.slice(0,-3) + lineLength;
      this.changeProp();
    }

    this.onChangeProp();
  }

  onClickName(name: string) {
    this.pen.name = name;
    this.drowdown = 0;
    this.onChangeProp();
  }

  onClickDash(dash: number) {
    this.pen.dash = dash;
    this.drowdown = 0;
    this.onChangeProp();
  }

  onClickFromArrow(arrow: string) {
    this.pen.fromArrow = arrow;
    this.drowdown = 0;
    this.onChangeProp();
  }

  onClickToArrow(arrow: string) {
    this.pen.toArrow = arrow;
    this.drowdown = 0;
    this.onChangeProp();
  }

  @HostListener('document:click', ['$event'])
  onClickDocument() {
    this.drowdown = 0;
  }

  onClickIcon(item?: any) {
    if (this.icon) {
      this.icon.checked = false;
    }

    if (item) {
      item.checked = true;
      this.pen.iconFamily = 'topology';
      this.pen.icon = String.fromCharCode(+item.unicode);
    } else {
      this.pen.icon = '';
    }

    this.icon = item;
    this.onChangeProp();
  }

  onChangeImgWidth() {
    if (this.pen.imageRatio && this.pen.imageWidth > 0) {
      this.pen.imageHeight =
        (this.pen.imgNaturalHeight / this.pen.imgNaturalWidth) * this.pen.imageWidth;
    }

    this.onChangeProp();
  }

  onChangeImgHeight() {
    if (this.pen.imageRatio && this.pen.imageHeight > 0) {
      this.pen.imageWidth =
        (this.pen.imgNaturalWidth / this.pen.imgNaturalHeight) * this.pen.imageHeight;
    }

    this.onChangeProp();
  }

  onChangeImgRatio() {
    if (this.pen.imageRatio && (this.pen.imageWidth || this.pen.imageHeight)) {
      if (this.pen.imageWidth) {
        this.pen.imageHeight =
          (this.pen.imgNaturalHeight / this.pen.imgNaturalWidth) * this.pen.imageWidth;
      } else {
        this.pen.imageWidth =
          (this.pen.imgNaturalWidth / this.pen.imgNaturalHeight) * this.pen.imageHeight;
      }
    }

    this.onChangeProp();
  }

  onAnimate() {
    this.pen.animateStart = this.pen.animateStart ? Date.now() : 0;
    this.canvas.animate();
  }

  onAddFrame() {
    if (!this.pen.animateFrames) {
      this.pen.animateFrames = [];
    }

    this.pen.animateFrames.push({
      duration: 200,
      linear: true,
      state: Node.cloneState(this.pen)
    });

    this.onAnimateDuration();
  }

  onRemoveFrame(i: number) {
    this.pen.animateFrames.splice(i, 1);
    this.onAnimateDuration();
  }

  onFrameUp(i: number) {
    if (i < 1) {
      return;
    }
    const item = this.pen.animateFrames.splice(i, 1);
    this.pen.animateFrames.splice(i - 1, 0, item[0]);
  }

  onFrameDown(i: number) {
    if (i > this.pen.animateFrames.length - 2) {
      return;
    }
    const item = this.pen.animateFrames.splice(i, 1);
    this.pen.animateFrames.splice(i + 1, 0, item[0]);
  }

  onClickAnimateDash(node: Node, dash: number) {
    node.dash = dash;
    this.drowdown = 0;
    this.onAnimate();
  }

  onAnimateDuration() {
    this.pen.animateDuration = 0;
    for (const item of this.pen.animateFrames) {
      this.pen.animateDuration += item.duration;
    }
  }

  onChangeLineAnimate() {
    const animateStart = this.pen.animateStart;
    this.pen.animateStart = 0;
    this.canvas.animate();
    setTimeout(() => {
      if (animateStart) {
        this.pen.animateStart = animateStart;
        this.canvas.animate();
      }
    }, 0);
  }

  onChangeAnimate() {
    if (this.pen.animateType === 'custom') {
      return;
    }

    this.pen.animateFrames = [];
    const state = Node.cloneState(this.pen);
    switch (this.pen.animateType) {
      case 'upDown':
        state.rect.y -= 10;
        state.rect.ey -= 10;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(this.pen)
        });
        this.pen.animateFrames.push({
          duration: 200,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'leftRight':
        state.rect.x -= 10;
        state.rect.ex -= 10;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        this.pen.animateFrames.push({
          duration: 80,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x -= 20;
        state.rect.ex -= 20;
        this.pen.animateFrames.push({
          duration: 50,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        this.pen.animateFrames.push({
          duration: 30,
          linear: true,
          state: Node.cloneState(state)
        });
        this.pen.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(this.pen)
        });
        break;
      case 'heart':
        state.rect.x -= 5;
        state.rect.ex += 5;
        state.rect.y -= 5;
        state.rect.ey += 5;
        state.rect.width += 5;
        state.rect.height += 10;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        this.pen.animateFrames.push({
          duration: 400,
          linear: true,
          state: Node.cloneState(this.pen)
        });
        break;
      case 'success':
        state.strokeStyle = '#237804';
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(this.pen)
        });
        state.strokeStyle = '#237804';
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(this.pen)
        });
        state.strokeStyle = '#237804';
        state.fillStyle = '#389e0d22';
        this.pen.animateFrames.push({
          duration: 3000,
          linear: true,
          state
        });
        break;
      case 'warning':
        state.strokeStyle = '#fa8c16';
        state.dash = 2;
        this.pen.animateFrames.push({
          duration: 300,
          linear: true,
          state
        });
        state.strokeStyle = '#fa8c16';
        state.dash = 0;
        this.pen.animateFrames.push({
          duration: 500,
          linear: true,
          state: Node.cloneState(state)
        });
        state.strokeStyle = '#fa8c16';
        state.dash = 2;
        this.pen.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'error':
        state.strokeStyle = '#cf1322';
        state.fillStyle = '#cf132222';
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        break;
      case 'show':
        state.strokeStyle = '#fa541c';
        state.rotate = -10;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 10;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 0;
        this.pen.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
    }

    this.onAnimateDuration();
  }

  onChangeBkType() {
    if (this.pen.bkType === 1) {
      this.pen.strokeStyle = '#52c41aff';
      this.pen.gradientFromColor = this.pen.gradientFromColor || '#c6ebb463';
      this.pen.gradientToColor = this.pen.gradientToColor || '#bae7ff0f';
      this.pen.gradientAngle = this.pen.gradientAngle || 0;
    } else if (this.pen.bkType === 2) {
      this.pen.strokeStyle = '#52c41aff';
      this.pen.gradientFromColor = this.pen.gradientFromColor || '#ffffff00';
      this.pen.gradientToColor = this.pen.gradientToColor || '#c6ebb463';
      this.pen.gradientRadius = this.pen.gradientRadius || 0.01;
    }

    this.onChangeProp();
  }

  // onNodesAlign(align: string) {
  //   alignNodes(this.canvas.activeLayer.pens, this.canvas.activeLayer.rect, align);
  //   this.canvas.updateProps();
  // }
  //

  onAddEvent() {
    this.pen.events.push({
      type: EventType.Click,
      action: EventAction.Link,
      value: ''
    });
  }

  onSelect(pen: Pen) {
    this.canvas.activeLayer.pens = [pen];
    this.canvas.render();
  }
}
