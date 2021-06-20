<template>
  <d2-container>
    <el-card class="box-card">
      <div slot="header" class="clearfix" style="display: flex;justify-content: space-between">
        <span>标题：{{ data.title }}</span>
        <span>发布时间：{{ data.datetime }}</span>
      </div>
      <div class="text item">
        详细内容：{{ data.detail }}
      </div>
    </el-card>
  </d2-container>
</template>

<script>
import { GetDetail } from '@/api/modules/messageManager'

export default {
  name: 'messageDetail',
  data () {
    return {
      data: null
    }
  },
  methods: {
    async getMessageDetail () {
      const res = await GetDetail({ id: this.$route.query.id })
      this.data = res.data[0]
    }
  },
  created () {
    this.getMessageDetail()
  }
}
</script>

<style scoped>

</style>
