import React from 'react';
import * as echarts from 'echarts';
import { getPie3D } from '../../components/3dchart'
import Module from '../../components/Module'
import './Chart.scss'
import 'echarts-gl'
import 'echarts-liquidfill'

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data1: [
        { value: 50, name: '通过', color: '#2C69FF', key: 'checkPassNum' },
        { value: 258, name: '不通过', color: '#FD466F', key: 'checkFailNum' }
      ],
      data2: [
        { time: '08-07', a: 234, b: 452 },
        { time: '08-08', a: 543, b: 234 },
        { time: '08-09', a: 342, b: 234 },
        { time: '08-10', a: 456, b: 765 },
        { time: '08-11', a: 736, b: 567 }
      ],
      data3: [
        {
          value: 123,
          name: '24小时内',
          number: 0,
          positive: 0,
          itemStyle: { color: '#21B87D' },
          key: '24'
        },
        {
          value: 456,
          name: '48小时内',
          number: 0,
          positive: 0,
          itemStyle: { color: '#F7DC65' },
          key: '48'
        },
        {
          value: 789,
          name: '72小时内',
          number: 0,
          positive: 0,
          itemStyle: { color: '#059AF5' },
          key: '72'
        },
        {
          value: 12345,
          name: '超出72小时',
          number: 0,
          positive: 0,
          itemStyle: { color: '#FF2B5A' },
          key: 'Other'
        }
      ],
      data4: [
        { value: 0.1, name: '24小时内', color: '#21B87D', number: 123, positive: 123, key: '24' },
        { value: 0.2, name: '48小时内', color: '#F7DC65', number: 234, positive: 234, key: '48' },
        { value: 0.4, name: '72小时内', color: '#059AF5', number: 1233, positive: 1233, key: '72' },
        { value: 0.7, name: '超出72小时', color: '#FF2B5A', number: 234234, positive: 234234, key: 'Other' }
      ]
    };
  }

  componentDidMount() {
    this.initChart1()
    this.initChart2()
    this.initChart3()
    this.initChart4()
  }

  initChart1 () {
    var chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption({
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['100%', '90%'],
          avoidLabelOverlap: false,
          itemStyle: {
            color: params => params.data.color,
            borderRadius: 20,
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 30
          },
          emphasis: {
            disabled: true
          },
          label: {
            show: true,
            position: 'center',
            formatter: (params) => {
              return `{c|${this.state.data1.reduce(function(total,currentValue){
                return total.value + currentValue.value;
              })}}\n{a|人}\n{b|总数}`
            },
            textStyle: {
              rich: {
                c: {
                  fontSize: 38,
                  color: '#A8ACB7',
                  fontFamily: 'HTYPEtest01-Bold',
                },
                a: {
                  fontSize: 14,
                  color: '#A8ACB7',
                  padding: [12, 0, 16, 0]
                },
                b: {
                  fontSize: 18,
                  color: '#A8ACB7'
                }
              }
            }
          },
          data: this.state.data1
        }
      ]
    })
  }
  initChart2 () {
    var chart2 = echarts.init(document.getElementById('chart2'))
    chart2.setOption({
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'line'
        }
      },
      grid: {
        bottom: 20,
        right: 24
      },
      legend: {
        right: 0,
        textStyle: {
          color: '#000'
        },
        itemWidth: 6,
        itemHeight: 6,
        icon: 'rect',
        data: [
          {
            name: '苍盐海',
            itemStyle: {
              color: '#2859FE'
            }
          },
          {
            name: '水云天',
            itemStyle: {
              color: '#FD466F'
            }
          }
        ]
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.state.data2.map(i => i.time),
        axisTick: {
          // alignWithLabel: true
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '人',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.08)'
            }
          }
        }
      ],
      series: [
        {
          name: '苍盐海',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(0,107,172,0.68)'
              },
              {
                offset: 1,
                color: 'rgba(2,131,210,0.05)'
              }
            ])
          },
          lineStyle: {
            width: 3,
            type: 'dotted'
          },
          tooltip: {
            backgroundColor: '#1F1F1F',
            borderColor: 'rgba(57,64,68,1)',
            borderWidth: 1,
            textStyle: {
              color: '#1DA9FF',
              fontSize: 32,
              fontFamily: 'HTYPEtest01-Bold'
            },
            formatter: '{c}',
            padding: [1, 7]
          },
          data: this.state.data2.map(i => i.a)
        },
        {
          name: '水云天',
          type: 'line',
          itemStyle: {
            color: '#FD466F'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#C43C5A'
              },
              {
                offset: 1,
                color: 'rgba(253,70,111,0.05)'
              }
            ])
          },
          lineStyle: {
            width: 3,
            type: 'dotted'
          },
          smooth: true,
          tooltip: {
            backgroundColor: '#1F1F1F',
            borderColor: 'rgba(76,66,69,1)',
            borderWidth: 1,
            textStyle: {
              color: '#FD456F',
              fontSize: 32,
              fontFamily: 'HTYPEtest01-Bold'
            },
            formatter: '{c}',
            padding: [1, 7]
          },
          // yAxisIndex: 1,
          data: this.state.data2.map(i => i.b)
        }
      ]
    })
  }
  initChart3 () {
    var chart3 = echarts.init(document.getElementById('chart3'));
    const option = getPie3D([].concat(this.state.data3), 0.8, 150, 28, 15, 0.5)
    chart3.setOption(option)
  }
  initChart4 () {
    var chart4 = echarts.init(document.getElementById('chart4'));
    chart4.setOption({
      series: [
        {
          type: 'liquidFill',
          data: [].concat(this.state.data4).sort((a, b) => b.number - a.number),
          radius: '80%',
          outline: {
            show: false
          },
          label: {
            show: false
          },
          backgroundStyle: {
            color: '#fff'
          },
          color: []
            .concat(this.state.data4)
            .sort((a, b) => b.number - a.number)
            .map(i => i.color),
          shape:
            'path://M63.4,0.5c1.1,0,2.2,0.5,2.9,1.2c0.7,0.7,1.2,1.8,1.2,2.9S67,6.7,66.3,7.5c-0.8,0.7-1.8,1.2-2.9,1.2l0,0     h-6.1l0,141.9c0,6.3-2.6,12.1-6.8,16.2c-4.2,4.2-10,6.7-16.5,6.7s-12.2-2.6-16.5-6.7c-4.2-4.1-6.8-9.9-6.8-16.2l0,0l0-141.9H4.6     c-1.1,0-2.2-0.5-2.9-1.2C1,6.7,0.5,5.7,0.5,4.6S1,2.4,1.7,1.7C2.5,1,3.5,0.5,4.6,0.5l0,0H63.4z'
        }
      ]
    })
  }
  
  render () {
    return (
      <div className='contanier'>
        <Module title={'饼图'}>
          <div id="chart1" className='chart'></div>
        </Module>

        <Module title={'折线图'}>
          <div id="chart2" className='chart'></div>
        </Module>

        <Module title={'3d饼图'}>
          <div id="chart3" className='chart'></div>
        </Module>

        <Module title={'水球图'}>
          <div id="chart4" className='chart'></div>
        </Module>
      </div>
    )
  }
}

export default Chart;