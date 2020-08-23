import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Pen, PenType} from 'topology-core/models/pen';
import {Line} from 'topology-core/models/line';
import {Node} from 'topology-core/models/node';
import {Point, s8, Topology} from 'topology-core';
import {Options} from 'topology-core/options';

import {Store} from 'le5le-store';
import {NoticeService} from 'le5le-components/notice';

import {HomeService} from './home.service';
import {CoreService} from '../core/core.service';
import {TopologyService} from './topology.service';
// 树型插件
import {ReportList} from './report-list/reportList';
import {ReportListNode} from './report-list/reportListNode';


import {VoltageAndCurrent} from './parameter/VoltageAndCurrent';
import {FileTypes} from 'topology-core/models/status';
import {Rect} from 'topology-core/models/rect';
import {M8json} from './json/M8_json';

import * as FileSaver from 'file-saver';
import {HomeHelper} from './home.helper';
import {M82json} from './json/M82_json';
import {M12json} from './json/M12_json';
import {M12twojson} from './json/M12two_json';

declare var C2S: any;
declare var JSZip: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService,HomeHelper],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:keydown)': 'onkeyDocument($event)',
    '(document:click)': 'onClickDocument($event)'
  }
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('workspace', {static: true}) workspace: ElementRef;
  canvas: Topology;
  cavasbkColor = '#ffffffff';
  canvasOptions: Options = {};
  selection: {
    pen?: Pen;
    pens?: Pen[];
  };
  icons: { icon: string; iconFamily: string; }[] = [];
  readonly = false;

  user: any;
  subUser: any;

  mouseMoving = false;

  contextmenu: any;
  locked = false;
  canvasHeight = 0;
  tabb = 1;
  showRight = true;
  size = {
    width: 1500,
    height: 450
  };
  data: any = {
    id: '',
    version: '',
    name: '空白文件',
    desc: '',
    image: '',
    userId: '',
    class: '',
    component: false,
    shared: false
  };
  currentFile: FileTypes;

  // 用来生成报目表的数据,将整个画板分成多个区域,每个区域都有名字和id,nodes[],lines[].
  // report_node : id, name, 型号, 备注

  report_list: ReportList[] = [];
  showReport = {'display':'none'} ;
  showWindows = false;
  // 中英对应表
  zh_en = this.helper.zh_en;

  remove_id = [];

  // 选中的待更换的plug节点
  selectedPlug: any;

  // 这个属性是双击plug时出现弹窗，判断是plug还是leftplug;
  plug_type: string;

  editFilename = false; // 文件名
  editFiledesc = false; // 文件描述

  // 导出图片时的弹窗，在里面写一些信息
  showExportWord = false;
  down = '';
  word_company = '';
  word_name = '';

  // m8模板初始化
  m8_json: {
    lines: any;
    fenxianhe: any;
    fenxianheMuban: any;
    plugs: any;
    leftLine: any;
    fangshuisai:any;
    xianbiaopai:any;
  };
  // m12模板初始化
  m12_json: {
    lines: any;
    fenxianhe: any;
    fenxianheMuban: any;
    plugs: any;
    leftLine: any;
    fangshuisai:any;
    xianbiaopai:any;
  };
  // m8双通道模板初始化
  m82_json: {
    line1: any;
    line2: any;
    rightline1:any;
    rightline2:any;
    rightline1_1:any;
    rightline2_1:any;
    fenxianhe: any;
    fenxianheMuban: any;
    plug1: any;
    plug2: any;
    leftLine: any;
    fangshuisai:any;
    xianbiaopai:any;
    OneToTwo:any;
  };
  // m12双通道模板初始化
  m12two_json: {
    line1: any;
    line2: any;
    rightline1:any;
    rightline2:any;
    rightline1_1:any;
    rightline2_1:any;
    fenxianhe: any;
    fenxianheMuban: any;
    plug1: any;
    plug2: any;
    leftLine: any;
    fangshuisai:any;
    xianbiaopai:any;
    OneToTwo:any;
  };
  ignoreNode = ['plug','plug1','plug2','OneToTwo', 'rectangle', 'label', 'leftplug', 'dianxiang','fangshuisai','xianbiaopai'];

  subRoute: any;
  cpPresetColors = this.helper.cpPresetColors;

  constructor(
    private service: HomeService,
    private topologySrv: TopologyService,
    private coreService: CoreService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
    private  helper: HomeHelper,
  ) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.user = Store.get('user');
    this.subUser = Store.subscribe('user', (user: any) => {
      this.user = user;
      if (this.data && user && this.data.userId !== this.user.id) {
        this.data.shared = false;
        this.data.id = '';
      }
    });
    this.canvasOptions.on = this.onMessage;

    // Wait for parent dom render.
    setTimeout(() => {

      this.canvas = new Topology(this.workspace.nativeElement, this.canvasOptions);
      const width = this.canvas.parentElem.clientWidth;
      if (width > this.size.width) {
        this.size.width = width;
      }
      this.size.height = this.canvas.parentElem.clientHeight;
      // this.canvas.resize(this.size);
      this.subRoute = this.activateRoute.queryParamMap.subscribe(params => {
        if (params.get('id')) {
          this.onOpen({id: params.get('id'), version: params.get('version')});
        } else {
          this.data = {
            id: '',
            version: '',
            name: '空白文件',
            desc: '',
            image: '',
            userId: '',
            class: '',
            component: params.get('c') || false,
            shared: false
          };
          this.changebkColor();
        }
      });
      this.canvasHeight = this.canvas.canvas.height;
      // For debug
      (window as any).canvas = this.canvas;
      // End
    });

    // 注册节点信息
    this.service.canvasRegister();
    // 注册自己添加的终端组件信息
    this.service.canvasRegisterMy();
  }
  onMenu(event: { name: string; data: any; }) {
    if (!this.canvas) {
      return;
    }
    switch (event.name) {
      case 'new':
        this.onNew();
        break;
      case 'newFenxianhe':
        this.onNewFenxianhe();
        break;
      case 'open':
        setTimeout(() => {
          this.selection = null;
        });
        this.onNew();
        this.onOpenFile();
        break;
      case 'load':
        this.onOpenFile();
        break;
      case 'save':
        this.save();
        break;
      case 'saveAs':
        this.data.id = '';
        this.save();
        break;
      case 'downJson':
        this.onSaveJson();
        break;
      case 'downZip':
        this.onSaveZip();
        break;
      case 'exportWordHorizontal':
        this.down = 'horizontal';
        // this.onSavePng();
        this.showExport();
        // this.exportWordHorizontal();
        break;
      case 'exportWordViolently':
        this.down = 'violently';
        this.showExport();
        // this.exportWordViolently();
        break;
      case 'downSvg':
        this.toSVG();
        break;
      case 'undo':
        this.canvas.undo();
        break;
      case 'redo':
        this.canvas.redo();
        break;
      case 'cut':
        this.canvas.cut();
        break;
      case 'copy':
        this.canvas.copy();
        break;
      case 'paste':
        this.canvas.paste();
        break;
      case 'share':
        this.onShare();
        break;
      case 'render':
        this.canvas.render();
        break;
      case 'scale':
        this.canvas.scaleTo(event.data);
        break;
      case 'drawBk':
        this.canvas.clearBkImg();
        this.canvas.render();
        break;
      case 'view':
        if (this.data.id) {
          this.router.navigateByUrl(`/view?id=${this.data.id}${this.data.version ? '&version=' + this.data.version : ''}&r=1`);
        }
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onkeyDocument(key: KeyboardEvent) {
    if ((key.target as HTMLElement).tagName === 'INPUT' || (key.target as HTMLElement).tagName === 'TEXTAREA') {
      return;
    }

    let prevent = false;
    switch (key.key) {
      case 'n':
      case 'N':
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selection = null;
          });
          this.onNew();
        }
        prevent = true;
        break;
      case 'o':
      case 'O':
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selection = null;
          });
          this.onNew();
          this.onOpenFile();
        }
        prevent = true;
        break;
      case 'i':
      case 'I':
        if (key.ctrlKey) {
          this.onOpenFile();
        }
        prevent = true;
        break;
      case 's':
      case 'S':
        if (key.ctrlKey) {
          if (key.shiftKey) {
            this.data.id = '';
          }
          this.save();
        }
        prevent = true;
        break;
    }

    if (prevent) {
      key.preventDefault();
      key.returnValue = false;
      return false;
    }
  }

  //初始化分线盒文件
  onNewFenxianhe() {

    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = 0;
    this.cavasbkColor = '#ffffffff';
    this.data = {
      id: '',
      version: '',
      name: '空白文件',
      data: {pens:[], bkColor: '#ffffffff', filetype: 1},
      desc: '',
      image: '',
      userId: '',
      class: '',
      component: false,
      shared: false
    };
    // this.data.data.filetype = FileTypes.Fenxianhe;
    this.currentFile = FileTypes.Fenxianhe;
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
    // this.size.height = 450;
    // this.canvas.resize(this.size);
    this.report_list = [];

    // this.initNewM8();
    this.router.navigate(['/workspace']);

  }
  //
  onNew() {

    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = 0;
    this.cavasbkColor = '#ffffffff';
    this.data = {
      id: '',
      version: '',
      data: {pens:[], bkColor: '#ffffffff',filetype:0},
      name: '空白文件',
      desc: '',
      image: '',
      userId: '',
      class: '',
      component: false,
      shared: false
    };
    this.currentFile = FileTypes.Default;
    this.size.width = this.canvas.parentElem.clientWidth;
    this.size.height = this.canvas.parentElem.clientHeight;
    this.canvas.resize(this.size);
    this.report_list = [];
    this.data.data.bkColor = '#ffffffff';
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
    this.router.navigateByUrl('/workspace');


  }

  async onOpen(data: { id: string; version?: string; }) {
    const ret = await this.service.Get(data);
    if (!ret) {
      this.router.navigateByUrl('/workspace');
      return;
    }
    this.currentFile = ret.data.filetype;
    this.cavasbkColor = ret.data.bkColor;
    if (this.currentFile === FileTypes.Fenxianhe){
      const ret2 = await this.service.GetReportList(data);
      if (ret2) {
        this.report_list = ret2.data.data;
      }
    }

    Store.set('recently', {
      id: ret.id,
      version: ret.version,
      image: ret.image,
      name: ret.name,
      desc: ret.desc
    });
    if (this.user && ret.userId !== this.user.id) {
      ret.shared = false;
      ret.id = '';
      ret.userId = this.user.id;
      ret.username = this.user.username;
    }

    this.data = ret;
    Store.set('lineName', ret.data.lineName);
    Store.set('fromArrowType', ret.data.fromArrowType);
    Store.set('toArrowType', ret.data.toArrowType);
    Store.set('scale', ret.data.scale);
    Store.set('locked', ret.data.locked);
    Store.set('filetype', ret.data.filetype);
    this.canvas.open(ret.data);
    Store.set('file', this.data);
  }

  onOpenFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem: any = event.target;
      if (elem.files && elem.files[0]) {
        if (elem.files[0].name.indexOf('.json') > 0) {
          this.openJson(elem.files[0]);
        } else {
          this.openZip(elem.files[0]);
        }

      }
    };
    input.click();
  }
  openJson(file: any) {
    const name = file.name.replace('.json', '');
    this.data.name = name;
    Store.set('file', this.data);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const text = e.target.result + '';
      try {
        const data = JSON.parse(text);
        if (data && data.lineName) {
          Store.set('lineName', data.lineName);
          Store.set('fromArrowType', data.fromArrowType);
          Store.set('toArrowType', data.toArrowType);
          this.data = {
            id: '',
            version: '',
            data,
            name: name,
            desc: '',
            image: '',
            userId: '',
            class: '',
            component: false,
            shared: false
          };
          this.canvas.open(data);
        }
      } catch (e) {
        return false;
      }
    };
    reader.readAsText(file);
  }

  async openZip(file: any) {
    if (!this.user) {
      const _noticeService: NoticeService = new NoticeService();
      _noticeService.notice({
        body: '请先登录：上传文件需要身份认证！',
        theme: 'error'
      });
      return;
    }

    const zip = new JSZip();
    await zip.loadAsync(file);

    let data: any = '';
    let name = '';
    for (const key in zip.files) {
      if (zip.files[key].dir) {
        continue;
      }
      const pos = key.indexOf('.json');
      if (pos > 0) {
        name = key;
        name = name.replace('.json', '');
        data = await zip.file(key).async('string');
      }
    }

    if (!name || !data) {
      return false;
    }

    for (const key in zip.files) {
      if (zip.files[key].dir) {
        continue;
      }

      const pos = key.indexOf('.json');
      if (pos < 0) {
        let filename = key.substr(key.lastIndexOf('/') + 1);
        const extPos = filename.lastIndexOf('.');
        let ext = '';
        if (extPos > 0) {
          ext = filename.substr(extPos);
        }
        filename = filename.substring(0, extPos > 8 ? 8 : extPos);
        const result = await this.service.Upload(await zip.file(key).async('blob'), true, filename + ext);
        if (result) {
          data = data.replace(new RegExp(key, 'gm'), result.url);
          await this.service.AddImage(result.url);
        }
      }
    }

    try {
      data = JSON.parse(data);
      if (data && Array.isArray(data.nodes) && Array.isArray(data.lines)) {
        Store.set('lineName', data.lineName);
        Store.set('fromArrowType', data.fromArrowType);
        Store.set('toArrowType', data.toArrowType);
        this.data = {
          id: '',
          version: '',
          data,
          name: name,
          desc: '',
          image: '',
          userId: '',
          class: '',
          component: false,
          shared: false
        };
        this.canvas.open(data);
        Store.set('file', this.data);
      }
    } catch (e) {
      return false;
    }
  }

  save() {
    if (!this.canvas) {
      return;
    }
    this.data.data = this.canvas.data;
    this.canvas.toImage(null, null, async blob => {
      if (this.data.id) {
        if (!(await this.service.DelImage(this.data.image))) {
          return;
        }
      }
      const file = await this.service.Upload(blob, this.data.shared);
      if (!file) {
        return;
      }
      this.data.image = file.url;

      const ret = await this.service.Save(this.data);
      if (ret) {
        Store.set('file', this.data);
        // 保存成功文件数据之后,获取文件id,然后保存报目表数据
        const ret2 = await this.service.SaveReportList(
          {
            id: ret.id,
            data: {
              id: ret.id,
              data: this.report_list
            },
            userId: ''
          }
        );
        if (ret2) {
          const _noticeService: NoticeService = new NoticeService();
          _noticeService.notice({
            body: '保存成功！',
            theme: 'success'
          });
        }
        // this.data.id = ret.id;
        if (!this.data.id || this.activateRoute.snapshot.queryParamMap.get('version')) {
          this.data.id = ret.id;
          this.router.navigate(['/workspace'], {queryParams: {id: this.data.id}});
        } else {
          Store.set('recently', {
            id: this.data.id,
            image: this.data.image,
            name: this.data.name,
            desc: this.data.desc
          });
        }
      }
    });
  }
  async onSaveFilename() {
    if (!this.data.name) {
      return;
    }

    if (!this.data.id) {
      this.editFilename = false;
      return;
    }

    if (await this.service.Patch({
      id: this.data.id,
      name: this.data.name
    })) {
      this.editFilename = false;
    }
  }

  async onSaveFiledesc() {
    if (!this.data.desc) {
      return;
    }

    if (!this.data.id) {
      this.editFiledesc = false;
      return;
    }

    if (await this.service.Patch({
      id: this.data.id,
      desc: this.data.desc
    })) {
      this.editFiledesc = false;
    }
  }
// 增加单通道m8模板模块
  newM8() {
    const scale = this.canvas.data.scale;
    const start = this.canvas.getRect().start;

    // 增加分线盒和线
    // 首先需要找到当前画布中最下面的位置，然后在其下面再添加
    let maxh = 0;
    for(const pen of this.canvas.data.pens) {
      if(pen.type === PenType.Node){
        maxh = Math.max(maxh,pen.rect.ey);
      }
    }

    this.m8_json = (new M8json()).M8_json;
    this.m8_json.fenxianheMuban.id = s8();
    const inith = (maxh -120*scale)*scale;
    // const  inith = this.m8_json.fenxianheMuban.rect.height * scale + maxh - 120;
    const id = this.m8_json.fenxianheMuban.id;
    this.m8_json.fenxianheMuban.rect.y += inith;
    this.m8_json.fenxianheMuban.rect.center.y +=inith;
    this.initAddNode(this.m8_json.fenxianheMuban);
    this.m8_json.fenxianhe.id  = s8();
    // 当页面刷新的时候，m8_json中的数据会重新加载进来，就会是初始值了
    // 解决方法，第一种：当模板中的节点和线画上了之后，将m8_json中的值再做相反的操作改回去，这样保证每次都是从初始值加上高度×i
    // 第二种方法：另定义一个文件，这个文件中的数据只读不更改，通过该文件中的值作为初始值加上高度×i
    // 第一种解决方案实现比较简单，这里使用第一种方法

    this.m8_json.fenxianhe.rect.y += inith;
    this.m8_json.fenxianhe.rect.center.y += inith;
    this.initAddNode(this.m8_json.fenxianhe);

    this.m8_json.fangshuisai.id = s8();
    this.m8_json.fangshuisai.rect.y += inith;
    this.m8_json.fangshuisai.rect.center.y += inith;
    this.initAddNode(this.m8_json.fangshuisai);

    this.m8_json.xianbiaopai.id = s8();
    this.m8_json.xianbiaopai.rect.y += inith;
    this.m8_json.xianbiaopai.rect.center.y += inith;
    this.initAddNode(this.m8_json.xianbiaopai);


    // 增加分线板右边线和组件
    this.m8_json.plugs.mubanId = id;
    for (const line of this.m8_json.lines) {
      line.from.id = line.controlPoints[0].id = this.m8_json.fenxianhe.id;
      line.from.y += inith;
      line.to.y += inith;
      line.controlPoints[0].y += inith;
      line.controlPoints[1].y += inith ;
      // 把电阻plug加上去
      this.m8_json.plugs.rect.y = line.to.y - 10;
      this.m8_json.plugs.id = s8();
      this.initAddNode(this.m8_json.plugs);

      line.to.direction = 4;
      line.to.anchorIndex = 0;
      line.to.id = this.m8_json.plugs.id;
      line.locked = true;
      this.initAddLine(line);
    }
    // 增加分线板左边的线和组件
    const left_line = this.m8_json.leftLine;
    left_line.from.id = this.m8_json.fenxianhe.id;
    left_line.from.y += inith;
    left_line.to.y += inith;
    this.m8_json.plugs.name = 'leftplug';
    this.m8_json.plugs.rect.y = left_line.to.y - 8;
    this.m8_json.plugs.rect.x = left_line.to.x - 33;
    this.m8_json.plugs.id = s8();
    this.initAddNode(this.m8_json.plugs);
    left_line.to.direction = 2;
    left_line.to.anchorIndex = 1;
    left_line.to.id = this.m8_json.plugs.id;
    this.initAddLine(left_line);

    // // 堆pulg设置动画
    // for (const node of this.canvas.data.pens) {
    //   if (node.name === 'plug' && (<Node>node).mubanId === this.report_list_id) {
    //     node.animateType = 'warning';
    //     this.setPlugAnimate(node);
    //     node.animatePlay = true;
    //     this.canvas.animate();
    //   }
    // }
    for (const node of this.canvas.data.pens) {
      if ((node.name === 'plug' || node.name === 'leftplug') && (<Node>node).mubanId === id) {
        node.strokeStyle = '#f50000ff';
        node.dash = 1;
      }
    }
    // this.canvas.data.scale = scale;
    // console.log(scale);
    // this.canvas.scale(scale);
    // this.canvas.render();

    // 这里做相反的操作，保证M8_json的数据不被改变
    setTimeout(() => {
      this.m8_json.fenxianhe.rect.y -= inith;
      this.m8_json.fangshuisai.rect.y -= inith;
      this.m8_json.xianbiaopai.rect.center.y -= inith;
      for (const line of this.m8_json.lines) {
        line.from.y -= inith;
        line.to.y -= inith;
        line.controlPoints[0].y -= inith;
        line.controlPoints[1].y -= inith ;
      }
    }, 1000);
    // end
    // console.log(this.report_list);

    //画布自动变大
    const width = this.canvas.parentElem.clientWidth;
    const height = this.canvas.parentElem.clientHeight;
    if(height<maxh+400){
      this.autoresize(maxh+400,width);
    }

    // 将滚动条定位到新增的组件区域
    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = maxh;


  }

  //增加m8双通道模板
  newTwoM8(){
    const scale = this.canvas.data.scale;
    const start = this.canvas.getRect().start;

    // 增加分线盒和线
    // 首先需要找到当前画布中最下面的位置，然后在其下面再添加
    let maxh = 0;
    for(const pen of this.canvas.data.pens) {
      if(pen.type === PenType.Node){
        maxh = Math.max(maxh,pen.rect.ey);
      }
    }


    this.m82_json = (new M82json()).M82_json;
    this.m82_json.fenxianheMuban.id = s8();
    const inith = (maxh)*scale;
    console.log(inith);
    // const  inith = this.m8_json.fenxianheMuban.rect.height * scale + maxh - 120;
    const id = this.m82_json.fenxianheMuban.id;
    this.m82_json.fenxianheMuban.rect.y += inith;
    this.m82_json.fenxianheMuban.rect.center.y +=inith;
    this.initAddNode(this.m82_json.fenxianheMuban);

    //初始化分线盒 start
    this.m82_json.fenxianhe.id  = s8();

    this.m82_json.fenxianhe.rect.y += inith;
    this.m82_json.fenxianhe.rect.center.y += inith;
    this.initAddNode(this.m82_json.fenxianhe);

    this.m82_json.fangshuisai.id = s8();
    this.m82_json.fangshuisai.rect.y += inith;
    this.m82_json.fangshuisai.rect.center.y += inith;
    this.initAddNode(this.m82_json.fangshuisai);

    this.m82_json.xianbiaopai.id = s8();
    this.m82_json.xianbiaopai.rect.y += inith;
    this.m82_json.xianbiaopai.rect.center.y += inith;
    this.initAddNode(this.m82_json.xianbiaopai);


    //end
    //初始化转接头 start
    for(let i=0;i<4;i++){
      this.m82_json.OneToTwo.id  = s8();
      this.m82_json.OneToTwo.rect.y += (i==0?inith:60);
      this.m82_json.OneToTwo.rect.center.y += (i==0?inith:60);
      this.initAddNode(this.m82_json.OneToTwo);

      //添加转接头左边连线
      this.m82_json.line1.from.y += (i==0?inith:0);
      this.m82_json.line1.from.x += (i==0?0:18);
      this.m82_json.line1.to.y += (i==0?inith:60);
      this.m82_json.line1.from.id  =this.m82_json.fenxianhe.id;
      this.m82_json.line1.to.id = this.m82_json.OneToTwo.id;

      this.m82_json.line1.controlPoints[0].x += (i==0?0:18);
      this.m82_json.line1.controlPoints[0].y += (i==0?inith+18:18)
      this.m82_json.line1.controlPoints[0].id = this.m82_json.fenxianhe.id;
      this.m82_json.line1.controlPoints[1].x += (i==0?0:18);
      this.m82_json.line1.controlPoints[1].y += (i==0?inith:60);

      this.m82_json.line1.controlPoints[2].x += (i==0?0:20);
      this.m82_json.line1.controlPoints[2].y = this.m82_json.line1.controlPoints[1].y;
      this.m82_json.line1.controlPoints[2].id =  this.m82_json.OneToTwo.id;
      this.initAddLine(this.m82_json.line1);

      //上面的节点
      this.m82_json.plug1.id = s8();
      this.m82_json.plug1.rect.y+=(i==0?inith:60);
      this.m82_json.plug1.rect.center.y+=(i==0?inith:60);
      this.initAddNode(this.m82_json.plug1);
      //添加转接头右边连线,上升的线
      this.m82_json.rightline1.to.id = this.m82_json.plug1.id;
      this.m82_json.rightline1.from.y += (i==0?inith:60);
      this.m82_json.rightline1.to.y += (i==0?inith:60);
      this.m82_json.rightline1.from.id  =this.m82_json.OneToTwo.id;
      this.initAddLine(this.m82_json.rightline1);

      this.m82_json.plug2.id = s8();
      this.m82_json.plug2.rect.y+=(i==0?inith:60);
      this.m82_json.plug2.rect.center.y+=(i==0?inith:60);
      this.initAddNode(this.m82_json.plug2);

      this.m82_json.rightline1_1.to.id = this.m82_json.plug2.id;
      this.m82_json.rightline1_1.from.y += (i==0?inith:60);
      this.m82_json.rightline1_1.to.y += (i==0?inith:60);
      this.m82_json.rightline1_1.from.id  =this.m82_json.OneToTwo.id;
      this.initAddLine(this.m82_json.rightline1_1);


    }


    for(let i=0;i<4;i++){
      this.m82_json.OneToTwo.id  = s8();
      this.m82_json.OneToTwo.rect.y += ((i==0?150:60));
      this.m82_json.OneToTwo.rect.center.y += ((i==0?150:60));
      this.initAddNode(this.m82_json.OneToTwo);
      this.m82_json.line2.from.y += (i==0?inith:0);
      this.m82_json.line2.from.x += (i==0?0:-18);
      this.m82_json.line2.to.y += (i==0?inith:60);
      this.m82_json.line2.from.id  =this.m82_json.fenxianhe.id;
      this.m82_json.line2.to.id = this.m82_json.OneToTwo.id;

      this.m82_json.line2.controlPoints[0].x += (i==0?0:-18);
      this.m82_json.line2.controlPoints[0].y += (i==0?inith:18)
      this.m82_json.line2.controlPoints[0].id = this.m82_json.fenxianhe.id;
      this.m82_json.line2.controlPoints[1].x += (i==0?0:-18);
      this.m82_json.line2.controlPoints[1].y += (i==0?inith:60);

      this.m82_json.line2.controlPoints[2].x += (i==0?0:-20);
      this.m82_json.line2.controlPoints[2].y = this.m82_json.line2.controlPoints[1].y;
      this.m82_json.line2.controlPoints[2].id =  this.m82_json.OneToTwo.id;

      this.initAddLine(this.m82_json.line2);

      //上面的节点
      this.m82_json.plug1.id = s8();
      this.m82_json.plug1.rect.y+=(i==0?150:60);
      this.m82_json.plug1.rect.center.y+=(i==0?150:60);
      this.initAddNode(this.m82_json.plug1);
      //添加转接头右边连线
      this.m82_json.rightline1.to.id = this.m82_json.plug1.id;
      this.m82_json.rightline1.from.y += (i==0?150:60);
      this.m82_json.rightline1.to.y += (i==0?150:60);
      this.m82_json.rightline1.from.id  =this.m82_json.OneToTwo.id;
      this.initAddLine(this.m82_json.rightline1);

      this.m82_json.plug2.id = s8();
      this.m82_json.plug2.rect.y+=(i==0?150:60);
      this.m82_json.plug2.rect.center.y+=(i==0?150:60);
      this.initAddNode(this.m82_json.plug2);

      this.m82_json.rightline1_1.to.id = this.m82_json.plug2.id;
      this.m82_json.rightline1_1.from.y += (i==0?150:60);
      this.m82_json.rightline1_1.to.y += (i==0?150:60);
      this.m82_json.rightline1_1.from.id  =this.m82_json.OneToTwo.id;
      this.initAddLine(this.m82_json.rightline1_1);


    }

    // 增加分线板左边的线和组件
    const left_line = this.m82_json.leftLine;
    left_line.from.id = this.m82_json.fenxianhe.id;
    left_line.from.y += inith;
    left_line.to.y += inith;
    this.m82_json.plug2.name = 'leftplug';
    this.m82_json.plug2.rect.y = left_line.to.y - 8;
    this.m82_json.plug2.rect.x = left_line.to.x - 33;
    this.m82_json.plug2.id = s8();
    this.initAddNode(this.m82_json.plug2);
    left_line.to.direction = 2;
    left_line.to.anchorIndex = 1;
    left_line.to.id = this.m82_json.plug2.id;
    this.initAddLine(left_line);

    //画布自动变大
    const width = this.canvas.parentElem.clientWidth;
    const height = this.canvas.parentElem.clientHeight;
    if(height<maxh+700){
      this.autoresize(maxh+700,width);
    }
    //end
    // 将滚动条定位到新增的组件区域
    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = maxh;

  }

  newM12(){
    const scale = this.canvas.data.scale;
    const start = this.canvas.getRect().start;

    // 增加分线盒和线
    // 首先需要找到当前画布中最下面的位置，然后在其下面再添加
    let maxh = 0;
    for(const pen of this.canvas.data.pens) {
      if(pen.type === PenType.Node){
        maxh = Math.max(maxh,pen.rect.ey);
      }
    }

    this.m12_json = (new M12json()).M12_json;
    this.m12_json.fenxianheMuban.id = s8();
    const inith = (maxh -120*scale)*scale;
    const id = this.m12_json.fenxianheMuban.id;
    this.m12_json.fenxianheMuban.rect.y += inith;
    this.m12_json.fenxianheMuban.rect.center.y +=inith;
    this.initAddNode(this.m12_json.fenxianheMuban);
    this.m12_json.fenxianhe.id  = s8();
    // 当页面刷新的时候，m8_json中的数据会重新加载进来，就会是初始值了
    // 解决方法，第一种：当模板中的节点和线画上了之后，将m8_json中的值再做相反的操作改回去，这样保证每次都是从初始值加上高度×i
    // 第二种方法：另定义一个文件，这个文件中的数据只读不更改，通过该文件中的值作为初始值加上高度×i
    // 第一种解决方案实现比较简单，这里使用第一种方法

    this.m12_json.fenxianhe.rect.y += inith;
    this.m12_json.fenxianhe.rect.center.y += inith;
    this.initAddNode(this.m12_json.fenxianhe);

    this.m12_json.fangshuisai.id = s8();
    this.m12_json.fangshuisai.rect.y += inith;
    this.m12_json.fangshuisai.rect.center.y += inith;
    this.initAddNode(this.m12_json.fangshuisai);

    this.m12_json.xianbiaopai.id = s8();
    this.m12_json.xianbiaopai.rect.y += inith;
    this.m12_json.xianbiaopai.rect.center.y += inith;
    this.initAddNode(this.m12_json.xianbiaopai);


    // 增加分线板右边线和组件
    this.m12_json.plugs.mubanId = id;
    for (const line of this.m12_json.lines) {
      line.from.id = line.controlPoints[0].id = this.m12_json.fenxianhe.id;
      line.from.y += inith;
      line.to.y += inith;
      line.controlPoints[0].y += inith;
      line.controlPoints[1].y += inith ;
      // 把电阻plug加上去
      this.m12_json.plugs.rect.y = line.to.y - 10;
      this.m12_json.plugs.id = s8();
      this.initAddNode(this.m12_json.plugs);

      line.to.direction = 4;
      line.to.anchorIndex = 0;
      line.to.id = this.m12_json.plugs.id;
      line.locked = true;
      this.initAddLine(line);
    }
    // 增加分线板左边的线和组件
    const left_line = this.m12_json.leftLine;
    left_line.from.id = this.m12_json.fenxianhe.id;
    left_line.from.y += inith;
    left_line.to.y += inith;
    this.m12_json.plugs.name = 'leftplug';
    this.m12_json.plugs.rect.y = left_line.to.y - 8;
    this.m12_json.plugs.rect.x = left_line.to.x - 33;
    this.m12_json.plugs.id = s8();
    this.initAddNode(this.m12_json.plugs);
    left_line.to.direction = 2;
    left_line.to.anchorIndex = 1;
    left_line.to.id = this.m12_json.plugs.id;
    this.initAddLine(left_line);

    for (const node of this.canvas.data.pens) {
      if ((node.name === 'plug' || node.name === 'leftplug') && (<Node>node).mubanId === id) {
        node.strokeStyle = '#f50000ff';
        node.dash = 1;
      }
    }

    // 这里做相反的操作，保证M8_json的数据不被改变
    setTimeout(() => {
      this.m12_json.fenxianhe.rect.y -= inith;
      this.m12_json.fangshuisai.rect.y -= inith;
      this.m12_json.xianbiaopai.rect.center.y -= inith;
      for (const line of this.m12_json.lines) {
        line.from.y -= inith;
        line.to.y -= inith;
        line.controlPoints[0].y -= inith;
        line.controlPoints[1].y -= inith ;
      }
    }, 1000);
    // end
    // console.log(this.report_list);

    //画布自动变大
    const width = this.canvas.parentElem.clientWidth;
    const height = this.canvas.parentElem.clientHeight;
    if(height<maxh+400){
      this.autoresize(maxh+400,width);
    }

    // 将滚动条定位到新增的组件区域
    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = maxh;


  }
  newTwoM12(){
    const scale = this.canvas.data.scale;
    const start = this.canvas.getRect().start;

    // 增加分线盒和线
    // 首先需要找到当前画布中最下面的位置，然后在其下面再添加
    let maxh = 0;
    for(const pen of this.canvas.data.pens) {
      if(pen.type === PenType.Node){
        maxh = Math.max(maxh,pen.rect.ey);
      }
    }


    this.m12two_json = (new M12twojson()).M12two_json;
    this.m12two_json.fenxianheMuban.id = s8();
    const inith = (maxh)*scale;
    console.log(inith);
    // const  inith = this.m8_json.fenxianheMuban.rect.height * scale + maxh - 120;
    const id = this.m12two_json.fenxianheMuban.id;
    this.m12two_json.fenxianheMuban.rect.y += inith;
    this.m12two_json.fenxianheMuban.rect.center.y +=inith;
    this.initAddNode(this.m12two_json.fenxianheMuban);

    //初始化分线盒 start
    this.m12two_json.fenxianhe.id  = s8();

    this.m12two_json.fenxianhe.rect.y += inith;
    this.m12two_json.fenxianhe.rect.center.y += inith;
    this.initAddNode(this.m12two_json.fenxianhe);
    //end

    this.m12two_json.fangshuisai.id = s8();
    this.m12two_json.fangshuisai.rect.y += inith;
    this.m12two_json.fangshuisai.rect.center.y += inith;
    this.initAddNode(this.m12two_json.fangshuisai);

    this.m12two_json.xianbiaopai.id = s8();
    this.m12two_json.xianbiaopai.rect.y += inith;
    this.m12two_json.xianbiaopai.rect.center.y += inith;
    this.initAddNode(this.m12two_json.xianbiaopai);

    //初始化转接头 start
    for(let i=0;i<4;i++){
      this.m12two_json.OneToTwo.id  = s8();
      this.m12two_json.OneToTwo.rect.y += (i==0?inith:60);
      this.m12two_json.OneToTwo.rect.center.y += (i==0?inith:60);
      this.initAddNode(this.m12two_json.OneToTwo);

      //添加转接头左边连线
      this.m12two_json.line1.from.y += (i==0?inith:0);
      this.m12two_json.line1.from.x += (i==0?0:18);
      this.m12two_json.line1.to.y += (i==0?inith:60);
      this.m12two_json.line1.from.id  =this.m12two_json.fenxianhe.id;
      this.m12two_json.line1.to.id = this.m12two_json.OneToTwo.id;

      this.m12two_json.line1.controlPoints[0].x += (i==0?0:18);
      this.m12two_json.line1.controlPoints[0].y += (i==0?inith+18:18)
      this.m12two_json.line1.controlPoints[0].id = this.m12two_json.fenxianhe.id;
      this.m12two_json.line1.controlPoints[1].x += (i==0?0:18);
      this.m12two_json.line1.controlPoints[1].y += (i==0?inith:60);

      this.m12two_json.line1.controlPoints[2].x += (i==0?0:20);
      this.m12two_json.line1.controlPoints[2].y = this.m12two_json.line1.controlPoints[1].y;
      this.m12two_json.line1.controlPoints[2].id =  this.m12two_json.OneToTwo.id;
      this.initAddLine(this.m12two_json.line1);

      //上面的节点
      this.m12two_json.plug1.id = s8();
      this.m12two_json.plug1.rect.y+=(i==0?inith:60);
      this.m12two_json.plug1.rect.center.y+=(i==0?inith:60);
      this.initAddNode(this.m12two_json.plug1);
      //添加转接头右边连线,上升的线
      this.m12two_json.rightline1.to.id = this.m12two_json.plug1.id;
      this.m12two_json.rightline1.from.y += (i==0?inith:60);
      this.m12two_json.rightline1.to.y += (i==0?inith:60);
      this.m12two_json.rightline1.from.id  =this.m12two_json.OneToTwo.id;
      this.initAddLine(this.m12two_json.rightline1);

      this.m12two_json.plug2.id = s8();
      this.m12two_json.plug2.rect.y+=(i==0?inith:60);
      this.m12two_json.plug2.rect.center.y+=(i==0?inith:60);
      this.initAddNode(this.m12two_json.plug2);

      this.m12two_json.rightline1_1.to.id = this.m12two_json.plug2.id;
      this.m12two_json.rightline1_1.from.y += (i==0?inith:60);
      this.m12two_json.rightline1_1.to.y += (i==0?inith:60);
      this.m12two_json.rightline1_1.from.id  =this.m12two_json.OneToTwo.id;
      this.initAddLine(this.m12two_json.rightline1_1);


    }


    for(let i=0;i<4;i++){
      this.m12two_json.OneToTwo.id  = s8();
      this.m12two_json.OneToTwo.rect.y += ((i==0?150:60));
      this.m12two_json.OneToTwo.rect.center.y += ((i==0?150:60));
      this.initAddNode(this.m12two_json.OneToTwo);
      this.m12two_json.line2.from.y += (i==0?inith:0);
      this.m12two_json.line2.from.x += (i==0?0:-18);
      this.m12two_json.line2.to.y += (i==0?inith:60);
      this.m12two_json.line2.from.id  =this.m12two_json.fenxianhe.id;
      this.m12two_json.line2.to.id = this.m12two_json.OneToTwo.id;

      this.m12two_json.line2.controlPoints[0].x += (i==0?0:-18);
      this.m12two_json.line2.controlPoints[0].y += (i==0?inith:18)
      this.m12two_json.line2.controlPoints[0].id = this.m12two_json.fenxianhe.id;
      this.m12two_json.line2.controlPoints[1].x += (i==0?0:-18);
      this.m12two_json.line2.controlPoints[1].y += (i==0?inith:60);

      this.m12two_json.line2.controlPoints[2].x += (i==0?0:-20);
      this.m12two_json.line2.controlPoints[2].y = this.m12two_json.line2.controlPoints[1].y;
      this.m12two_json.line2.controlPoints[2].id =  this.m12two_json.OneToTwo.id;

      this.initAddLine(this.m12two_json.line2);

      //上面的节点
      this.m12two_json.plug1.id = s8();
      this.m12two_json.plug1.rect.y+=(i==0?150:60);
      this.m12two_json.plug1.rect.center.y+=(i==0?150:60);
      this.initAddNode(this.m12two_json.plug1);
      //添加转接头右边连线
      this.m12two_json.rightline1.to.id = this.m12two_json.plug1.id;
      this.m12two_json.rightline1.from.y += (i==0?150:60);
      this.m12two_json.rightline1.to.y += (i==0?150:60);
      this.m12two_json.rightline1.from.id  =this.m12two_json.OneToTwo.id;
      this.initAddLine(this.m12two_json.rightline1);

      this.m12two_json.plug2.id = s8();
      this.m12two_json.plug2.rect.y+=(i==0?150:60);
      this.m12two_json.plug2.rect.center.y+=(i==0?150:60);
      this.initAddNode(this.m12two_json.plug2);

      this.m12two_json.rightline1_1.to.id = this.m12two_json.plug2.id;
      this.m12two_json.rightline1_1.from.y += (i==0?150:60);
      this.m12two_json.rightline1_1.to.y += (i==0?150:60);
      this.m12two_json.rightline1_1.from.id  =this.m12two_json.OneToTwo.id;
      this.initAddLine(this.m12two_json.rightline1_1);


    }

    // 增加分线板左边的线和组件
    const left_line = this.m12two_json.leftLine;
    left_line.from.id = this.m12two_json.fenxianhe.id;
    left_line.from.y += inith;
    left_line.to.y += inith;
    this.m12two_json.plug2.name = 'leftplug';
    this.m12two_json.plug2.rect.y = left_line.to.y - 8;
    this.m12two_json.plug2.rect.x = left_line.to.x - 33;
    this.m12two_json.plug2.id = s8();
    this.initAddNode(this.m12two_json.plug2);
    left_line.to.direction = 2;
    left_line.to.anchorIndex = 1;
    left_line.to.id = this.m12two_json.plug2.id;
    this.initAddLine(left_line);

    //画布自动变大
    const width = this.canvas.parentElem.clientWidth;
    const height = this.canvas.parentElem.clientHeight;
    if(height<maxh+700){
      this.autoresize(maxh+700,width);
    }
    //end
    // 将滚动条定位到新增的组件区域
    this.workspace.nativeElement.scrollLeft = 0;
    this.workspace.nativeElement.scrollTop = maxh;

  }

  autoresize(height:number,width:number){
    const size = {
      height:height,
      width: width
    }
    this.canvas.resize(size);
  }

  del_muban(id: string) {

    //首先记录一下删除节点所占区域大小
    let del_y = 0;
    let del_ey = 0;
    const tmp = [];
    for(const pen of this.canvas.data.pens){
      if(pen.id === id){
        del_y = pen.rect.y;
        del_ey = pen.rect.ey;
      }else if(pen.mubanId ===id) {

      }else{
        tmp.push(pen);
      }
    }
    this.canvas.data.pens = tmp;

    // 将该模板下的节点删除
    // this.canvas.data.pens = this.canvas.data.pens.filter(x => x.id !== id);
    // this.canvas.data.pens = this.canvas.data.pens.filter(x => x.mubanId !== id);
    // // TODO 存在bug,当删除一个模板的时候，应该将report_list_id-1操作，这个值只是用来记录新建模板的时候从哪里开始新建，相当于指针，永远指向最后一个模板;
    //
    // // TODO 这里有bug,节点并不会上移
    // 处在该模板下面的节点上移
    // for (const node of this.canvas.data.pens) {
    //   if(node.name ==='fenxianheMuban' && node.rect.y > del_ey){
    //     const node_id = node.id;
    //     const move_y = node.rect.y - del_y -10;
    //     for(let k in node){
    //       if(typeof node[k] === 'object'){
    //         if(node[k] instanceof Rect){
    //           (node[k]).y -= move_y;
    //           (node[k]).ey -= move_y;
    //           for(let p in node[k]){
    //             if(typeof node[k][p] === 'object'){
    //               if((node[k][p]) instanceof Point){
    //                 (<Point>node[k][p]).y -= move_y;
    //               }
    //             }
    //           }
    //         }else if(node[k] instanceof Point){
    //           (<Point>node[k]).y -= move_y;
    //         }
    //       }
    //     }
    //     this.delMubanNodeMoveUp(node_id,move_y);
    //
    //   }
    // }
    this.canvas.render();
    // 将报目表中对应的数据删除
    this.report_list = this.report_list.filter(x => x.id !== id);
  }
  delMubanNodeMoveUp(node_id:string,move_y:number){
    for(const pen of this.canvas.data.pens){
      if(pen.mubanId === node_id){
        if(pen.type===PenType.Node){
          for(let k in pen){
            if(typeof pen[k] === 'object'){
              if(pen[k] instanceof Rect){
                (pen[k]).y -= move_y;
                (pen[k]).ey -= move_y;
                for(let p in pen[k]){
                  if(typeof pen[k][p] === 'object'){
                    if((pen[k][p]) instanceof Point){
                      (<Point>pen[k][p]).y -= move_y;
                    }
                  }
                }
              }else if(pen[k] instanceof Point){
                (<Point>pen[k]).y -= move_y;
              }
            }
          }
        }else if(pen.type===PenType.Line){
          (<Line>pen).from.y -= move_y;
          (<Line>pen).to.y -= move_y;
          for (const control of (<Line>pen).controlPoints) {
            control.y -= move_y;
          }
        }
      }
    }
  }
  // 校验所有模板的电压电流
  jiaoyanAll() {
    for (const i of this.report_list) {
      this.jiaoyan(i.id);
    }
  }
  // 用来校验模板的电压和电流
  jiaoyan(id: string) {
    /**
     * 基本思路：
     *  1.定义一个列表，列表的长度为9，因为分线盒有9个接口，其中0-7为出接口，8为入接口
     * 每个接口有电压和电流，初始化为0。
     *  2.遍历所有变成实线的线条，查找from和to中的id,通过id查找到对应节点的名字name，通过name从电压电流表中取出该节点的标准电压。
     *  3.将八条出线口的电压分别放在0-7列表中，然后累加和分线盒电压比较。
     *
     * */
      // TODO 检查分线盒,首先模板内得有分线盒,这里假设的是一个模板最多只有一个分线盒
    let fenxianheId = '';
    for (const node of this.canvas.data.pens) {
      if (node.name === 'fenxianhe' && node.mubanId === id) {
        fenxianheId = node.id;
      }
    }
    if (fenxianheId) {
      let current:number = 0;
      for (const line of this.canvas.data.pens) {
        if(line.type === PenType.Line){
          let nid = (<Line>line).to.id;
          let toName = this.findTypeById(nid+'');
          if ( line.mubanId === id && toName!='plug' && toName!='leftplug' && (<Line>line).from.id === fenxianheId) {
            const toId = (<Line>line).to.id;

            let cur:number = 0;
            for (const node of this.canvas.data.pens) {
              if (node.type === PenType.Node && node.id === toId) {
                // toName = node.name;
                if(node.property){
                  cur = Number(node.property.current);
                }
              }
            }
            current = current + cur;
          }
          //如果是双通道的话,需要判断toName是不是转接头
          if(toName=='OneToTwo'){
            for(const left_line of this.canvas.data.pens){
              if(left_line.type===PenType.Line&&(<Line>left_line).from.id==nid){
                const left_line_to_id = (<Line>left_line).to.id;
                let cur:number = 0;
                for (const node of this.canvas.data.pens) {
                  if (node.type === PenType.Node && node.id === left_line_to_id) {
                    // toName = node.name;
                    if(node.property){
                      cur = Number(node.property.current);
                    }
                  }
                }
                current = current + cur;


              }
            }

          }
        }

      }
      const fromCurrent = VoltageAndCurrent.current.get('fenxianhe');
      if (current <= fromCurrent) {
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '模块' + id + '电流校验通过，入：' + fromCurrent + 'mA；出：' + current + 'mA',
          theme: 'success'
        });
      } else {
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '模块' + id + '电流校验不通过，入：' + fromCurrent + 'mA；出：' + current + 'mA',
          theme: 'error'
        });
      }
      // console.log('电流为：' + current);
    } else {
      console.log('计算电流错误:没有分线盒');
    }

  }
  onSaveLocal() {
    if (!this.canvas) {
      return;
    }
    const data = this.canvas.data;
    // console.log(data);
    FileSaver.saveAs(
      new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'}),
      `${this.data.name || 'le5le.topology'}.json`
    );
  }

  initAddNode(json: any) {
    return this.canvas.initAddNode(json);

  }
  initAddLine(json: any) {
    this.canvas.addLineByJson(json);
  }
  changebkColor() {
    // console.log(this.cavasbkColor);
    this.canvas.data.bkColor = this.cavasbkColor;

  }
  NotShowRight(){
    this.showRight = false;
  }
  ShowRight(){
    this.showRight = true;
  }
  changesize() {
    this.canvas.resize(this.size);
  }
  onSaveJson() {
    if (!this.canvas) {
      return;
    }
    const data = this.canvas.data;
    FileSaver.saveAs(
      new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' }),
      `${this.data.name || 'le5le.topology'}.json`
    );
  }
  async onSaveZip() {
    if (!this.canvas) {
      return;
    }
    const _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({
      body: '正在下载打包中，可能需要几分钟，请耐心等待...',
      theme: 'success',
    });

    const data = this.canvas.data;
    const zip = new JSZip();
    zip.file(`${this.data.name || 'le5le.topology'}.json`, JSON.stringify(data));
    await this.zipImages(zip, data.pens);

    zip.generateAsync({ type: 'blob' }).then((blob: any) => {
      FileSaver.saveAs(blob, `${this.data.name || 'le5le.topology'}.zip`);
    }, (err: string) => {
      _noticeService.notice({
        body: err,
        theme: 'error'
      });
    });
  }

  async zipImages(zip: any, nodes: any[]) {
    if (!nodes) {
      return;
    }

    for (const item of nodes) {
      if (item.image) {
        if (item.image.indexOf('/') === 0) {
          const res = await this.http.get(item.image, { responseType: 'blob' }).toPromise();
          zip.file(item.image, res, { createFolders: true });
        } else if (item.img) {
          let image = item.image;
          const pos = image.indexOf('?');
          if (pos > 0) {
            image = image.substring(0, pos);
          }
          await zip.file(image, this.saveToBlob(item.img), { createFolders: true });
        }
      }

      await this.zipImages(zip, item.children);
    }
  }

  saveToBlob(img: HTMLImageElement): Blob {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.setAttribute('origin-clean', 'false');
    canvas.width = img.width;
    canvas.height = img.height;

    const context = canvas.getContext('2d');
    (context as any).filter = window.getComputedStyle(img).filter;
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    return this.dataUrlToBlob(canvas.toDataURL('image/jpeg'));
  }

  dataUrlToBlob(dataUrl: string) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  onSavePng(options?: { type?: string; quality?: any; ext?: string; }) {
    if (!options) {
      options = {};
    }
    const name = this.data.name + (options.ext || '.png');
    this.canvas.saveAsImage(name, options.type, options.quality);
  }

  async onShare() {
    if (!this.data.id) {
      return;
    }

    if ((await this.service.Patch({
      id: this.data.id,
      image: this.data.image,
      shared: !this.data.shared
    }))
    ) {
      let str = '';
      if (!this.data.shared) {
        str = '分享成功';
      } else {
        str = '取消分享成功';
      }
      const _noticeService: NoticeService = new NoticeService();
      _noticeService.notice({
        body: str,
        theme: 'success'
      });
    } else {
      return;
    }

    this.data.shared = !this.data.shared;
    Store.set('file', this.data);
  }

  // 这个是点击左侧栏的组件时候，让右侧显示属性
  changePlugdata(data: any) {
    if(this.selectedPlug){
      this.setNodeData(data);
    }
    this.selection = {
      pen: data
    };
  }
  onMessage = (event: string, data: any) => {
    // if (event !== 'move') {
    //   console.log(event);
    //   console.log(data);
    // }
    switch (event) {
      case 'dblclick' :
        // 这里是双击的时候，如果是双击的plug电阻，就会出现弹窗
        if ('node' in data) {
          if (data.node.name === 'plug' || data.node.name === 'leftplug') {
            this.plug_type = data.node.name;
            this.showWindows = true;
            this.selectedPlug = data.node;
            console.log('触发双击');
          }
        }
        break;
      case 'line':
      case 'node':
        this.locked = data.locked;
        this.readonly = this.locked || !!this.canvas.data.locked;
        if (data.name === 'plug' || data.name==='leftplug') {
          this.selectedPlug = data;
        }
        this.selection = {
          pen: data
        };
        break;
      case 'addLine':
      case 'addNode':
        this.selection = {
          pen: data
        };
        this.locked = data.locked;
        this.readonly = this.locked || !!this.canvas.data.locked;
        this.addNodesToReportList(data);
        break;
      case 'multi':
        this.locked = true;
        if (data && data.length) {
          this.selection = {
            pens: data
          };
          for (const item of data) {
            if (!item.locked) {
              this.locked = false;
              break;
            }
          }
        }
        break;
      case 'space':
        this.selection = null;
        break;
      case 'moveOut':
        this.workspace.nativeElement.scrollLeft += 10;
        this.workspace.nativeElement.scrollTop += 10;
        break;
      case 'resize':
        if (!this.mouseMoving) {
          this.mouseMoving = true;
          // this.workspace.nativeElement.scrollLeft = this.workspace.nativeElement.scrollWidth;
          // this.workspace.nativeElement.scrollTop = this.workspace.nativeElement.scrollHeight;

          setTimeout(() => {
            this.mouseMoving = false;
          }, 2000);
        }else {
          this.size.width = this.canvas.canvas.width;
          this.size.height = this.canvas.canvas.height;
        }
        break;
      case 'scale':
        Store.set('scale', data);
        break;
      case 'locked':
        Store.set('locked', data);
        break;

      case 'delete':
        this.delPensFromReportList(data);
        this.changeLineByDeleteNode(data);
        // this.changePlug(data);
        this.canvas.animate();
        break;

      case 'moveNodes':
        break;

      // tslint:disable-next-line:no-switch-case-fall-through
      case 'moveInNode':
        break;

      // tslint:disable-next-line:no-switch-case-fall-through
      case 'moveOutNode':
        for (const id of this.remove_id) {
          if (data.id === id) {
            return;
          }
        }
        // this.addNodes(data);
        this.exchangeNode(data);
        break;

      case 'moveOutLine':
        // this.changeLine(data);
        break;
      case 'moveInLine':
        // this.delReportLine(data);
        break;

      case 'setText':
        this.updateReportByDbclick(data);

        break;
    }


  }
  // 当线连接到终端的时候就把线改为实线,并且根据两端终端的类型判断需要的接头类型,并自动生成接头
  changeLine(data: any,node:Node) {

    if (data.to.id) { // 此时说明两端都连接到了节点上
      // 如果连接的节点是plug，就不需要改变线
      if (this.findTypeById(data.to.id) === 'plug'||this.findTypeById(data.to.id)==='leftplug'||this.findTypeById(data.to.id)==='yuliu') {
        return;
      }
      // 这是因为在删除线的时候也会触发一次moveOutLine事件，如果该线是被删除的，后面的操作就不要做了。
      for (const i of this.remove_id) {
        if (data.id === i) {
          return;
        }
      }
      data.dash = 0 ; // 首先将虚线变为实线;
      // const to_nodename = this.findTypeById(data.to.id);
      const from_nodename = this.findTypeById(data.from.id);
      let text = this.generateText(data,node);
      if (from_nodename === 'fenxianhe' && data.from.anchorIndex!=8) {
        data.fromArrow = 'danFenxianheFromSolid';
        // TODO 给text赋值拼接
      }
      // if (to_nodename === 'jitingButton') {
      //   data.toArrow = 'danFenxianheSolid';
      //   // TODO 给text赋值拼接
      // }
      data.toArrow = 'danFenxianheSolid';
      if(data.from.anchorIndex==8){
        text = '';
        data.toArrow = '';
      }
      data.text = text;
      data.font.background = this.canvas.data.bkColor;

      // 将该线加入到报表中
      const id = data.mubanId;
      for(const reportlist of this.report_list) {
        if(reportlist.id == id) {
          reportlist.report_nodes.push(new ReportListNode(data.id, data.name, data.text));
          // TODO 线号板加一个
        }
      }
    }
  }
  generateText(line:Line,toNode:Node){
    let text = '';
    if(toNode.property&&toNode.property.jiekou&&toNode.property.jiekou=='M8'){
      if(toNode.property.xianzhi&&toNode.property.xianzhi=='4'){
        text = 'CN-0803-S4M-V-XXX';
      }
      if(toNode.property.xianzhi&&toNode.property.xianzhi=='3'){
       text  ='CN-0803-SM-V-XXX';
      }

    }
    return text;

  }

  // 根据id查找出节点的类型
  findTypeById(id: string) {
    for (const node of this.canvas.data.pens) {
      if (node.id === id) {
        return node.name;
      }
    }
    return null;
  }
  // 将节点的信息添加到报目表中
  addNodesToReportList(data: any) {
    // 分线盒模板
    if (this.currentFile === FileTypes.Fenxianhe) {
      // for (const id of this.remove_id) {
      //   if (data.id === id) {
      //     return;
      //   }
      // }

      //新增一个分线盒模板就是增加了一个模块
      if(data.name ==='fenxianheMuban'||data.name==='fenxianheMubanTwo'){
        data.contain = [];
        this.report_list.push(new ReportList(data.id, data.text));
        return;
      }
      //这里面要有fenxianheMuban
      for(const pen of this.canvas.data.pens) {
        if(pen.name === 'fenxianheMuban'||pen.name === 'fenxianheMubanTwo') {
          if(data.type === PenType.Node &&this.isNodeAddMuban(pen.rect,data.rect)){
            pen.contain.push(data.id);
            data.mubanId = pen.id;

            // 有些节点不需要加入到报目表中
            for (const ignore_node of this.ignoreNode) {
              if (data.name === ignore_node ) {
                return;
              }
            }
            for(const reportlist of this.report_list){
              if(reportlist.id === pen.id) {
                let mark = data.children?data.children[0].text:data.text;

                reportlist.report_nodes.push(new ReportListNode(data.id, data.name, data.text, mark))

              }
            }
          }
          if(data.type === PenType.Line && this.isLineAddMuban(pen.rect,data.from)){
            pen.contain.push(data.id);
            data.mubanId = pen.id;
            //TODO 判断该线是否生成
            if(0){
              for(const reportlist of this.report_list){
                if(reportlist.id === pen.id) {
                  reportlist.report_nodes.push(new ReportListNode(data.id, data.name, data.text, null))
                }
              }
            }
          }
        }
      }
      // this.report_list[n].report_nodes.push(new ReportListNode(data.id, data.name, 'type', data.text));

    }
  }
  //判断连线是否加入到分线板中
  isLineAddMuban(r: Rect,p:Point){
    if(p.x>=r.x&&p.x<=r.ex&&p.y>=r.y&&p.y<=r.ey){
      return true;
    }
    return false;
  }
  // 判断节点是否加入了分线盒模板中
  isNodeAddMuban(r: Rect ,p: Rect) {
    if(p.x>=r.x&&p.x<=r.ex&&p.y>=r.y&&p.y<=r.ey){
      return true;
    }
    return false;

  }

  // 删除节点和连线时将报目单中的相应节点和连线删除, 这个函数传进来的是List类型的数据，pen[]
  delPensFromReportList(data: any) {
    if (this.currentFile === FileTypes.Fenxianhe) {
      for (const pen of data) {
        // tslint:disable-next-line:radix
        const muban_id = pen.mubanId;
        this.remove_id.push(pen.id);
        const id = pen.id;
        // 删除对应id的数据
        for(const reportlist of this.report_list){
          if(reportlist.id === muban_id){
            reportlist.report_nodes = reportlist.report_nodes.filter(x => x.node_id !== id);
          }
        }
        // 将该节点或连线从fenxianheMuban的contain中删除
        for(const muban of this.canvas.data.pens){
          if(muban.id === muban_id){
            muban.contain = muban.contain.filter(x => x !== id);
          }
        }
        // this.report_list[n].report_nodes = this.report_list[n].report_nodes.filter(x => x.node_id !== id);
      }
      // console.log(this.report_list);
    }
  }
  changePlug(data:any){
    for(const node of data){
      if(node.type === PenType.Node){
        for (const n of this.canvas.data.pens) {
          if (n.name === 'plug') {
            if (this.calculateDistance(node.rect.x, n.rect.x) && this.calculateDistance(node.rect.y, n.rect.y)) {
              n.strokeStyle = '#f50000ff';
            }
          }
          if (n.name === 'leftplug') {
            if (this.calculateDistance(node.rect.ex, n.rect.ex) && this.calculateDistance(node.rect.ey, n.rect.ey)) {
              n.strokeStyle = '#f50000ff';
            }
          }
        }
      }
    }
  }

  changeLineByDeleteNode(data: any) {
    for (const node of data) {
      if(node.type === PenType.Node){
        // 当删除底层部件节点的时候，先把线的状态改变一下
        for (const line of this.canvas.data.pens) {
          if (line.type === PenType.Line && (<Line>line).to.id === node.id) {
            // console.log(line);
            line.text = '';
            (<Line>line).toArrow = '';
            (<Line>line).fromArrow = '';
            line.dash = 1;
            // 把plug状态改变一下
            for (const n of this.canvas.data.pens) {
              if (n.name === 'plug') {
                if (this.calculateDistance(node.rect.x, n.rect.x) && this.calculateDistance(node.rect.y, n.rect.y)) {
                  n.strokeStyle = '#f50000ff';
                  // 把线和plug连在一起
                  (<Line>line).to.id = n.id;
                }
              }
              if (n.name === 'leftplug') {
                if (this.calculateDistance(node.rect.ex, n.rect.ex) && this.calculateDistance(node.rect.ey, n.rect.ey)) {
                  n.strokeStyle = '#f50000ff';
                  // 把线和plug连在一起
                  (<Line>line).to.id = n.id;
                }
              }
            }
            // 把线从报目表中删除
            for(const reportlist of this.report_list){
              if(reportlist.id === line.mubanId){
                reportlist.report_nodes = reportlist.report_nodes.filter(x => x.node_id !== line.id);
              }
            }
          }
        }
      }
    }
  }


  onChangeProps(props: any) {
    if (this.canvas.data.locked) {
      return;
    }
    switch (props.type) {
      case 'node':
      case 'addNode':
        this.canvas.updateProps(props.data);
        break;
      case 'line':
      case 'addLine':
        this.canvas.updateProps();
        break;
      // case 'multi':
      //   this.canvas.alignNodes(props.align);
      //   break;
    }
  }

  onAnimateChange() {
    this.canvas.animate();
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (event.clientY + 360 < document.body.clientHeight) {
      this.contextmenu = {
        left: event.clientX + 'px',
        top: event.clientY + 'px'
      };
    } else {
      this.contextmenu = {
        left: event.clientX + 'px',
        bottom: document.body.clientHeight - event.clientY + 'px'
      };
    }
  }

  onClickDocument(event: MouseEvent) {
    this.contextmenu = null;
  }


  toSVG() {
    const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200);
    for (const item of this.canvas.data.pens) {
      item.render(ctx);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    mySerializedSVG = mySerializedSVG.replace(
      '<defs/>',
      `<defs>
    <style type="text/css">
      @font-face {
        font-family: 'topology';
        src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
      }
    </style>
  </defs>`
    );

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

    const urlObject: any = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute('download', this.data.name + '.svg');
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  }

  // 控制底层组件的弹窗
  changeShowWindows(data: any) {
    this.showWindows = data;
  }


  /**
   * 当拖动底层部件的时候，离开节点触发moveoutNodes事件的时候，判断data.rect.x和data.rect.y的值，
   * 需要遍历所有的组件，找到plug类型的组件，将他们的rect.x和rect.y记录下来，当data.rect.x和rect.x的距离比较近同时y也比较近的话，就用data的节点代替plug节点
   * 将plug节点删除，将plug的id赋值给底层部件。这样避免去更改线的to.id,但是这样更改id会出现问题，因为之前添加节点的id就会消失了，
   * 在报目表中没办法更新节点了,需要将报目表中的id也更换过来
   * 所以不要更换id,而是将line中的to.id换成现在的id
   */
  exchangeNode(data: any,isChangeLine?:boolean) {
    //这里是移动出plug或者leftplug的时候，线和节点的状态不需要改变
    if (data.name === 'plug' || data.name==='leftplug') {
      return;
    }
    const mubanId = data.mubanId;
    let flag = true;
    if(isChangeLine!=null){
      flag = isChangeLine;
    }
    //双通道模板中不要改变线的状态了
    // for(const node of this.canvas.data.pens){
    //   if(node.id === mubanId && node.name ==='fenxianheMubanTwo'){
    //     flag = false;
    //   }
    // }
    for (const node of this.canvas.data.pens) {
      if (node.name === 'plug') {
        if (this.calculateDistance(node.rect.x, data.rect.x) && this.calculateDistance(node.rect.y, data.rect.y)) {
          // this.canvas.removeNode(node);
          node.locked = true;
          node.dash = 1;
          node.strokeStyle = this.canvas.data.bkColor;
          for (const line of this.canvas.data.pens) {
            if (line.type === PenType.Line &&  (<Line>line).to.id === node.id) {
              (<Line>line).to.id = data.id;
              if(flag){
                this.changeLine(line,data);
              }
            }
          }
          // data.id = node.id;
          // data.locked = true;
        }
      }else if (node.name === 'leftplug') {
        if (this.calculateDistance(node.rect.ex, data.rect.ex) && this.calculateDistance(node.rect.ey, data.rect.ey)) {
          // this.canvas.removeNode(node);
          node.locked = true;
          node.dash = 1;
          node.strokeStyle = this.canvas.data.bkColor;
          for (const line of this.canvas.data.pens) {
            if (line.type === PenType.Line &&  (<Line>line).to.id === node.id) {
              (<Line>line).to.id = data.id;
              if(flag){
                this.changeLine(line,data);
              }
            }
          }
          // data.locked = true;
        }
      }
    }

  }

  /**
   * 因为节点选择了双通道的，所以连线要变成一根线了，首先需要确定这个按钮替换了哪一个plug，然后通过plug的id找到line，然后将line删除或者隐藏
   * 通过line再向前寻找转接头OneToTwo，将转接头删除或者隐藏，通过转接头向前寻找另一条line，将这条line的终点和控制点改变，起点不需要改变。
   */
  changeLineByNode(data:any){
      const nodeId = data.id;
      let onetotwoId;
      let toPoint = null;
      for(let line of this.canvas.data.pens){
        //找到左边的那条直线
        if(line.type==1 && line.name==='line' && (<Line>line).to.id === nodeId){
          onetotwoId = (<Line>line).from.id ;
          (<Point>toPoint) = (<Line>line).to;
          //下面是删除连线
          this.canvas.data.pens = this.canvas.data.pens.filter(x => x.id !== (<Line>line).id)
          //将线隐藏
          // (<Line>line).strokeStyle = this.canvas.data.bkColor;
          break;
        }
      }
      for(let pen of this.canvas.data.pens){
        //找到转接头
        if(pen.type===0&&(<Node>pen).id===onetotwoId){
          this.canvas.data.pens = this.canvas.data.pens.filter(x => x.id !== onetotwoId)
        }
      }
      let plugId = null;//位于同一个转接头上的另一个节点
      //找到和该线位于同一个转接头上的线，将其隐藏或者删除
      for(let line of this.canvas.data.pens){
        if(line.type==1 && (<Line>line).from.id === onetotwoId){
          // (<Line>line).strokeStyle = this.canvas.data.bkColor;
          plugId = (<Line>line).to.id;
          this.canvas.data.pens = this.canvas.data.pens.filter(x => x.id !== (<Line>line).id)
          break;
        }
      }
      for(let node of this.canvas.data.pens){
        if(node.id===plugId){
          this.canvas.data.pens = this.canvas.data.pens.filter(x => x.id !== node.id)
        }
      }

      for(let line of this.canvas.data.pens){
        //找到左边的那条直线
        if(line.type==1&&(<Line>line).to.id===onetotwoId){

          (<Line>line).to = toPoint;
          (<Line>line).controlPoints[1].y = toPoint.y;
          (<Line>line).controlPoints[2].y = toPoint.y;
          (<Line>line).textRect.y = toPoint.y-10;
          (<Line>line).textRect.x +=10;
          this.changeLine(<Line>line,data);
          console.log(toPoint)
          break;
        }
      }



  }
  /**
   * 这里处理从popupWindows中传过来的数据，将传过来的数据new出一个节点，覆盖在双击选中的plug上，选中的plug被记录在了selectedPlug中
   * 需要把selectedPlug中的rect.x和rect.y赋值给新创建的节点。
   * */
  setNodeData(data: any) {
    //如果在单通道中添加双通道组件，会提示添加不成功
    if(data.property&&data.property.tongdao==2&&this.selectedPlug.plugType==1){
      const _noticeService: NoticeService = new NoticeService();
      _noticeService.notice({
        body: "单通道中无法添加双信号组件",
        theme: 'error'
      });
      return;
    }
    data.rect.x = this.selectedPlug.rect.x;
    data.rect.y = this.selectedPlug.rect.y;
    this.selectedPlug = null;
    // 把新节点添加上0 0
    const node = this.initAddNode(data);

    let flag = true;
    //如果新添加的节点是双通道的，并且添加在了双通道模板中
    if(node.property&&node.property.tongdao&&node.property.tongdao===2){
      const mubanId = node.mubanId;

      for(const pen of this.canvas.data.pens){
        if(pen.id===mubanId&&pen.name==='fenxianheMubanTwo'){
          flag = false;
        }
      }
    }
    // 调用更换节点
    this.exchangeNode(node,flag);
    if(!flag){
      this.changeLineByNode(node);
    }



  }
  setNodeLeftData(data:any){
    console.log(data);
    const fenxianhe = this.findFenxianheByLeftPlug(this.selectedPlug);
    let length = data.linelength;
    fenxianhe.text = fenxianhe.text.slice(0,-3) + length;

    let leftnode = data.node;
    if(leftnode.name==="sanxian"){
      fenxianhe.text = fenxianhe.text.replace("XX","01");
    }
    if(leftnode.name=="hangxian"){
      fenxianhe.text = fenxianhe.text.replace("XX","26");
    }
    let leftjixing = data.leftjixing;
    if(leftjixing=='NPN'){
      fenxianhe.text = fenxianhe.text.replace("X","N");
    }
    if(leftjixing=='PNP'){
      fenxianhe.text = fenxianhe.text.replace("X","P");
    }
    const updatedata = {
      mubanid:fenxianhe.mubanId,
      id:fenxianhe.id,
      text:fenxianhe.text
    }
    console.log(fenxianhe)
    this.updateReport(updatedata);


    leftnode.rect.ex = this.selectedPlug.rect.ex;
    leftnode.rect.ey = this.selectedPlug.rect.ey;
    leftnode.rect.x = leftnode.rect.ex - leftnode.rect.width *  this.canvas.data.scale;;
    leftnode.rect.y = leftnode.rect.ey - leftnode.rect.height *  this.canvas.data.scale;;
    this.selectedPlug = null;
    // 把新节点添加上
    const node = this.initAddNode(leftnode);
    this.exchangeNode(leftnode);
  }
  findFenxianheByLeftPlug(node:Node){
    const leftNodeId = node.id;
    let fenxianheId;
    for(let line of this.canvas.data.pens){
      //找到左边的那条直线
      if(line.type==1&&(<Line>line).to.id===leftNodeId){
        fenxianheId = (<Line>line).from.id;
        break;
      }
    }
    let Fenxianhe;
    for(let node of this.canvas.data.pens){
      if(node.type==0&&(<Node>node).id==fenxianheId){
        Fenxianhe = <Node>node;
      }
    }
    return Fenxianhe;

  }


  calculateDistance(from: number, to: number) {
    return Math.abs(from - to) < 5;
  }

  // 更加html中数据生成为excel文件
  exportTable() {
    const blob = new Blob([document.getElementById('exportableTable').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    FileSaver.saveAs(blob, this.data.name + '.xls');
  }

  showExport(){
    this.showExportWord = true;
  }

  // 计算竖版图片
  exportWordHorizontal(){
    // this.showExportWord = false;
    // window.print();
    const ret = this.helper.exportWordHorizontal(this.canvas,this.word_name,this.word_company,
      this.data.name)
    if(ret){
      this.showExportWord = false;
    }
  }
  //横版下载
  exportWordViolently(){
    const ret = this.helper.exportWordViolently(this.canvas,this.word_name,this.word_company,
      this.data.name)
    if(ret){
      this.showExportWord = false;
    }

  }

  updateReport(data:any){
    if(!data.mubanid){
      for(const list of this.report_list){
        if(list.id === data.id){
          list.muban_name = data.text;
        }
      }
    }
    if(data.mubanid){
      for(const list of this.report_list){
        if(list.id === data.mubanid){
          for (const node of list.report_nodes){
            if(node.node_id === data.id){
              if(data.type===1){
                node.node_type = data.text;
              }else{
                node.remarks = data.text;
                node.node_type = data.text;
              }

            }

          }
        }
      }
    }
    // console.log(data.text);
    // console.log(data.id);
  }
  // 双击出文本框更改文字的时候，也要更新ReportList中对应的数据。
  updateReportByDbclick(data:any){
    if(data.parentId && data.name === 'text'){
      for(const list of this.report_list){
        for(const node of list.report_nodes){
          if(node.node_id === data.parentId){
            node.remarks = data.text;
          }
        }
      }

    }

  }

  ngOnDestroy() {
    (window as any).canvas = null;
    this.subUser.unsubscribe();
    this.subRoute.unsubscribe();
    this.canvas.destroy();
  }

}
