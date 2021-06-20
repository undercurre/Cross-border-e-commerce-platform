<template>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix header">
        <slot name="header"></slot>
<!--        <el-button style="padding: 3px 0" type="text" @click="buttonFunction">{{ buttonStr }}</el-button>-->
      </div>
      <div class="text item">
        <slot name="content"></slot>
      </div>
    </el-card>
</template>

<script>
export default {
  name: 'CustomCard',
  data () {
    return {
    }
  },
  props: {
    buttonStr: {
      type: String,
      default: '更多>>>'
    },
    buttonFunction: {
      type: Function,
      default: function () {
        console.log('空方法')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .box-card ::-webkit-scrollbar {
    display: none;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ::v-deep .el-card__body{
    height: 66.6%;
    overflow-y: scroll;
  }
</style>
