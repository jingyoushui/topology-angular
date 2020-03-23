import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class HomeService {
  constructor(protected http: HttpService) { }

  async Get(data: any) {
    const ret = await this.http.QueryString({ version: data.version }).Get('/api/topology/get/' + data.id);
    console.log(data.id);
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
    for (const item of data.data.nodes) {
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
}
