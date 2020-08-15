export class  M12twojson {
  M12two_json: any;

  constructor() {
    this.M12two_json = {
      fenxianheMuban:{
        id: '',
        text: 'M12双通道模块未命名',
        type: 0,
        name: 'fenxianheMubanTwo',
        hideRotateCP: true,
        mubanId: '',
        locked: true,
        rect: {
          x: 26.5,
          y: 44,
          width: 860,
          height: 624,
          center: {
            x: 450.5,
            y: 356
          }
        }
      },
      fenxianhe: {
        id: '',
        text: 'HB-12-08BX-XXU-XXX',
        rect: {
          x: 214,
          y: 336,
          width: 260,
          height: 40,
          center: {
            x: 284,
            y: 356
          }
        },
        imageWidth: 140,
        image: '/Product/fenxianheM12_x.png',
        name: 'fenxianhe',
        mubanId: '',
        attribute: {
          productName: 'M12双信号分线盒',
          channelType: 'dan-duo',
          signalType: 'NPN',
          portType: 'M12',
          feature: 0,
          configuration: 0,
          modelsType: ''
        },
        locked: true
      },
      fangshuisai:{
        id: '',
        text: '0',
        rect: {
          width: 100,
          height: 24,
          x: 76,
          y: 594,
          center:{
            x:126,
            y:606
          },
        },
        name: 'fangshuisai',
        mubanId: '',
        stand: false,
        hideInput: true,
        hideRotateCP: true,
        hideSizeCP: true,
        hideAnchor: true,
        locked: true
      },
      xianbiaopai:{
        id: '',
        text: '0',
        rect: {
          width: 100,
          height: 24,
          x: 76,
          y: 628,
          center:{
            x:126,
            y:640
          },
        },
        name: 'xianbiaopai',
        mubanId: '',
        stand: false,
        hideInput: true,
        hideRotateCP: true,
        hideSizeCP: true,
        hideAnchor: true,
        locked: true
      },
      OneToTwo:{
        id:'',
        text:'',
        rect: {
          x: 450.5,
          y: 82,
          width: 40,
          height: 25,
          center: {
            x: 470.5,
            y: 94.5
          }
        },
        image:'/Product/1to2.png',
        name:'OneToTwo',
        locked: true


      },
      line1:
        {
          name: 'polyline',
          lineWidth: 1,
          text:'CN-0803-S1-V-XXX',
          dash: 0,
          controlPoints: [
            {
              x: 289,
              y: 218,
              direction: 1,
              anchorIndex: 0,
              id: ''
            },
            {
              x: 289,
              y: 94.5
            },
            {
              x: 370.5,
              y: 94.5
            }
          ],
          from: {
            x: 289,
            y: 336,
            direction: 1,
            anchorIndex: 0,
            id: ''
          },
          to: {
            x: 450.5,
            y: 94.5
          },
          fromArrow: 'danFenxianheFromSolid',
          locked: true
        },
      line2:{
          name: 'polyline',
          lineWidth: 1,
          dash: 0,
          text:'CN-0803-S1-V-XXX',
          controlPoints: [
            {
              x: 343,
              y: 415,
              direction: 3,
              anchorIndex: 4,
              id: ''
            },
            {
              x: 343,
              y: 424.5
            },
            {
              x: 430.5,
              y: 424.5
            }
          ],
          from: {
            x: 343,
            y: 376,
            direction: 3,
            anchorIndex: 4,
            id: ''
          },
          to: {
            x: 450.5,
            y: 424.5
          },
        fromArrow: 'danFenxianheFromSolid',
          locked: true,
      },

      rightline1:{
        name: 'line',
        lineWidth: 1,
        dash: 0,
        from: {
          x: 490.5,
          y: 86,
          direction: 2,
          anchorIndex: 1,
          id: ''
        },
        to: {
          x: 607.5,
          y: 78,
          id:''
        },
        locked: true,
      },
      rightline1_1:{
        name: 'line',
        lineWidth: 1,
        dash: 0,
        from: {
          x: 490.5,
          y: 101.5,
          direction: 2,
          anchorIndex: 2,
          id: ''
        },
        to: {
          x: 607.5,
          y: 107,
          id:''
        },
        locked: true,
      },

      plug1: {
        id: '',
        text: '',
        rect: {
          width: 33,
          height: 20,
          x: 607,
          y: 67,
          center:{
            x:624,
            y:77
          },
        },
        name: 'plug',
        plugType:2,
        strokeStyle :'#f50000ff',
        dash:1,
        mubanId: '',
        stand: false,
        hideInput: true,
        hideRotateCP: true,
        hideSizeCP: true,
        hideAnchor: true,
        locked: true
      },
      plug2: {
        id: '',
        text: '',
        rect: {
          width: 33,
          height: 20,
          x: 607,
          y: 97,
          center:{
            x:624,
            y:107
          },
        },
        strokeStyle :'#f50000ff',
        dash:1,
        plugType:2,
        name: 'plug',
        mubanId: '',
        stand: false,
        hideInput: true,
        hideRotateCP: true,
        hideSizeCP: true,
        hideAnchor: true,
        locked: true
      },

      leftLine:  {
        name: 'line',
        lineWidth: 1,
        dash: 1,
        from: {
          x: 214,
          y: 356,
          direction: 4,
          anchorIndex: 8,
          id: ''
        },
        to: {
          x: 156,
          y: 356,
          direction: 2,
        },
        locked: true
      },


    }
  }

}
