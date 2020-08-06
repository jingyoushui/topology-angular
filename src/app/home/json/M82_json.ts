export class  M82json {
  M82_json: any;

  constructor() {
    this.M82_json = {
      fenxianheMuban:{
        id: '',
        text: '未命名模块',
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
        text: '',
        rect: {
          x: 214,
          y: 341,
          width: 140,
          height: 30,
          center: {
            x: 284,
            y: 356
          }
        },
        image: '/assets/img/tools/fenxianhe_x.png',
        name: 'fenxianhe',
        mubanId: '',
        attribute: {
          productName: 'M8双信号分线盒',
          channelType: 'dan-duo',
          signalType: 'NPN',
          portType: 'M8',
          feature: 0,
          configuration: 0,
          modelsType: ''
        },
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
            y: 341,
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
            y: 371,
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
