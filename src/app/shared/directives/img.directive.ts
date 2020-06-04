import {OnInit, Directive, Input, ElementRef, Renderer2} from '@angular/core';
import { Cookie } from 'le5le-store';

import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appImgAuthSrc]'
})
export class ImageAuthDirective implements OnInit {
  @Input() appImgAuthSrc = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      // `/api/blob/${this.appImgAuthSrc}?Authorization=${Cookie.get(environment.token)}`
        environment.image+`${this.appImgAuthSrc}`
      // `/UserImage/${this.appImgAuthSrc}`
    );
  }
}
