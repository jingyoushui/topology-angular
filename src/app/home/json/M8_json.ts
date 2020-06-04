
export class  M8json {
  M8_json: any;
  constructor() {
    this.M8_json = {
      fenxianheMuban: {
        id: '',
        text: '模块一',
        rect: {
          width: 860,
          height: 331,
          x: 329,
          y: 139,
          center:{
            x:759,
            y:304.5,
          }
        },

        hideRotateCP: true,
        name: 'fenxianheMuban',
        mubanId: '',
        locked: true,
      },
      fangshuisai:{
        id: '',
        text: '0',
        rect: {
          width: 100,
          height: 24,
          x: 362,
          y: 435,
          center:{
            x:412,
            y:447
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
          x: 492,
          y: 435,
          center:{
            x:542,
            y:447
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
      fenxianhe: {
        id: '',
        text: '',
        rect: {
          width: 140,
          height: 30,
          x: 611,
          y: 289.5,
          center:{
            x:681,
            y:304.5
          }
        },
        image: '/assets/img/tools/fenxianhe_x.png',
        name: 'fenxianhe',
        mubanId: '',
        attribute: {
          productName: '出线式分线盒',
          channelType: 0,
          signalType: 0,
          portType: 0,
          feature: 0,
          configuration: 0,
          modelsType: 'g',
        },
        locked: true
      },
      lines: [
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 686,
              y: 233.5,
              direction: 1,
              anchorIndex: 0,
              id: ''
            },
            {
              x: 686,
              y: 176.5
            }
          ],
          from: {
            x: 686,
            y: 289.5,
            direction: 1,
            anchorIndex: 0,
            id: ''
          },
          to: {
            x: 911.5,
            y: 176.5
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 705,
              y: 252.5,
              direction: 1,
              anchorIndex: 1,
              id: ''
            },
            {
              x: 705,
              y: 210
            },
          ],
          from: {
            x: 705,
            y: 289.5,
            direction: 1,
            anchorIndex: 1,
            id: ''
          },
          to: {
            x: 911.5,
            y: 210
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 723.5,
              y: 264.5,
              direction: 1,
              anchorIndex: 2,
              id: ''
            },
            {
              x: 723.5,
              y: 239.5
            }
          ],
          from: {
            x: 723.5,
            y: 289.5,
            direction: 1,
            anchorIndex: 2,
            id: ''
          },
          to: {
            x: 911.5,
            y: 239.5
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 742.5,
              y: 279.5,
              direction: 1,
              anchorIndex: 3,
              id: ''
            },
            {
              x: 742.5,
              y: 268.5
            }
          ],
          from: {
            x: 742.5,
            y: 289.5,
            direction: 1,
            anchorIndex: 3,
            id: ''
          },
          to: {
            x: 911.5,
            y: 268.5
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 742.5,
              y: 330.5,
              direction: 3,
              anchorIndex: 7,
              id: ''
            },
            {
              x: 742.5,
              y: 342.5
            }
          ],
          from: {
            x: 742.5,
            y: 319.5,
            direction: 3,
            anchorIndex: 7,
            id: ''
          },
          to: {
            x: 911.5,
            y: 342.5
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 723.5,
              y: 348.5,
              direction: 3,
              anchorIndex: 6,
              id: ''
            },
            {
              x: 723.5,
              y: 378.5
            }
          ],
          from: {
            x: 723.5,
            y: 319.5,
            direction: 3,
            anchorIndex: 6,
            id: ''
          },
          to: {
            x: 911.5,
            y: 378.5,
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 705,
              y: 366.5,
              direction: 3,
              anchorIndex: 5,
              id: ''
            },
            {
              x: 705,
              y: 413.5
            }
          ],
          from: {
            x: 705,
            y: 319.5,
            direction: 3,
            anchorIndex: 5,
            id: ''
          },
          to: {
            x: 911.5,
            y: 413.5
          },
          // locked: true
        },
        {
          name: 'polyline',
          lineWidth: 1,
          dash: 1,
          controlPoints: [
            {
              x: 686,
              y: 383.5,
              direction: 3,
              anchorIndex: 4,
              id: ''
            },
            {
              x: 686,
              y: 447.5
            }
          ],
          from: {
            x: 686,
            y: 319.5,
            direction: 3,
            anchorIndex: 4,
            id: ''
          },
          to: {
            x: 913,
            y: 447.5
          },
          // locked: true
        },
      ],
      plugs: {
          id: '',
          text: '',
          rect: {
            width: 33,
            height: 20,
            x: 911.5,
            y: 166,
            center:{
              x:928,
              y:176.5
            },
          },
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
          x: 611,
          y: 304.5,
          direction: 4,
          anchorIndex: 8,
          id: ''
        },
        to: {
          x: 558.5,
          y: 304.5,
          direction: 2,
        },
        locked: true
      },
      zidingyi: {
        name: '自定义',
        img: '/assets/img/favicon.ico',
        style: {
          width: '37px',
          height: '55px',
        },
        data: {
          text: '自定义',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/favicon.ico',
          name: 'zidingyi',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
              paddingBottom: 5,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                rotate: 0
              },
              font: {
                fontFamily: 'Arial',
                color: '#242424',
                textAlign: 'left',
                textBaseline: 'middle'
              },
              hideSizeCP: true,
              hideAnchor: true,
              hideRotateCP: true,
            }
          ],
          mubanId: '',
          // 底层组件的属性
          property: {
            jixing: 'NPN',
            leixing: 'in',
            xianzhi: '3',
            jiekou: 'M8',
            current: 2,
            name: '自定义组件',
            desc: ''
          }
        }
      },

      yuliu: {
        name: '预留',
        img: '/assets/img/tools/yuliu.png',
        style: {
          width: '37px',
          height: '55px',
        },
        data: {
          text: '预留',
          rect: {
            width: 280,
            height: 20
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/yuliu.png',
          name: 'yuliu',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
              paddingBottom: 5,
              rectInParent: {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                rotate: 0
              },
              font: {
                fontFamily: 'Arial',
                color: '#242424',
                textAlign: 'left',
                textBaseline: 'middle'
              },
              hideSizeCP: true,
              hideAnchor: true,
              hideRotateCP: true,
            }
          ],
          mubanId: '',
        }
      },


    };
  }
}

