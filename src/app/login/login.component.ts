import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from 'le5le-store';
import { NoticeService } from 'le5le-components/notice';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {CoreService} from '../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

  validateForm!:  FormGroup;

  constructor(private fb: FormBuilder,private service:LoginService,private _coreService: CoreService,private router: Router) {}

  async submitForm() {
    const username = this.validateForm.controls['userName'].value;
    const password = this.validateForm.controls['password'].value;
    console.log(username, password);
    let data = {
      username:username,
      password:password,
    };
    const res = await this.service.Login(data);
    if(res){
      const token = {
        token:res.token
      };
      this._coreService.saveToken(token);
      let user = res.user;
      user.usernamePinyin = this._coreService.getPinyin(user.username);
      Store.set('user', user);
      await this.router.navigate(['/']);

    }

  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
  }

}
