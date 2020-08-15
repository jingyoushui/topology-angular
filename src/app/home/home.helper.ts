import {Injectable} from '@angular/core';
import {Node} from 'topology-core/models';
import {M8json} from './json/M8_json';
import {s8} from 'topology-core/utils';

@Injectable()
export class HomeHelper {

  zh_en = new Map([
    [ 'fenxianhe', '分线盒'],
    [ 'circle', '圆形' ],
    [ 'triangle', '三角形' ],
    [ 'jitingButton', 'φ16急停按钮盒' ],
    [ '22jitingButton', 'φ22急停按钮盒' ],
    [ 'fuweiButton', 'φ22复位按钮' ],
    [ 'qidongButton', 'φ22启动按钮' ],
    [ 'polyline', '电缆'],
    [ 'line', '电缆'],
    ['qitingButton', 'φ22启停按钮盒'],
    ['tingzhiButton', 'φ22停止按钮盒'],
    ['16qitingButton', 'φ16启停按钮盒'],
    ['16shuangweiButton', 'φ16双位指示灯'],
    ['M8yuanzhu', 'M8圆柱形接近传感器'],
    ['M8fangxing','M8方形接近传感器'],
    ['M8duishe','M8对射式光电传感器'],
    ['M8zifan','M8自反式光电传感器'],
    ['zhongji','中间继电器'],
    ['switch','拨动开关'],
    ['diancifaUp','猪尾式电磁阀'],
    ['diancifaDown','散线式电磁阀'],
    ['zhuwei','猪尾式接近传感器'],
    ['zidingyi', '自定义组件'],
    ['hangxian', '航线插头'],
    ['sanxian', '散线插头']
  ]);

  cpPresetColors = [
    '#1890ff',
    '#096dd9',
    '#bae7ff',
    '#52c41a',
    '#3fad09',
    '#c6ebb4',
    '#faad14',
    '#d9a116',
    '#fff6dd',
    '#f50000',
    '#ff0000',
    '#ffc2c5',
    '#fa541c',
    '#531dab',
    '#314659',
    '#777777',
    '#E7E27A',
    '#FFFFFF',
  ];

  // 计算竖版图片
  exportWordHorizontal(canvas,word_name,word_company,data_name){
    // const n = this.report_list.length;

    let array_ey:Array<number> = [];
    let array_y:Array<number> = [];
    for(let pen of canvas.data.pens){
      if(pen.name==='fenxianheMuban'||pen.name==='fenxianheMubanTwo'){
        array_ey.push(pen.rect.ey);
        array_y.push(pen.rect.y);
      }
    }
    let t = 0;
    for (let i = 0; i < array_ey.length - 1; i++){
      for (let j = 0; j < array_ey.length - 1 - i; j++){
        if (array_ey[j] > array_ey[j + 1]) {
          t = array_ey[j];
          array_ey[j] = array_ey[j + 1];
          array_ey[j + 1] = t;
        }
      }
    }

    let m = 0;
    for (let i = 0; i < array_y.length - 1; i++){
      for (let j = 0; j < array_y.length - 1 - i; j++){
        if (array_y[j] > array_y[j + 1]) {
          m = array_y[j];
          array_y[j] = array_y[j + 1];
          array_y[j + 1] = m;
        }
      }
    }
    // array_ey.sort();
    // array_y.sort();

    const n = array_ey.length;
    let page = 1;
    for(let i=0;i<n;i+=4){
      let img_h = 0;
      if(n - i <=4){
        img_h = 300 * (n-i);
      }else {
        img_h = 1200;
      }
      const image_ey = Math.max(array_ey[i+3]?array_ey[i+3]:0,array_ey[i+2]?array_ey[i+2]:0,
        array_ey[i+1]?array_ey[i+1]:0,array_ey[i]);

      this.doexportWordHorizontal(page,img_h,array_y[i],image_ey,canvas,word_name,word_company,data_name);
      page++;
    }

    return true;


  }

  //导出竖版
  async doexportWordHorizontal(page:number,img_h:number,image_y:number,image_ey:number,canvas1:any,word_name,word_company,data_name){

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 970;canvas.height = 1500;
    const image1 = new Image();
    image1.src = 'assets/img/blueprint.png';
    const image2 = new Image();
    const blob = await canvas1.toImage('image/png',0.99,null, null,
      true,image_y,image_ey);


    setTimeout(() => {
      image2.src = blob;
    }, 2000);

    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    const that = this;
    image1.onload = function(){
      ctx.drawImage(image1,0,0,970,1500);
      ctx.save();
      ctx.font = '20px 微软雅黑';
      ctx.fillText(word_name, 515, 1290);
      ctx.fillText(word_company, 730, 1420);
      ctx.fillText('第'+page+'页', 730, 1380);
      ctx.fillText(formatDate(new Date().getTime()), 500, 1345);
      ctx.restore();
      image2.onload = function(){
        ctx.drawImage(image2,70,60,810,img_h);
        const img = canvas.toDataURL('image/png',0.99);
        canvas1.saveAsImage2(img,data_name);
      };
    };

  }

  //横版下载
  exportWordViolently(canvas,word_name,word_company,data_name){

    let array_ey:Array<number> = [];
    let array_y:Array<number> = [];
    for(let pen of canvas.data.pens){
      if(pen.name==='fenxianheMuban'||pen.name==='fenxianheMubanTwo'){
        array_ey.push(pen.rect.ey);
        array_y.push(pen.rect.y);
      }
    }
    let t = 0;
    for (let i = 0; i < array_ey.length - 1; i++){
      for (let j = 0; j < array_ey.length - 1 - i; j++){
        if (array_ey[j] > array_ey[j + 1]) {
          t = array_ey[j];
          array_ey[j] = array_ey[j + 1];
          array_ey[j + 1] = t;
        }
      }
    }

    let m = 0;
    for (let i = 0; i < array_y.length - 1; i++){
      for (let j = 0; j < array_y.length - 1 - i; j++){
        if (array_y[j] > array_y[j + 1]) {
          m = array_y[j];
          array_y[j] = array_y[j + 1];
          array_y[j + 1] = m;
        }
      }
    }
    const n = array_ey.length;
    let page = 1;
    for(let i=0;i<n;i+=2){
      let img_h = 0;
      if(n - i <=2){
        img_h = 340 * (n-i);
      }else {
        img_h = 680;
      }
      const image_ey = Math.max(
        array_ey[i+1]?array_ey[i+1]:0,array_ey[i]);

      this.doexportWordViolently(page,img_h,array_y[i],image_ey,canvas,word_name,word_company,data_name);
      page++;
    }

    return true;
  }
  async doexportWordViolently(page:number,img_h:number,image_y:number,image_ey:number,canvas1,word_name,word_company,data_name){
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;canvas.height = 970;
    const image1 = new Image();
    image1.src = 'assets/img/blueprint_x.png';
    const image2 = new Image();
    const blob = await canvas1.toImage('image/png',0.99,null, null,
      true,image_y,image_ey);

    setTimeout(() => {
      image2.src = blob;
    }, 2000);
    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
      const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + month + '-' + day;
    };

    image1.onload = function(){
      ctx.drawImage(image1,0,0,1500,970);
      image2.onload = function(){
        ctx.drawImage(image2,250,60,1000,img_h);
        ctx.save();
        ctx.font = '20px 微软雅黑';
        ctx.fillText(word_name, 1030, 778);
        ctx.fillText(word_company, 1236, 898);
        ctx.fillText('第'+page+'页', 1236, 858);
        ctx.fillText(formatDate(new Date().getTime()), 996, 825);
        ctx.restore();
        const img = canvas.toDataURL('image/png',0.99);
        canvas1.saveAsImage2(img,data_name);
      };
    };
  }



  // 为plug设置动画
  setPlugAnimate(data: any) {
    data.animateFrames = [];
    const state = Node.cloneState(data);
    switch (data.animateType) {
      case 'upDown':
        state.rect.y -= 10;
        state.rect.ey -= 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        data.animateFrames.push({
          duration: 200,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'leftRight':
        state.rect.x -= 10;
        state.rect.ex -= 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        data.animateFrames.push({
          duration: 80,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x -= 20;
        state.rect.ex -= 20;
        data.animateFrames.push({
          duration: 50,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rect.x += 20;
        state.rect.ex += 20;
        data.animateFrames.push({
          duration: 30,
          linear: true,
          state: Node.cloneState(state)
        });
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(data)
        });
        break;
      case 'heart':
        state.rect.x -= 5;
        state.rect.ex += 5;
        state.rect.y -= 5;
        state.rect.ey += 5;
        state.rect.width += 5;
        state.rect.height += 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 400,
          linear: true,
          state: Node.cloneState(data)
        });
        break;
      case 'success':
        state.strokeStyle = '#237804';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        state.strokeStyle = '#237804';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        });
        state.strokeStyle = '#237804';
        state.fillStyle = '#389e0d22';
        data.animateFrames.push({
          duration: 3000,
          linear: true,
          state
        });
        break;
      case 'warning':
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#ffffff';
        state.dash = 2;
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state
        });
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#cf1322';
        state.dash = 0;
        data.animateFrames.push({
          duration: 500,
          linear: true,
          state: Node.cloneState(state)
        });
        state.strokeStyle = '#cf1322';
        // state.fillStyle = '#ffffff';
        state.dash = 2;
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
      case 'error':
        state.strokeStyle = '#cf1322';
        state.fillStyle = '#cf132222';
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        });
        break;
      case 'show':
        state.strokeStyle = '#fa541c';
        state.rotate = -10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 10;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        state.rotate = 0;
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        });
        break;
    }

    this.setAnimateDuration(data);
  }
  setAnimateDuration(data: any) {
    data.animateDuration = 0;
    for (const item of data.animateFrames) {
      data.animateDuration += item.duration;
    }
  }


  // delReportLine(data: any) {
  //   const id = data.mubanId - 1;
  //   this.report_list[id].report_nodes = this.report_list[id].report_nodes.filter(x => x.node_id !== data.id);
  // }




  // // 初始化和新建分线盒文件时, 提前将分线盒和八根线绘制好
  // initNewM8() {
  //   this.m8_json = (new M8json()).M8_json;
  //   this.m8_json.fenxianheMuban.id = s8();
  //   this.initAddNode(this.m8_json.fenxianheMuban);
  //   this.m8_json.fenxianhe.id = s8();
  //   this.initAddNode(this.m8_json.fenxianhe);
  //   this.m8_json.fangshuisai.id = s8();
  //   this.initAddNode(this.m8_json.fangshuisai);
  //   this.m8_json.xianbiaopai.id = s8();
  //   this.initAddNode(this.m8_json.xianbiaopai);
  //   for (const line of this.m8_json.lines) {
  //     line.from.id = line.controlPoints[0].id = this.m8_json.fenxianhe.id;
  //     this.m8_json.plugs.rect.y = line.to.y - 10;
  //     this.m8_json.plugs.id = s8();
  //     this.initAddNode(this.m8_json.plugs);
  //     line.to.direction = 4;
  //     line.to.anchorIndex = 0;
  //     line.to.id = this.m8_json.plugs.id;
  //     line.locked = true;
  //     this.initAddLine(line);
  //   }
  //   const left_line = this.m8_json.leftLine;
  //   left_line.from.id = this.m8_json.fenxianhe.id;
  //   this.m8_json.plugs.name = 'leftplug';
  //   this.m8_json.plugs.rect.y = left_line.to.y - 10;
  //   this.m8_json.plugs.rect.x = left_line.to.x - 33;
  //   this.m8_json.plugs.id = s8();
  //   this.initAddNode(this.m8_json.plugs);
  //   left_line.to.direction = 2;
  //   left_line.to.anchorIndex = 1;
  //   left_line.to.id = this.m8_json.plugs.id;
  //   this.initAddLine(left_line);
  //   // //为pulg设置动画
  //   // for (const node of this.canvas.data.pens) {
  //   //   if (node.name === 'plug') {
  //   //     node.animateType = 'warning';
  //   //     this.setPlugAnimate(node);
  //   //     node.animatePlay = true;
  //   //     this.canvas.animate();
  //   //   }
  //   // }
  //   //为pulg设置样式
  //
  //   for (const node of this.canvas.data.pens) {
  //     if (node.name === 'plug' || node.name === 'leftplug') {
  //       node.strokeStyle = '#f50000ff';
  //       node.dash = 1;
  //     }
  //   }
  // }
}
