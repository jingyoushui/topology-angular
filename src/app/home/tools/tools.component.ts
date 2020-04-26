import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Tools } from './config';
import { Topology } from 'topology-core';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent {
  tools: any[] = Tools;
  canvas: Topology;
  @Output()
  plugdata = new EventEmitter<any>();

  onDrag(event: DragEvent, node: any) {
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
  }
  onTouchstart(item: any) {
    this.canvas.touchedNode = item.data;
  }
  onclick(data: any) {
    this.plugdata.emit(data);
  }

}
