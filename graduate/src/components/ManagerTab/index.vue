<template>
  <div class="container">
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'ManagerTab',
  data () {
    return {
    }
  },
  props: {

  }
}
</script>

<style scoped lang="scss">
.container{
  padding-bottom: 20px  ;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .el-input,.el-select{
    width: 200px;
    margin-right: 9px;
  }
}
</style>
