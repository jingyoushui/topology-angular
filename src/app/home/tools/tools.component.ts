import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Topology } from 'topology-core';

import {ToolsService} from './tools.service';



@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  providers: [ToolsService],
})
export class ToolsComponent {
  tools:any[];
  canvas: Topology;
  @Output()
  plugdata = new EventEmitter<any>();
  constructor(
    private service: ToolsService
  ){}

  async ngOnInit() {
    const ret = await this.service.Get();
    this.tools = ret;

  }

  onDrag(event: DragEvent, node: any) {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }
  onTouchstart(item: any) {
    this.canvas.touchedNode = item.data;
  }
  onclick(data: any) {
    this.plugdata.emit(data);
  }

  getTools(){
    return this.tools;
  }

}
