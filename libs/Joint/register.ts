import {registerArrow} from 'topology-core/middles';
import {leftASolid} from './leftA';
import {rightASolid} from './rightA';
import {rightBSolid} from './rightB';

export function register() {
  registerArrow('leftASolid', leftASolid);
  registerArrow('rightASolid',rightASolid);
  registerArrow('rightBSolid',rightBSolid);

}
