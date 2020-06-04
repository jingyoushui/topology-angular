import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/http/http.service';
import { CoreService } from '../core/core.service';

@Injectable()
export class LoginService {
  constructor(protected http: HttpService, protected coreService: CoreService) {}

  async Login(data: any) {
    let ret: any;
    if (data.username&&data.password) {
      ret = await this.http.Post('/api/login', { phone: data.username,password:data.password });
    }

    if (ret.error) {
      return null;
    }
    return ret;
  }




}
