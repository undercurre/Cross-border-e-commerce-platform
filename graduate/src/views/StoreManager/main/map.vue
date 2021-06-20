<template>
  <d2-container>
    <PlaceChart :layout-data="placeData"></PlaceChart>
  </d2-container>
</template>
<script>
import PlaceChart from '@/components/PlaceChart'
import { GetMapData } from '@/api/modules/storeManager'

export default {
  name: 'storeMap',
  components: {
    PlaceChart
  },
  data () {
    return {
      placeData: []
    }
  },
  methods: {
    async init () {
      const res = await GetMapData()
      this.placeData = res.data
    }
  },
  created () {
    this.init()
  }
}
</script>
