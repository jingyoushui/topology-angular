
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
        name: 'diamond',
        icon: 'icon-diamond',
        data: {
          text: '菱形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'diamond'
        }
      },
      {
        name: 'pentagon',
        icon: 'icon-pentagon',
        data: {
          text: '五边形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagon'
        }
      },
      {
        name: 'hexagon',
        icon: 'icon-hexagon',
        data: {
          text: '六边形',
          rect: {
            width: 100,
            height: 100
          },
          paddingTop: 10,
          paddingBottom: 10,
          name: 'hexagon'
        }
      },
      {
        name: 'pentagram',
        icon: 'icon-pentagram',
        data: {
          text: '五角星',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagram'
        }
      },
      {
        name: 'leftArrow',
        icon: 'icon-arrow-left',
        data: {
          text: '左箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'leftArrow'
        }
      },
      {
        name: 'rightArrow',
        icon: 'icon-arrow-right',
        data: {
          text: '右箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'rightArrow'
        }
      },
      {
        name: 'twowayArrow',
        icon: 'icon-twoway-arrow',
        data: {
          text: '双向箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'twowayArrow'
        }
      },
      {
        name: 'line',
        icon: 'icon-line',
        data: {
          text: '直线',
          rect: {
            width: 100,
            height: 100
          },
          name: 'line'
        }
      },
      {
        name: 'cloud',
        icon: 'icon-cloud',
        data: {
          text: '云',
          rect: {
            width: 100,
            height: 100
          },
          name: 'cloud'
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
      },
      {
        name: 'people',
        icon: 'icon-people',
        data: {
          rect: {
            width: 70,
            height: 100
          },
          name: 'people'
        }
      },
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
