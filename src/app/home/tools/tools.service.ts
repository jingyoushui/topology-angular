import {Injectable} from '@angular/core';
import {HttpService} from '../../http/http.service';
import { Store } from 'le5le-store';

@Injectable()
export class ToolsService {

  constructor(protected http: HttpService) {
  }

  async Get() {
    const ret = await this.http.Get('/api/tools/get');
    if (ret.error) {
      return null;
    }
    Store.set('tools',ret);
    return ret;
  }
  getTools(){
    return Store.get('tools');
  }
}
