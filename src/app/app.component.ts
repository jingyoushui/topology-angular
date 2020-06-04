import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Store } from 'le5le-store';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  urls = environment.urls;
  file = {
    id: '',
    version: '',
    data: { nodes: [], lines: [] },
    name: '',
    desc: '',
    image: '',
    shared: false
  };
  list = {
    recently: []
  };
  lineName = 'curve';
  fromArrowType = '';
  toArrowType = '';

  editMode = false;
  locked = 0;
  scale = 100;

  showLicense = false;
  showAbout = false;
  constructor(private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    Store.subscribe('user', (user: any) => {
      this.user = user;
      this.getRecently();
    });
    Store.subscribe('file', (file: any) => {
      this.locked = 0;
      if (file && file.data) {
        this.locked = file.data.locked || 0;
      }
      this.file = file;
    });

    Store.subscribe('lineName', (lineName: string) => {
      if (lineName) {
        this.lineName = lineName;
      }
    });

    Store.subscribe('fromArrowType', (fromArrowType: string) => {
      this.fromArrowType = fromArrowType || '';
    });

    Store.subscribe('toArrowType', (toArrowType: string) => {
      if (toArrowType !== undefined) {
        this.toArrowType = toArrowType || '';
      }
    });

    Store.subscribe('scale', (scale: number) => {
      this.scale = scale * 100;
    });

    Store.subscribe('locked', (locked: number) => {
      this.locked = locked;
    });

    Store.subscribe('recently', (item: any) => {
      for (let i = 0; i < this.list.recently.length; ++i) {
        if (this.list.recently[i].id === item.id || i > 19) {
          this.list.recently.splice(i, 1);
        }
      }
      this.list.recently.unshift(item);
      if (this.user) {
        localStorage.setItem('recently_' + this.user.id, JSON.stringify(this.list.recently));
      }
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      if ((event as NavigationEnd).url.indexOf('/workspace') === 0) {
        this.editMode = true;
      } else {
        this.editMode = false;
        this.file = {
          id: '',
          version: '',
          data: { nodes: [], lines: [] },
          name: '',
          desc: '',
          image: '',
          shared: false
        };
      }
    });
  }



  getRecently() {
    if (!this.user) {
      return;
    }

    try {
      this.list.recently = JSON.parse(localStorage.getItem('recently_' + this.user.id));
    } catch (e) { }

    if (!this.list.recently) {
      this.list.recently = [];
    }
  }



  onSignup() {
    location.href = `${environment.urls.account}?signup=true`;
  }

  onLogin() {
    location.href = `${environment.urls.account}?cb=${encodeURIComponent(location.href)}`;
  }

  onSignout() {
    Store.set('auth', -1);
  }

  ngOnDestroy() { }
}
