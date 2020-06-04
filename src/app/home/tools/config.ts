
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
          mubanId: '',
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
          image: '/assets/img/favicon.ico'
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
      },

      {
        name: '分线盒模板',
        img: '/assets/img/tools/FenxianheMuban.png',
        style: {
          width: '40px',
          height: '40px',
        },
        data: {
          text: '模块一',
          rect: {
            width: 500,
            height: 200
          },
          name: 'fenxianheMuban',
          mubanId: '',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }
      }
    ]
  },
  {
    group: '分线盒产品',
    children: [
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
            width: 140,
            height: 30
          },
          paddingLeft: 200,
          image: '/assets/img/tools/fenxianhe_x.png',
          // name: 'fenXianHe'
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
          height: '55px',
        },
        data: {
          text: '急停按钮',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/jitingButton.png',
          name: 'jitingButton',
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
            name: '急停按钮1',
            desc: ''
          }
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
            width: 280,
            height: 25
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/jitingButton2.png',
          name: 'jitingButton2',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
          property: {
            jixing: 'PNP',
            leixing: 'in',
            xianzhi: '4',
            jiekou: 'M12',
            current: 2,
            name: '急停按钮2',
            desc: ''
          }
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
          text: 'OK、NG显示',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/OKNG.png',
          name: 'OKNG',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
          property: {
            jixing: 'PNP',
            leixing: 'out',
            xianzhi: '5',
            jiekou: 'M12',
            current: 2,
            name: 'OK/NG显示',
            desc: ''
          }
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
            width: 280,
            height: 25
          },
          imageWidth: 25,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/zhongji.png',
          name: 'zhongji',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
          property: {
            jixing: 'NPN',
            leixing: 'out',
            xianzhi: '2',
            jiekou: 'M8',
            current: 2,
            name: '吹气中继',
            desc: ''
          }
        }
      },
      {
        name: '转换头',
        img: '/assets/img/tools/1to2_y.png',
        style: {
          width: '37px',
          height: '60px',
        },
        data: {
          text: '转换头',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 40,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/1to2.png',
          name: 'OneToTwo',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
            xianzhi: '2',
            jiekou: 'M8',
            current: 2,
            name: '转换头',
            desc: ''
          }
        }
      },
      {
        name: '开关',
        img: '/assets/img/tools/switch_y.png',
        style: {
          width: '20px',
          height: '60px',
        },
        data: {
          text: '开关',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 80,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/switch.png',
          name: 'switch',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
            xianzhi: '2',
            jiekou: 'M8',
            current: 1,
            name: '开关',
            desc: ''
          }
        }
      },
      {
        name: '电压上升电磁阀',
        img: '/assets/img/tools/diancifaUp_y.png',
        style: {
          width: '37px',
          height: '60px',
          padding: '0 0 0 6px'
        },
        data: {
          text: '电压上升电磁阀',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 60,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/diancifaUp.png',
          name: 'diancifaUp',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
          property: {
            jixing: 'PNP',
            leixing: 'out',
            xianzhi: '5',
            jiekou: 'M12',
            current: 2,
            name: '电压上升电磁阀',
            desc: ''
          }
        }
      },
      {
        name: '电压下降电磁阀',
        img: '/assets/img/tools/diancifaDown_y.png',
        style: {
          width: '37px',
          height: '60px',
          padding: '0 0 0 6px'
        },
        data: {
          text: '电压下降电磁阀',
          rect: {
            width: 280,
            height: 25
          },
          imageWidth: 60,
          font: {
            textAlign: 'left',
          },
          image: '/assets/img/tools/diancifaDown.png',
          name: 'diancifaDown',
          paddingLeft: 150,
          children: [
            {
              text: '备注',
              name: 'text',
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
          property: {
            jixing: 'NPN',
            leixing: 'out',
            xianzhi: '2',
            jiekou: 'M12',
            current: 1,
            name: '电压下降电磁阀',
            desc: ''
          }
        }
      },
    ]
  },
  {
    group: '法兰连接器产品',
    children: [

      // {
      //   name: '电箱',
      //   img: '/assets/img/tools/dianxiang.png',
      //   style: {
      //     width: '40px',
      //     height: '60px',
      //   },
      //   data: {
      //     text: '电箱',
      //     rect: {
      //       width: 90,
      //       height: 130
      //     },
      //     image: '/assets/img/tools/dianxiang.png',
      //     name: 'dianxiang',
      //   }
      // },

      {
        name: '散线型',
        img: '/assets/img/tools/sanxian_y.png',
        style: {
          width: '30px',
          height: '60px',
        },
        data: {
          text: '',
          rect: {
            width: 90,
            height: 25
          },
          image: '/assets/img/tools/sanxian.png',
          name: 'sanxian',
        }
      },
      {
        name: '航线型',
        img: '/assets/img/tools/hangxian_y.png',
        style: {
          width: '30px',
          height: '60px',
        },
        data: {
          text: '',
          rect: {
            width: 90,
            height: 25
          },
          image: '/assets/img/tools/hangxian.png',
          name: 'hangxian',
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
