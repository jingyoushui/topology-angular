
// @ts-ignore
// @ts-ignore
export const Tools = [
  {
    group: '基本形状',
    children: [
      {
        name: 'rectangle',
        icon: 'icon-rect',
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
        style: {
          width: '40px',
          height: '40px',
        },
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
      // {
      //   name: '分线板',
      //   img: '/assets/img/tools/fenxianban.png',
      //   style: {
      //     width: '30px',
      //     height: '70px',
      //   },
      //   data: {
      //     text: '分线板',
      //     rect: {
      //       width: 60,
      //       height: 190
      //     },
      //     image: '/assets/img/tools/fenxianban.png',
      //     // name: 'fenXianHe'
      //     name: 'branchbox',
      //     attribute: {
      //       productName: '出线式分线盒',
      //       channelType: 0,
      //       signalType: 0,
      //       portType: 0,
      //       feature: 0,
      //       configuration: 0,
      //       modelsType: 'g',
      //       }
      //   }
      // },
      {
        name: '分线盒',
        img: '/assets/img/tools/fenxianhe_y.png',
        style: {
          width: '30px',
          height: '110px',
        },
        data: {
          text: '',
          rect: {
            width: 230,
            height: 50
          },
          image: '/assets/img/tools/fenxianhe.png',
          // name: 'fenXianHe'
          name: 'fenxianhe',
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


    ]
  },
  {
    group: '终端产品',
    children: [
      {
        name: '急停按钮',
        img: '/assets/img/tools/jitingButton.png',
        style: {
          width: '37px',
          height: '60px',
        },
        data: {
          text: '急停按钮',
          rect: {
            width: 100,
            height: 45
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/jitingButton.png',
          name: 'jitingButton',
        }
      },
      {
        name: '急停按钮',
        img: '/assets/img/tools/jitingButton2.png',
        style: {
          width: '37px',
          height: '60px',
          padding: '0 0 0 6px'
        },
        data: {
          text: '急停按钮',
          rect: {
            width: 70,
            height: 90
          },
          image: '/assets/img/tools/jitingButton2.png',
          name: 'jitingButton2',
        }
      },
      {
        name: 'OK/NG显示',
        img: '/assets/img/tools/OKNG.png',
        style: {
          width: '37px',
          height: '60px',
          padding: '0 0 0 6px'
        },
        data: {
          text: 'OK/NG显示',
          rect: {
            width: 50,
            height: 90
          },
          image: '/assets/img/tools/OKNG.png',
          name: 'OKNG',
        }
      },
      {
        name: '吹气中继',
        img: '/assets/img/tools/zhongji.png',
        style: {
          width: '37px',
          height: '60px',
          padding: '0 0 0 6px'
        },
        data: {
          text: '吹气中继',
          rect: {
            width: 50,
            height: 90
          },
          image: '/assets/img/tools/zhongji.png',
          name: 'zhongji',
        }
      },
    ]
  },
  {
    group: '法兰连接器产品',
    children: [
      {
        name: '法兰式连接器',
        img: '/assets/img/tools/flangeCouplingConnector.png',
        style: {
          width: '37px',
          height: '60px',
        },
        data: {
          text: '法兰式连接器',
          rect: {
            width: 80,
            height: 110
          },
          image: '/assets/img/tools/flangeCouplingConnector.png',
          name: 'flangeCouplingConnector',
        }
      },
    ]
  },
  {
    group: '连接附件',
    children: [


    ]
  },
];
