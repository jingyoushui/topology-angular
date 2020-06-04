import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import {ContextMenuComponent} from './context-menu/context-menu.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PropsComponent } from './props/props.component';
import {ToolsComponent} from './tools/tools.component';
import {PopupWindowsComponent} from './showWindows/popupWindows.component';
import { TopologyService } from './topology.service';

import { NgZorroAntdModule, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {NzDemoTreeLineComponent} from './tree/tree.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {WorkspaceHeaderComponent} from '../header/header.component';
import {PenTreeItemComponent} from './props/tree-item/tree-item.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {SwitchModule} from 'le5le-components/switch';
registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  imports: [SharedModule, HomeRoutingModule, NgZorroAntdModule, FormsModule, ReactiveFormsModule, ScrollingModule, DragDropModule, SwitchModule],
  declarations: [ToolsComponent,
    HomeComponent,
    PropsComponent,
    PopupWindowsComponent,
    NzDemoTreeLineComponent,
    WorkspaceHeaderComponent,
    ContextMenuComponent,
    PenTreeItemComponent],
  bootstrap:    [ NzDemoTreeLineComponent ],
  providers: [TopologyService, { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }]
})
export class HomeModule { }
