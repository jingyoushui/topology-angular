import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Topology} from 'topology-core';
import {Options} from 'topology-core/options';
import {s8} from 'topology-core/uuid/uuid';

import * as FileSaver from 'file-saver';
import {Store} from 'le5le-store';
import {NoticeService} from 'le5le-components/notice';

import {HomeService} from './home.service';
import {Props} from './props/props.model';
import {environment} from 'src/environments/environment';
import {CoreService} from '../core/core.service';
import {TopologyService} from './topology.service';
import {Tools} from './tools/config';
import {Node} from 'topology-core/models/node';
// 树型插件
import {M8json} from './json/M8_json';
import {ReportList} from './report-list/reportList';
import {ReportListNode} from './report-list/reportListNode';


import {VoltageAndCurrent} from './parameter/VoltageAndCurrent';
import {FileTypes} from 'topology-core/models/status';


declare var C2S: any;
declare var JSZip: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(document:keydown)': 'onkeyDocument($event)',
    '(document:click)': 'onClickDocument($event)'
  }
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('workspace', {static: true}) workspace: ElementRef;
  tools: any[] = Tools;
  canvas: Topology;
  cavasbkColor = '#ffffffff';
  // canvaslines: Array<Line>;
  canvasOptions: Options = {};
  // 这个是选中的节点数据
  selected: Props;
  subMenu: any;
  size = {
    width: 1500,
    height: 450
  };
  data = {
    id: '',
    version: '',
    data: {nodes: [], lines: [], bkColor: '#ffffffff', filetype: 0},
    name: '空白文件',
    desc: '',
    image: '',
    userId: '',
    shared: false
  };
  currentFile: FileTypes;
  // 下面的是弹窗中的属性
  jixing = '';
  leixing = '';
  xianzhi = '';
  jiekou = '';
  current = 0;
  name = '';
  desc = '';

  // end
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' }
  ];
  // 每一个模板的高度,固定为430
  muban_height = 450;
  report_list_id = 1;
  // 用来生成报目表的数据,将整个画板分成多个区域,每个区域都有名字和id,nodes[],lines[].
  // report_node : id, name, 型号, 备注
  report_list2: ReportList[] = [];
  showReport = false;
  showWindows = false;
  // 中英对应表
  zh_en = new Map([
    [ 'fenxianhe', '分线盒'],
    [ 'circle', '圆形' ],
    [ 'triangle', '三角形' ],
    [ 'jitingButton', '急停按钮' ],
    [ 'jitingButton2', '急停按钮' ],
    [ 'OKNG', 'OK/NG显示' ],
    [ 'zhongji', '中继器' ],
    [ 'polyline', '电缆'],
    ['flangeCouplingConnector', '法兰连接器']
  ]);
  remove_id = [];
  icons: { icon: string; iconFamily: string; }[] = [];
  readonly = false;

  user: any;
  subUser: any;

  mouseMoving = false;

  contextmenu: any;
  // 这是选中的节点列表
  selNodes: any;
  // 选中的待更换的plug节点
  selectedPlug: any;
  locked = false;

  editFilename = false; // 文件名
  editFiledesc = false; // 文件描述
  // 这是模块上的名字
  json = {
    text: '模块1',
    rect: {
      width: 160,
      height: 30,
      x: 4,
      y: 35
    },
    font: {
      textAlign: 'center',
    },
    strokeStyle: '#e7e27aff',
    fillStyle: '#e7e27aff',
    // locked: true,
    name: 'rectangle',
    mubanId: 1,
  };
  // m8模板初始化
  m8_json: {
    lines: any;
    fenxianhe: any;
    plugs: any;
  };
  divNode: any;
  ignoreNode = ['plug', 'rectangle'];

  subRoute: any;
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
    '#E7E27A',
    '#FFFFFF',
  ];

  constructor(
    private service: HomeService,
    private topologySrv: TopologyService,
    private coreService: CoreService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.user = Store.get('user');
    this.subUser = Store.subscribe('user', (user: any) => {
      this.user = user;
      if (this.data && user && this.data.userId !== this.user.id) {
        this.data.shared = false;
        this.data.id = '';
      }
    });
    console.log('home init');
    this.canvasOptions.on = this.onMessage;

    this.canvasOptions.height = this.muban_height;
    this.subMenu = Store.subscribe('clickMenu', (menu: { event: string; data: any; }) => {
      if (!this.canvas) {
        return;
      }
      switch (menu.event) {
        case 'newF':
          this.onNew();
          break;
        case 'newK':
          this.onNewKong();
          break;
        case 'open':
          setTimeout(() => {
            this.selected = null;
          });
          if (!this.data.id) {
            this.onNew();
          }
          this.onOpenLocal();
          break;
        case 'openZip':
          this.onOpenZip();
          break;
        case 'save':
          this.save();
          break;
        case 'saveAs':
          this.data.id = '';
          this.save();
          break;
        case 'down':
          this.onSaveLocal();
          break;
        case 'downZip':
          this.onSaveZip();
          break;
        case 'downPng':
          this.onSavePng(menu.data);
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
        case 'parse':
          this.canvas.parse();
          break;
        case 'share':
          this.onShare();
          break;
        case 'lock':
          this.readonly = menu.data;
          this.canvas.lock(menu.data);
          break;
        case 'lineName':
          this.canvas.data.lineName = menu.data;
          break;
        case 'fromArrowType':
          this.canvas.data.fromArrowType = menu.data;
          break;
        case 'toArrowType':
          this.canvas.data.toArrowType = menu.data;
          break;
        case 'scale':
          this.canvas.scaleTo(menu.data);
          break;
        case 'fullscreen':
          this.workspace.nativeElement.requestFullscreen();
          setTimeout(() => {
            this.canvas.resize();
            this.canvas.overflow();
          }, 500);
          break;
      }
    });

    // Wait for parent dom render.
    setTimeout(() => {

      this.canvas = new Topology(this.workspace.nativeElement, this.canvasOptions);
      this.size.width = this.canvas.parentElem.clientWidth;
      this.size.height = this.canvas.parentElem.clientHeight;
      this.canvas.resize(this.size);
      this.subRoute = this.activateRoute.queryParamMap.subscribe(params => {
        if (params.get('id')) {
          this.onOpen({id: params.get('id'), version: params.get('version')});
        } else {
          this.data = {
            id: '',
            version: '',
            data: {nodes: [], lines: [], bkColor: '#ffffffff', filetype: 0},
            name: '空白文件',
            desc: '',
            image: '',
            userId: '',
            shared: false
          };
        }
      });
      // For debug
      (window as any).canvas = this.canvas;
      // End
    });

    this.topologySrv.canvasRegister();
  }
  onkeyDocument(key: KeyboardEvent) {
    switch (key.keyCode) {
      case 79:
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selected = null;
          });
          if (!this.data.id) {
            this.onNew();
          }
          this.onOpenLocal();
        }
        break;
      case 73:
        if (key.ctrlKey) {
          setTimeout(() => {
            this.selected = null;
          });
          if (key.shiftKey) {
            this.onOpenZip();
          } else {
            this.onOpenLocal();
          }
        }
        break;
      case 83:
        if (key.ctrlKey) {
          if (key.shiftKey) {
            this.data.id = '';
            this.save();
          } else if (key.altKey) {
            this.onSaveLocal();
          } else {
            this.save();
          }
        }
        break;
      case 88:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onCut();
        }
        break;
      case 67:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onCopy();
        }
        break;
      case 86:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.onParse();
        }
        break;
      case 89:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          this.canvas.redo();
        }
        break;
      case 90:
        if (key.ctrlKey && key.target === this.canvas.divLayer.canvas) {
          if (key.shiftKey) {
            this.canvas.redo();
          } else {
            this.canvas.undo();
          }
        }
        break;
    }

    if (key.ctrlKey && key.keyCode === 83) {
      key.preventDefault();
      key.returnValue = false;
      return false;
    }
  }

  onNew() {
    // @ts-ignore
    // @ts-ignore
    this.data = {
      id: '',
      version: '',
      data: {nodes: [], lines: [], bkColor: '#ffffffff', filetype: 0},
      name: '空白文件',
      desc: '',
      image: '',
      userId: '',
      shared: false
    };
    this.data.data.filetype = FileTypes.Fenxianhe;
    this.currentFile = FileTypes.Fenxianhe;
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
    this.size = {
      width: 1500,
      height: 450
    };
    this.canvas.resize(this.size);
    this.json = {
      text: '模块1',
      rect: {
        width: 160,
        height: 30,
        x: 4,
        y: 35
      },
      font: {
        textAlign: 'center',
      },
      strokeStyle: '#e7e27aff',
      fillStyle: '#e7e27aff',
      // locked: true,
      name: 'rectangle',
      mubanId: 1,
    };
    this.initAddNode(this.json);
    this.report_list_id = 1;
    this.report_list2 = [];
    this.report_list2.push(new ReportList(1, '模块1'));
    this.report_list2[0].muban_name = this.json.text;
    this.initNewM8();
    this.router.navigate(['/workspace']);

  }

  onNewKong() {
    // @ts-ignore
    // @ts-ignore
    this.data = {
      id: '',
      version: '',
      data: {nodes: [], lines: [], bkColor: '#ffffffff', filetype: 0},
      name: '空白文件',
      desc: '',
      image: '',
      userId: '',
      shared: false
    };
    this.currentFile = FileTypes.Default;
    this.size.width = this.canvas.parentElem.clientWidth;
    this.size.height = this.canvas.parentElem.clientHeight;
    this.canvas.resize(this.size);
    this.report_list2 = [];
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
    this.router.navigate(['/workspace']);

  }
  // 初始化和新建分线盒文件时, 提前将分线盒和八根线绘制好
  initNewM8() {
    this.m8_json = (new M8json()).M8_json;
    this.m8_json.fenxianhe.id = s8();
    this.initAddNode(this.m8_json.fenxianhe);
    for (const line of this.m8_json.lines) {
      line.from.id = line.controlPoints[0].id = this.m8_json.fenxianhe.id;
      this.m8_json.plugs.rect.y = line.to.y - 10;
      this.m8_json.plugs.id = s8();
      this.initAddNode(this.m8_json.plugs);
      line.to.direction = 4;
      line.to.anchorIndex = 0;
      line.to.id = this.m8_json.plugs.id;
      this.initAddLine(line);
    }
    // 堆pulg设置动画
    for (const node of this.canvas.data.nodes) {
      if (node.name === 'plug') {
        node.animateType = 'warning';
        this.setPlugAnimate(node);
        node.animatePlay = true;
        this.canvas.animate();
      }
    }
  }

  async onOpen(data: { id: string; version?: string; }) {
    const ret = await this.service.Get(data);
    if (!ret) {
      this.router.navigateByUrl('/workspace');
      return;
    }
    this.currentFile = ret.data.filetype;
    const ret2 = await this.service.GetReportList(data);
    if (ret2) {
      this.report_list2 = ret2.data.data;
      // 这里解决页面刷新后新增模板会重叠的bug
      this.report_list_id = ret2.data.data.length;
      console.log(this.report_list_id);
      // 这里解决刷新时页面大小的问题
      if (ret.data.filetype === FileTypes.Fenxianhe) {
        this.size.height = this.muban_height * this.report_list_id;
        this.canvas.resize(this.size);
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

  onOpenLocal() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      const elem: any = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const name = elem.files[0].name.replace('.json', '');
        this.data.name = name;
        Store.set('file', this.data);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const text = e.target.result + '';
          try {
            const data = JSON.parse(text);
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
                shared: false
              };
              this.canvas.open(data);
            }
          } catch (e) {
            return false;
          }
        };
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  }

  onOpenZip() {
    if (!this.user) {
      const _noticeService: NoticeService = new NoticeService();
      _noticeService.notice({
        body: '请先登录：上传文件需要身份认证！',
        theme: 'error'
      });
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async event => {
      const elem: any = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const zip = new JSZip();
        await zip.loadAsync(elem.files[0]);

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
            const file = await this.service.Upload(await zip.file(key).async('blob'), true, filename + ext);
            if (file) {
              data = data.replace(new RegExp(key, 'gm'), file.url);
              await this.service.AddImage(file.url);
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
              shared: false
            };
            this.canvas.open(data);
            Store.set('file', this.data);
          }
        } catch (e) {
          return false;
        }
      }
    };
    input.click();
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
              data: this.report_list2
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

  onEditFile(input: HTMLElement) {
    this.editFilename = true;
    setTimeout(() => {
      input.focus();
    });
  }

  onEditFileDesc(input: HTMLElement) {
    this.editFiledesc = true;
    setTimeout(() => {
      input.focus();
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

  newM8() {

    this.size.height += this.muban_height;
    // @ts-ignore
    this.size.width = this.canvas.parentElem.clientWidth;
    this.canvas.resize(this.size);
    this.report_list_id += 1;
    // 增加模块名称组件
    this.json.rect.y = 30 + this.muban_height * (this.report_list_id - 1);
    this.json.text = '模块' + this.report_list_id;
    this.json.mubanId  = this.report_list_id;

    this.report_list2.push(new ReportList(this.report_list_id, this.json.text));
    this.initAddNode(this.json);
    // end
    // 增加分线盒和线
    this.m8_json.fenxianhe.id  = s8();
    // TODO 这里有bug,当页面刷新的时候，m8_json中的数据会重新加载进来，就会是初始值了
    // 解决方法，第一种：当模板中的节点和线画上了之后，将m8_json中的值再做相反的操作改回去，这样保证每次都是从初始值加上高度×i
    // 第二种方法：另定义一个文件，这个文件中的数据只读不更改，通过该文件中的值作为初始值加上高度×i
    // 第一种解决方案实现比较简单，这里使用第一种方法
    const i = this.report_list_id - 1;
    this.m8_json.fenxianhe.rect.y += this.muban_height * i;
    this.m8_json.fenxianhe.mubanId += i;
    this.initAddNode(this.m8_json.fenxianhe);


    for (const line of this.m8_json.lines) {
      line.from.id = line.controlPoints[0].id = this.m8_json.fenxianhe.id;
      line.from.y += this.muban_height * i;
      line.to.y += this.muban_height * i;
      line.controlPoints[0].y += this.muban_height * i;
      line.controlPoints[1].y += this.muban_height * i ;
      // 把电阻plug加上去
      this.m8_json.plugs.rect.y = line.to.y - 10;
      this.m8_json.plugs.id = s8();
      this.m8_json.plugs.mubanId += i;
      this.initAddNode(this.m8_json.plugs);

      line.to.direction = 4;
      line.to.anchorIndex = 0;
      line.to.id = this.m8_json.plugs.id;

      // 设置线的Muban_id
      line.mubanId = Math.floor(line.from.y / this.muban_height) + 1;
      this.initAddLine(line);
    }

    // 堆pulg设置动画
    for (const node of this.canvas.data.nodes) {
      if (node.name === 'plug' && node.mubanId === this.report_list_id) {
        node.animateType = 'warning';
        this.setPlugAnimate(node);
        node.animatePlay = true;
        this.canvas.animate();
      }
    }

    // 这里做相反的操作，保证M8_json的数据不被改变
    setTimeout(() => {
      this.m8_json.fenxianhe.rect.y -= this.muban_height * i;
      this.m8_json.fenxianhe.mubanId -= i;
      this.m8_json.plugs.mubanId -= i;
      for (const line of this.m8_json.lines) {
        line.from.y -= this.muban_height * i;
        line.to.y -= this.muban_height * i;
        line.controlPoints[0].y -= this.muban_height * i;
        line.controlPoints[1].y -= this.muban_height * i ;
      }
    }, 1000);
    // end
    console.log(this.report_list2);

  }
  del_muban(id: number) {

    // 将该模板下的节点删除
    this.canvas.data.nodes = this.canvas.data.nodes.filter(x => x.mubanId !== id);
    this.canvas.data.lines = this.canvas.data.lines.filter(x => x.mubanId !== id);
    // TODO 存在bug,当删除一个模板的时候，应该将report_list_id-1操作，这个值只是用来记录新建模板的时候从哪里开始新建，相当于指针，永远指向最后一个模板;
    this.report_list_id -= 1;

    // TODO 这里有bug,节点并不会上移
    // 处在该模板下面的节点上移
    for (const node of this.canvas.data.nodes) {
      if (node.mubanId > id) {
        node.mubanId -= 1;
        node.rect.y -= this.muban_height;
      }
    }
    // 处在该模板下面的线上移
    for (const line of this.canvas.data.lines) {
      if (line.mubanId > id) {
        line.from.y -= this.muban_height;
        line.to.y -= this.muban_height;
        line.mubanId -= 1;
        for (const control of line.controlPoints) {
          control.y -= this.muban_height;
        }
      }
    }
    this.canvas.render();
    this.size.height -= this.muban_height;
    // @ts-ignore
    this.size.width = this.canvas.parentElem.clientWidth;
    this.canvas.resize(this.size);

    // 将报目表中对应的数据删除
    this.report_list2 = this.report_list2.filter(x => x.muban_id !== id);
  }
  // 校验所有模板的电压电流
  jiaoyanAll() {
    for (const i of this.report_list2) {
      this.jiaoyan(i.muban_id);
    }
  }
  // 用来校验模板的电压和电流
  jiaoyan(id: number) {
    console.log(id);
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
    for (const node of this.canvas.data.nodes) {
      if (node.mubanId === id && node.name === 'fenxianhe') {
        fenxianheId = node.id;
      }
    }
    if (fenxianheId) {
      let current = 0;
      for (const line of this.canvas.data.lines) {
        if (line.mubanId === id && line.to.id && line.from.id === fenxianheId) {
          const toId = line.to.id;
          let toName = '';
          for (const node of this.canvas.data.nodes) {
            if (node.id === toId) {
              toName = node.name;
            }
          }
          current += VoltageAndCurrent.current.get(toName);
          // for (const muban of this.report_list2) {
          //   if (muban.muban_id === id) {
          //     for (const node of muban.report_nodes) {
          //       if (node.node_id === toId) {
          //
          //       }
          //     }
          //   }
          // }

        }
      }
      const fromCurrent = VoltageAndCurrent.current.get('fenxianhe');
      if (current <= fromCurrent) {
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '模块' + id + '电流校验通过，入：' + fromCurrent + 'A；出：' + current + 'A',
          theme: 'success'
        });
      } else {
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '模块' + id + '电流校验不通过，入：' + fromCurrent + 'A；出：' + current + 'A',
          theme: 'error'
        });
      }
      console.log('电流为：' + current);
    } else {
      console.log('计算电流错误:没有分线盒');
    }

  }
  onSaveLocal() {
    if (!this.canvas) {
      return;
    }
    const data = this.canvas.data;
    console.log(data);
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
  changesize() {
    this.canvas.resize(this.size);
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
    await this.zipImages(zip, data.nodes);

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

  onCut() {
    this.canvas.cut();
  }
  onCopy() {
    this.canvas.copy();
  }
  onParse() {
    this.canvas.parse();
  }
 // 这个是点击左侧栏的组件时候，让右侧显示属性
  changePlugdata(data: any) {
    this.selected = {
      type: 'node',
      data
    };
}
  onMessage = (event: string, data: any) => {
    if (event !== 'moveNodes') {
      console.log(event);
      console.log(data);
    }
    switch (event) {
      case 'dblclick' :
        // 这里是双击的时候，如果是双击的plug电阻，就会出现弹窗
        if ('node' in data) {
          if (data.node.name === 'plug') {
            this.showWindows = true;
            this.selectedPlug = data.node;
            console.log('触发双击');
          }
        }
        break;
      case 'node':
        if (data.name === 'plug') {
          break;
        }
        this.selNodes = [data];
        this.selected = {
          type: 'node',
          data

        };
        console.log(this.selected);
        this.locked = data.locked;
        this.readonly = this.locked || !!this.canvas.data.locked;
        break;
      case 'addNode':
        this.selNodes = [data];
        this.selected = {
          type: 'node',
          data
        };
        this.locked = data.locked;
        this.readonly = this.locked || !!this.canvas.data.locked;
        this.addNodes(data);
        break;
      case 'line':
      case 'addLine':
        this.selected = {
          type: 'line',
          data
        };
        this.locked = data.locked;
        this.readonly = this.locked || !!this.canvas.data.locked;
        break;
      case 'multi':
        this.locked = true;
        if (data.nodes && data.nodes.length) {
          this.selNodes = data.nodes;
          for (const item of data.nodes) {
            if (!item.locked) {
              this.locked = false;
              break;
            }
          }
        }
        if (this.locked && data.lines) {
          for (const item of data.lines) {
            if (!item.locked) {
              this.locked = false;
              break;
            }
          }
        }
        this.selected = {
          type: event,
          data
        };
        break;
      case 'space':
        setTimeout(() => {
          this.selected = null;
          this.selNodes = null;
        });
        break;
      case 'moveOut':
        // this.workspace.nativeElement.scrollLeft += 10;
        // this.workspace.nativeElement.scrollTop += 10;
        break;
      case 'resize':
        if (!this.mouseMoving) {
          this.mouseMoving = true;
          this.workspace.nativeElement.scrollLeft = this.workspace.nativeElement.scrollWidth;
          this.workspace.nativeElement.scrollTop = this.workspace.nativeElement.scrollHeight;
          setTimeout(() => {
            this.mouseMoving = false;
          }, 2000);
        }

        break;
      case 'scale':
        Store.set('scale', data);
        break;
      case 'locked':
        Store.set('locked', data);
        break;

      case 'delete':
        this.deleteNodes(data);
        this.changeLineByDeleteNode(data);
        break;

      case 'moveNodes':
        for (const item of data) {
          if (item.name === 'fenxianhe') {
            const w = this.canvas.canvas.width / 3;
            if (item.rect.x < w ) {
              item.rect.x = w ;
              item.textRect.x = w;
              item.iconRect.x = w;
            } else if (item.rect.x + item.rect.width > 2 * w ) {
              item.rect.x = 2 * w - item.rect.width;
              item.textRect.x = 2 * w - item.rect.width;
              item.iconRect.x = 2 * w - item.rect.width;
            }
          }
        }
        break;

      // tslint:disable-next-line:no-switch-case-fall-through
      case 'moveInNode':
        this.delete1(data);
        break;

      // tslint:disable-next-line:no-switch-case-fall-through
      case 'moveOutNode':
        for (const id of this.remove_id) {
          if (data.id === id) {
            return;
          }
        }
        this.addNodes(data);
        this.exchangeNode(data);
        break;

      case 'moveOutLine':
        // this.changeLine(data);
        break;
      case 'moveInLine':
        // this.delReportLine(data);
        break;
    }


  }
  // 当线连接到终端的时候就把线改为实线,并且根据两端终端的类型判断需要的接头类型,并自动生成接头
  changeLine(data: any) {
    if (data.to.id) { // 此时说明两端都连接到了节点上
      // 如果连接的节点是plug，就不需要改变线
      if (this.findTypeById(data.to.id) === 'plug') {
        return;
      }
      // 这是因为在删除线的时候也会触发一次moveOutLine事件，如果该线是被删除的，后面的操作就不要做了。
      for (const i of this.remove_id) {
        if (data.id === i) {
          return;
        }
      }
      data.dash = 0 ; // 首先将虚线变为实线;
      const to_nodename = this.findTypeById(data.to.id);
      const from_nodename = this.findTypeById(data.from.id);
      const text = 'HB-08-08AN-030-26U';
      if (from_nodename === 'fenxianhe') {
        data.fromArrow = 'leftASolid';
        // TODO 给text赋值拼接
      }
      if (to_nodename === 'jitingButton') {
        data.toArrow = 'rightASolid';
        // TODO 给text赋值拼接
      }
      data.text = text;

      // 将该线加入到报表中
      const id = data.mubanId - 1;
      this.report_list2[id].report_nodes.push(new ReportListNode(data.id, data.name, data.text));
    }
  }
  delReportLine(data: any) {
    const id = data.mubanId - 1;
    this.report_list2[id].report_nodes = this.report_list2[id].report_nodes.filter(x => x.node_id !== data.id);
  }
  // 根据id查找出节点的类型
  findTypeById(id: string) {
    for (const node of this.canvas.data.nodes) {
      if (node.id === id) {
        return node.name;
      }
    }
    return null;
  }
  // 将节点的信息添加到报目表中
  addNodes(data: any) {
    // 分线盒模板
    if (this.currentFile === FileTypes.Fenxianhe) {
      // for (const id of this.remove_id) {
      //   if (data.id === id) {
      //     return;
      //   }
      // }
      const n = Math.floor(data.rect.y / this.muban_height);
      // 设置节点的muban_id
      data.mubanId = n + 1;
      // 有些节点不需要加入到报目表中
      for (const ignore_node of this.ignoreNode) {
        if (data.name === ignore_node) {
          return;
        }
      }

      this.report_list2[n].report_nodes.push(new ReportListNode(data.id, data.name, 'type', data.text));
      console.log(this.report_list2);
    }
  }
  // 鼠标进入节点的时候将其从报目表中删除，鼠标移出的时候再将其加回来
  delete1(data: any) {
    if (this.currentFile === FileTypes.Fenxianhe) {
      const n = data.mubanId - 1;
      const id = data.id;
      this.report_list2[n].report_nodes = this.report_list2[n].report_nodes.filter(x => x.node_id !== id);
    }
  }
  // 删除节点时将报目单中的相应节点删除, 这个函数传进来的是map类型的数据，里面有nodes[]和lines[]
  deleteNodes(data: any) {
    if (this.currentFile === FileTypes.Fenxianhe) {
      for (const node of data.nodes) {
        // tslint:disable-next-line:radix
        const n = node.mubanId - 1;
        this.remove_id.push(node.id);
        const id = node.id;
        // 删除对应id的数据
        this.report_list2[n].report_nodes = this.report_list2[n].report_nodes.filter(x => x.node_id !== id);
      }
      // 如果调用的是removeNode方法，就没有lines[]
      if (data.lines) {
        for (const line of data.lines) {
          // tslint:disable-next-line:radix
          const n = line.mubanId - 1;
          this.remove_id.push(line.id);
          const id = line.id;
          // 删除对应id的数据
          this.report_list2[n].report_nodes = this.report_list2[n].report_nodes.filter(x => x.node_id !== id);
        }
      }
      console.log(this.report_list2);
    }
  }
  // private findNode(node: Node, n: number) {
  //   for (let i = 0; i < this.report_list[n].report_nodes.length; ++i) {
  //     if (node.id === this.report_list[n].report_nodes[i].id) {
  //       return i;
  //     }
  //   }
  //
  //   return -1;
  // }
  changeLineByDeleteNode(data: any) {
    for (const node of data.nodes) {
      // 当删除底层部件节点的时候，先把线的状态改变一下
      for (const line of this.canvas.data.lines) {
        if (line.to.id === node.id) {
          console.log(line);
          line.text = '';
          line.toArrow = '';
          line.fromArrow = '';
          line.dash = 1;
          // 把plug变成动画状态
          for (const n of this.canvas.data.nodes) {
            if (n.name === 'plug') {
              if (this.calculateDistance(node.rect.x, n.rect.x) && this.calculateDistance(node.rect.y, n.rect.y)) {
                n.locked = true;
                n.animatePlay = true;
                n.animateStart = Date.now();
                this.canvas.animate();
                // 把线和plug连在一起
                line.to.id = n.id;
              }
            }
          }
          // 把线从报目表中删除
          this.report_list2[node.mubanId - 1].report_nodes = this.report_list2[node.mubanId - 1].
            report_nodes.filter(x => x.node_id !== line.id);
        }
      }
    }
  }
// 为plug设置动画
  setPlugAnimate(data: any) {
    data.animateFrames = [];
    const state = Node.cloneState(data);
    switch (data.animateType) {
      case 'upDown':
        state.rect.y -= 10;
        state.rect.ey -= 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        data.animateFrames.push({
          duration: 200,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'leftRight':
        state.rect.x -= 10;
        state.rect.ex -= 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        data.animateFrames.push({
          duration: 80,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x -= 20;
        state.rect.ex -= 20;
        data.animateFrames.push({
          duration: 50,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        data.animateFrames.push({
          duration: 30,
          linear: true,
          state: Node.cloneState(state)
        });
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(data)
        });
        break;
      case 'heart':
        state.rect.x -= 5;
        state.rect.ex += 5;
        state.rect.y -= 5;
        state.rect.ey += 5;
        state.rect.width += 5;
        state.rect.height += 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 400,
          linear: true,
          state: Node.cloneState(data)
        });
        break;
      case 'success':
        state.strokeStyle = '#237804';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        state.strokeStyle = '#237804';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        state.strokeStyle = '#237804';
        state.fillStyle = '#389e0d22';
        data.animateFrames.push({
          duration: 3000,
          linear: true,
          state
        });
        break;
      case 'warning':
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#ffffff';
        state.dash = 2;
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state
        });
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#cf1322';
        state.dash = 0;
        data.animateFrames.push({
          duration: 500,
          linear: true,
          state: Node.cloneState(state)
        });
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#ffffff';
        state.dash = 2;
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'error':
        state.strokeStyle = '#cf1322';
        state.fillStyle = '#cf132222';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        break;
      case 'show':
        state.strokeStyle = '#fa541c';
        state.rotate = -10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 0;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
    }

    this.setAnimateDuration(data);
  }
  setAnimateDuration(data: any) {
    data.animateDuration = 0;
    for (const item of data.animateFrames) {
      data.animateDuration += item.duration;
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
      case 'multi':
        this.canvas.alignNodes(props.align);
        break;
    }
  }

  onAnimateChange() {
    this.canvas.animate();
  }

  onSignup() {
    location.href = `${environment.urls.account}?signup=true`;
  }

  onLogin() {
    location.href = environment.urls.account;
  }

  onContextMenu(event: MouseEvent) {
    console.log(event);
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
    console.log('onContextMenu');
  }

  onClickDocument(event: MouseEvent) {
    this.contextmenu = null;
  }

  toSVG() {
    const ctx = new C2S(this.canvas.canvas.width + 200, this.canvas.canvas.height + 200);
    for (const item of this.canvas.data.nodes) {
      item.render(ctx);
    }

    for (const item of this.canvas.data.lines) {
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
   * 将plug节点删除，将plug的id赋值给底层部件。这样避免去更改线的to.id,但是这样更改id会出现问题，因为之前添加节点的id就会消失了，在报目表中没办法更新节点了,需要将报目表中的id也更换过来
   * 所以不要更换id,而是将line中的to.id换成现在的id
   */
  exchangeNode(data: any) {
    if (data.name === 'plug') {
      return;
    }
    for (const node of this.canvas.data.nodes) {
      if (node.name === 'plug') {
        if (this.calculateDistance(node.rect.x, data.rect.x) && this.calculateDistance(node.rect.y, data.rect.y)) {
          // this.canvas.removeNode(node);
          node.locked = true;
          node.dash = 1;
          node.strokeStyle = '#74787c';
          node.animatePlay = false;
          node.animateStart = 0;
          for (const line of this.canvas.data.lines) {
            if (line.to.id === node.id) {
              line.to.id = data.id;
              this.changeLine(line);
            }
          }
          // data.id = node.id;
        }
      }
    }

  }
  /**
   * 这里处理从popupWindows中传过来的数据，将传过来的数据new出一个节点，覆盖在双击选中的plug上，选中的plug被记录在了selectedPlug中
   * 需要把selectedPlug中的rect.x和rect.y赋值给新创建的节点。
   * */
  setNodeData(data: any) {

    data.rect.x = this.selectedPlug.rect.x;
    data.rect.y = this.selectedPlug.rect.y;
    data.mubanId = this.selectedPlug.mubanId;
    // 把新节点添加上
    const node = this.initAddNode(data);
    // 调用更换节点
    this.exchangeNode(node);
    console.log(node);
  }
  calculateDistance(from: number, to: number) {
    return Math.abs(from - to) < 5;
  }

  ngOnDestroy() {
    (window as any).canvas = null;
    this.subMenu.unsubscribe();
    this.subUser.unsubscribe();
    this.subRoute.unsubscribe();
    this.canvas.destroy();
  }
}
