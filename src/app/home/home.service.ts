import { Injectable } from '@angular/core';
import { register as registerArrow} from '../../../libs/Joint';
import {register as registerJunctionBox} from '../../../libs/junctionBox';
import {registerMy} from '../../../libs/junctionBox';
import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class HomeService {
  constructor(protected http: HttpService) { }

  canvasRegister(){
    registerArrow();
    registerJunctionBox();
  }

  // 用来注册终端组件的
  async canvasRegisterMy() {
    const ret = await this.getProduct();
    if (ret.code === 200) {
      const list = ret.data.value;
      for(const p of list){
        if(p.anchorsId === 0){
          registerMy(p.name);
        }
      }
    }
  }

  //获取到有哪些组件需要注册
  async getProduct(){
    let ret :any;
    ret = await this.http.Get('/api/productAnchors/get');
    console.log(ret)
    return ret;

  }


  async Get(data: any) {
    const ret = await this.http.QueryString({ version: data.version }).Get('/api/topology/get/' + data.id);
    if (ret.error) {
      return null;
    }

    return ret;
  }
  async GetReportList(data: any) {
    const ret = await this.http.QueryString({ version: data.version }).Get('/api/report_list/get/' + data.id);
    if (ret.error) {
      return null;
    }

    return ret;
  }

  async Upload(blob: Blob, shared = false, filename = '/topology/thumb.png') {
    const form = new FormData();
    form.append('path', filename);
    form.append('randomName', '1');
    form.append('public', shared + '');
    form.append('file', blob);
    const ret = await this.http.PostForm('/api/upload_t_image', form);
    if (ret.error) {
      return null;
    }

    return ret;
  }

  async DelImage(image: string) {
    const ret = await this.http.Delete('/api/delete_t_image/' + image);
    if (ret.error) {
      return false;
    }

    return true;
  }

  async AddImage(image: string) {
    const ret = await this.http.Post('/api/user/image', { image: image });
    if (ret.error) {
      return '';
    }

    return ret.id;
  }

  async Save(data: any) {
    data = Object.assign({}, data);
    for (const item of data.data.pens) {
      delete item.elementLoaded;
      delete item.elementRendered;
    }
    let ret: any;
    if (!data.name) {
      data.name = `Created at ${new Date().toLocaleString()}`;
    }
    if (!data.desc) {
      data.desc = data.name;
    }
    if (data.id) {
      ret = await this.http.Post('/api/topology/save', data);
    } else {
      ret = await this.http.Post('/api/topology/save', data);
    }

    if (ret.error) {
      return null;
    }

    return ret;
  }

  async SaveReportList(data: any) {
    data = Object.assign({}, data);
    let ret: any;
    ret = await this.http.Post('/api/report_list/save', data);
    if (ret.error) {
      return null;
    }

    return ret;
  }

  async Patch(data: any) {
    if (data.image) {
      const retImage = await this.http.Patch('/api/blob/' + data.image, {
        public: data.shared
      });
      if (retImage.error) {
        return false;
      }
    }

    delete data.image;
    const ret = await this.http.Patch('/api/topology/update', data);
    if (ret.error) {
      return false;
    }

    return true;
  }

  async SaveGroup(data: any) {
    data = Object.assign({}, data);
    let ret: any;
    ret = await this.http.Post('/api/tools/save', data);
    if (ret.error) {
      return null;
    }

    return ret;
  }
  async SaveProduct(data: any,id:string) {
    data = Object.assign({}, data);
    let ret: any;
    ret = await this.http.Post('/api/tools/saveProductbygroup/'+id, data);
    if (ret.error) {
      return null;
    }

    return ret;
  }
}
