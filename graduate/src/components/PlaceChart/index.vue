<template>
  <div style="width: 100%; height: 100%">
    <div ref="myChart" style="width: 100%; height: 100%;"/>
  </div>
</template>
<script>
import 'echarts-gl'
import '@/libs/world'
const echarts = require('echarts')
export default {
  name: 'PlaceChart',
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    window.onresize = this.chart.resize
  },
  methods: {
    initChart () {
      var chartDom = this.$refs.myChart
      this.chart = echarts.init(chartDom)
      var option = {
        backgroundColor: '#fff',
        title: {
          text: '地域分布',
          left: 'center',
          textStyle: {
            color: '#333'
          }
        },
        visualMap: {
          min: 0,
          max: 5,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          color: ['lightskyblue', 'yellow', 'orangered']
        },
        series: [{
          name: 'Customers',
          type: 'map',
          mapType: 'world',
          roam: true,
          itemStyle: {
            emphasis: { label: { show: true } }
          },
          data: this.layoutData
        }]
      }
      option && this.chart.setOption(option)
    }
  },
  props: {
    layoutData: {
      type: Array
    }
  },
  watch: {
    layoutData: {
      handler (val) {
        this.initChart()
      }
    }
  }
}
</script>
