
export const Tools = [
  {
    group: '基本形状',
    children: [
      {
        name: 'rectangle',
        icon: 'icon-rect',
        data: {
          text: '正方形',
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'rectangle',
        }
      },
      {
        name: 'rectangle',
        icon: 'icon-rectangle',
        data: {
          text: '圆角矩形',
          rect: {
            width: 200,
            height: 50
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 0.1,
          name: 'rectangle'
        }
      },
      {
        name: 'circle',
        icon: 'icon-circle',
        data: {
          text: '圆',
          rect: {
            width: 100,
            height: 100
          },
          name: 'circle',
          textMaxLine: 1
        }
      },
      {
        name: 'triangle',
        icon: 'icon-triangle',
        data: {
          text: '三角形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'triangle'
        }
      },
      {
        name: 'message',
        icon: 'icon-msg',
        data: {
          text: '消息框',
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'message'
        }
      },
      {
        name: 'text',
        icon: 'icon-text',
        data: {
          text: '工业布线画图软件',
          rect: {
            width: 160,
            height: 30
          },
          name: 'text'
        }
      },
      {
        name: 'image',
        icon: 'icon-image',
        data: {
          text: '',
          rect: {
            width: 100,
            height: 100
          },
          name: 'image',
          image: '/assets/img/logo.png'
        }
      },
      {
        name: 'cube',
        icon: 'icon-cube',
        data: {
          rect: {
            width: 50,
            height: 70
          },
          is3D: true,
          z: 10,
          zRotate: 15,
          name: 'cube',
        }
      }
    ]
  },
  {
    group: '分线盒产品',
    children: [
      {
        name: '分线板',
        img: '/assets/img/tools/fenxianban.png',
        style: {
          width: '30px',
          height: '70px',
        },
        data: {
          text: '分线板',
          rect: {
            width: 60,
            height: 190
          },
          image: '/assets/img/tools/fenxianban.png',
          // name: 'fenXianHe'
          name: 'branchbox',
          attribute: {
            productName: '出线式分线盒',
            channelType: 0,
            signalType: 0,
            portType: 0,
            feature: 0,
            configuration: 0,
            modelsType: 'g',
            }
        }
      },
      {
        name: '分线盒',
        img: '/assets/img/tools/fenxianhe.png',
        style: {
          width: '30px',
          height: '70px',
        },
        data: {
          text: '分线盒',
          rect: {
            width: 60,
            height: 190
          },
          image: '/assets/img/tools/fenxianhe.png',
          // name: 'fenXianHe'
          name: 'image',
        }
      },
      {
        name: 'Sprider67模块',
        img: '/assets/img/tools/spider67.png',
        style: {
          width: '30px',
          height: '70px',
        },
        data: {
          text: 'Sprider67模块',
          rect: {
            width: 60,
            height: 190
          },
          image: '/assets/img/tools/spider67.png',
          // name: 'fenXianHe'
          name: 'sprider67',
        }
      },

    ]
  },
  {
    group: '法兰连接器产品',
    children: [
      {
        name: '电源T型分支',
        img: '/assets/img/tools/T.png',
        style: {
          width: '30px',
          height: '20px',
        },
        data: {
          text: 'T型分支',
          rect: {
            width: 40,
            height: 30
          },
          image: '/assets/img/tools/T.png',
          name: 't',
        }
      },

    ]
  },
  {
    group: 'I/O预注连接器',
    children: [

    ]
  },
  {
    group: '连接附件',
    children: [


    ]
  },
];
