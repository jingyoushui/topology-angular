import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Topology } from 'topology-core';
import { Options } from 'topology-core/options';
import { s8 } from 'topology-core/uuid/uuid';

import * as FileSaver from 'file-saver';
import { Store } from 'le5le-store';
import { NoticeService } from 'le5le-components/notice';

import { HomeService } from './home.service';
import { Props } from './props/props.model';
import { environment } from 'src/environments/environment';
import { CoreService } from '../core/core.service';
import { TopologyService } from './topology.service';
import { Tools } from './tools/config';
import {TopologyData} from 'topology-core/models/data';
import {Node} from 'topology-core/models/node';
import {Line} from 'topology-core/models/line';
// 树型插件
import { NzTreeModule } from 'ng-zorro-antd/tree';
import {M8json} from './json/M8_json';
import {ReportList} from './report-list/reportList';
import {ReportListNode} from './report-list/reportListNode';


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
  selected: Props;
  subMenu: any;
  size = {
    width: 1500,
    height: 600
  };
  data = {
    id: '',
    version: '',
    data: {nodes: [], lines: [], bkColor: '#ffffffff'},
    name: '空白文件',
    desc: '',
    image: '',
    userId: '',
    shared: false
  };
  // 每一个模板的高度,固定为430
  muban_height = 600;
  report_list_id = 1;
  // 用来生成报目表的数据,将整个画板分成多个区域,每个区域都有名字和id,nodes[],lines[].
  // report_node : id, name, 型号, 备注
  report_list2: ReportList[] = [];
  showReport = false;
  // 中英对应表
  zh_en = new Map([
    [ 'fenxianhe', '分线盒'],
    [ 'circle', '圆形' ],
    [ 'triangle', '三角形' ],
    [ 'jitingButton', '急停按钮' ],
    [ 'jitingButton2', '急停按钮' ],
    [ 'OKNG', 'OK/NG显示' ],
    [ 'zhongji', '中继器' ],
  ]);
  remove_id = [];
  icons: { icon: string; iconFamily: string; }[] = [];
  readonly = false;

  user: any;
  subUser: any;

  mouseMoving = false;

  contextmenu: any;
  selNodes: any;
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
    strokeStyle: '#e7e27aff',
    fillStyle: '#e7e27aff',
    // locked: true,
    name: 'rectangle'
  };
  // m8模板初始化
  m8_json: {
    lines: any;
    fenxianhe: any;
  };
  fenxianheid = [
    {
      id : ''
    },
  ];
  divNode: any;

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
        case 'new':
          this.onNew();
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
      this.subRoute = this.activateRoute.queryParamMap.subscribe(params => {
        if (params.get('id')) {
          this.onOpen({id: params.get('id'), version: params.get('version')});
        } else {
          this.data = {
            id: '',
            version: '',
            data: {nodes: [], lines: [], bkColor: '#ffffffff'},
            name: '空白文件',
            desc: '',
            image: '',
            userId: '',
            shared: false
          };
        }
      });
      this.report_list2.push(new ReportList(1, '模块1'));
      this.initAddNode(this.json);
      this.initNew();
      this.report_list2[0].muban_name = this.json.text;
      // For debug
      (window as any).canvas = this.canvas;
      // End
    });

    this.topologySrv.canvasRegister();
  }

  onDrag(event: DragEvent, node: any) {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }

  onTouchstart(item: any) {
    this.canvas.touchedNode = item.data;
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
      data: {nodes: [], lines: [], bkColor: '#ffffffff'},
      name: '空白文件',
      desc: '',
      image: '',
      userId: '',
      shared: false
    };
    Store.set('file', this.data);
    this.canvas.open(this.data.data);
    this.size = {
      width: 1500,
      height: 600
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
      strokeStyle: '#e7e27aff',
      fillStyle: '#e7e27aff',
      // locked: true,
      name: 'rectangle'
    }
    this.initAddNode(this.json);
    this.report_list_id = 1;
    this.report_list2 = [];
    this.report_list2.push(new ReportList(1, '模块1'));
    this.report_list2[0].muban_name = this.json.text;

    this.initNew();

  }
  // 初始化和新建文件时, 提前将分线盒和八根线绘制好
  initNew() {
    this.m8_json = (new M8json()).M8_json;
    this.m8_json.fenxianhe.id = this.fenxianheid[0].id = s8();
    this.initAddNode(this.m8_json.fenxianhe);
    for (const line of this.m8_json.lines) {
      line.from.id = line.controlPoints[0].id = this.fenxianheid[0].id;
      this.initAddLine(line);
    }
    console.log(this.m8_json);
  }

  async onOpen(data: { id: string; version?: string; }) {
    const ret = await this.service.Get(data);
    if (!ret) {
      this.router.navigateByUrl('/workspace');
      return;
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
    this.canvas.open(ret.data);
    // this.canvas = new Topology(this.workspace.nativeElement, this.canvasOptions);
    // this.size.width = this.canvas.parentElem.clientWidth;
    // this.canvas.resize(this.size);

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
        const _noticeService: NoticeService = new NoticeService();
        _noticeService.notice({
          body: '保存成功！',
          theme: 'success'
        });
        // 保存成功文件数据之后,获取文件id,然后保存报目表数据

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
    const n = this.report_list_id;
    this.report_list_id += 1;
    // 增加模块名称组件
    this.json.rect.y = 30 + this.muban_height * (this.report_list_id - 1);
    this.json.text = '模块' + this.report_list_id;

    this.report_list2.push(new ReportList(this.report_list_id, this.json.text));
    this.initAddNode(this.json);
    // end
    // 增加分线盒和线
    this.fenxianheid.push(
      {
        id: ''
      }
    );
    this.m8_json.fenxianhe.id = this.fenxianheid[n].id = s8();
    this.m8_json.fenxianhe.rect.y += this.muban_height;
    this.initAddNode(this.m8_json.fenxianhe);
    for (const line of this.m8_json.lines) {
      line.from.id = line.controlPoints[0].id = this.m8_json.fenxianhe.id;
      line.from.y += this.muban_height;
      line.to.y += this.muban_height;
      line.controlPoints[0].y += this.muban_height;
      line.controlPoints[1].y += this.muban_height ;
      this.initAddLine(line);
    }
    // end
    console.log(this.report_list2);

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
    this.canvas.initAddNode(json);
    setTimeout(() => {
      this.selected = null;
    });
    console.log(this.selected);
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

  onMessage = (event: string, data: any) => {
    console.log(event);
    console.log(data);
    switch (event) {
      case 'node':
        this.selNodes = [data];
        this.selected = {
          type: 'node',
          data
        };
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
        this.workspace.nativeElement.scrollLeft += 10;
        this.workspace.nativeElement.scrollTop += 10;
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
        this.addNodes(data);
        break;

      case 'moveOutLine':
        this.changeLine(data);
        break;
    }


  }
  // 当线连接到终端的时候就把线改为实线,并且根据两端终端的类型判断需要的接头类型,并自动生成接头
  changeLine(data: any) {
    if (data.controlPoints.length === 3) { // 此时说明两端都连接到了节点上
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

    }
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
  addNodes(data: any) {
    for (const id of this.remove_id) {
      if (data.id === id) {
        return;
      }
    }
    if (data.name === 'rectangle') {

      return;
    }
    // tslint:disable-next-line:radix
    const n = Math.floor(data.rect.y / this.muban_height);
    this.report_list2[n].report_nodes.push(new ReportListNode(data.id, data.name, 'type', data.text))
    console.log(this.report_list2);
  }
  delete1(data: any) {
    // tslint:disable-next-line:radix
    const n = Math.floor(data.rect.y / this.muban_height);
    const id = data.id;
    // const i = this.findNode(node, n);
    // console.log(i);
    this.report_list2[n].report_nodes = this.report_list2[n].report_nodes.filter(x => x.node_id !== id);

  }
  // 删除节点时将报目单中的相应节点删除
  deleteNodes(data: any) {
    for (const node of data.nodes) {
      // tslint:disable-next-line:radix
      const n = Math.floor(node.rect.y / this.muban_height);
      this.remove_id.push(node.id);
      const id = node.id;
      // const i = this.findNode(node, n);
      // console.log(i);
      this.report_list2[n].report_nodes = this.report_list2[n].report_nodes.filter(x => x.node_id !== id);
    }
    console.log(this.report_list2);
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

  ngOnDestroy() {
    (window as any).canvas = null;
    this.subMenu.unsubscribe();
    this.subUser.unsubscribe();
    this.subRoute.unsubscribe();
    this.canvas.destroy();
  }
}
