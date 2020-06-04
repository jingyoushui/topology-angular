import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from 'le5le-store';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:onscroll)': 'onscroll($event)'
  }
})
export class WorkspaceHeaderComponent implements OnInit, OnDestroy {
  @Input() file: any;
  @Input() data: any;

  @Output() event = new EventEmitter<any>();

  user: any;
  subUser: any;
  showNew = false;
  menuClicked = false;
  showFigure = false;
  bkTab = 1;
  recently: any[] = [];

  dialogs: any = {};

  lineNames = [{
    name: '曲线',
    value: 'curve'
  }, {
    name: '线段',
    value: 'polyline'
  }, {
    name: '直线',
    value: 'line'
  }];
  arrowTypes = [
    '',
    'triangleSolid',
    'triangle',
    'danFenxianheSolid',
    // 'diamondSolid',
    // 'diamond',
    // 'circleSolid',
    // 'circle',
    'line',
    // 'lineUp',
    // 'lineDown'
  ];

  menus: any[] = [{
    name: '查看',
    children: [ {
      name: '共享图文',
      router: '/'
    }]
  },  {
    name: '帮助',
    children: [{
      name: '使用教程',
      url: '#'
    },  {}, {
      name: '关于我们',
      url: ''
    }]
  }];

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
    '#777777'
  ];

  id: string;
  subRoute: any;
  subConfigs: any;
  subRecently: any;
  constructor(private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subConfigs = Store.subscribe('app-configs', (configs: any) => {
      if (configs && configs.workspaceMenus) {
        this.menus = configs.workspaceMenus;
      }
    });

    this.subRecently = Store.subscribe('recently', (item: any) => {
      for (let i = 0; i < this.recently.length; ++i) {
        if (this.recently[i].id === item.id || i > 19) {
          this.recently.splice(i, 1);
        }
      }
      this.recently.unshift(item);
      if (this.user) {
        localStorage.setItem('recently_' + this.user.id, JSON.stringify(this.recently));
      }
    });

    this.subUser = Store.subscribe('user', (user: any) => {
      this.user = user;
      this.getRecently();
    });

    this.subRoute = this.activateRoute.queryParamMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  onRemoveRecently(event: MouseEvent, i: number) {
    event.stopPropagation();
    event.preventDefault();
    this.recently.splice(i, 1);
    localStorage.setItem('recently_' + this.user.id, JSON.stringify(this.recently));
  }

  getRecently() {
    if (!this.user) {
      return;
    }

    try {
      this.recently = JSON.parse(localStorage.getItem('recently_' + this.user.id));
    } catch (e) { }
    if (!this.recently) {
      this.recently = [];
    }
  }

  onMenu(name: string, data?: any) {
    this.event.emit({
      name,
      data
    });
  }


  onClickMenu(event: MouseEvent) {
    if ((event.target as HTMLElement).nodeName === 'A') {
      let node = (event.target as HTMLElement).parentElement;
      let isDropdown = false;
      let disabled = false;
      while (node) {
        if (node.className.indexOf('dropdown') > -1) {
          isDropdown = true;
        }
        if (node.className.indexOf('disabled') > -1) {
          disabled = true;
          break;
        }
        node = node.parentElement;
      }

      if (disabled) {
        return;
      }
    }

    this.menuClicked = true;
    setTimeout(() => {
      this.menuClicked = false;
    }, 500);
  }

  onLeaveFigure() {
    setTimeout(() => {
      this.showFigure = false;
    }, 1000);
  }

  onLeaveNew() {
    setTimeout(() => {
      this.showNew = false;
    }, 800);
  }
  onSignup() {
    location.href = `${environment.urls.account}`;
  }

  onLogin() {
    location.href = `${environment.urls.account}`;
  }

  onSignout() {
    Store.set('auth', -1);
  }


  ngOnDestroy() {
    this.subUser.unsubscribe();
    this.subRoute.unsubscribe();
    this.subConfigs.unsubscribe();
    this.subRecently.unsubscribe();
  }
}
