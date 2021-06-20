<template>
  <el-select
    clearable
    :multiple = "multiple"
    v-model="localData"
    :disabled="disabled"
    style="width: 100%"
    :placeholder="'请选择' + placeholderStr"
    size="small"
    @visible-change="focusKey"
  >
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
    ></div>
    <div
      style="
                          display: flex;
                          padding: 0 10px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
    >
      <el-input
        v-model="pagination.Key"
        @input="searchClick"
        :placeholder="'请输入'+ placeholderStr +'关键字'"
        @keyup.enter.native="searchClick"
        size="small"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click.prevent="searchClick"
        size="small"
      >搜索</el-button>
    </div>
    <el-option
      v-for="item in list"
      :key="item.ID"
      :label="item.NAME"
      :value="item.NAME"
      :disabled="item.disabled"
    >
      <span style="float: left">{{ item.NAME }}</span>
      <span style="float: right">{{ item.DESCRIPTION }}</span>
    </el-option>
    <div
      style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
    >
      <el-pagination
        :pager-count="5"
        :current-page="pagination.Page"
        :page-size="pagination.Limit"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="paginationSizeChange"
        @current-change="paginationCurrentChange"
      />
    </div>
  </el-select>
</template>

<script>

export default {
  name: 'PSelect',
  data () {
    return {
      localData: this.bindData,
      list: [],
      pagination: {
        Limit: 10,
        Page: 1,
        Key: ''
      },
      total: 0
    }
  },
  created () {
    this.getList()
  },
  methods: {
    focusKey () {
      this.pagination.Key = ''
      this.getList()
    },
    searchClick () {
      this.pagination.Page = 1
      this.getList()
    },
    async getList () {
      this.list = [{
        ID: 1,
        NAME: '11111111111',
        DESCRIPTION: '测试号',
        disabled: false
      }, {
        ID: 2,
        NAME: '22222222222',
        DESCRIPTION: '测试号',
        disabled: false
      }]
    },
    // async searchNull () {
    //   const res = await this.requestData({
    //     Limit: 10,
    //     Page: 1,
    //     Key: ''
    //   })
    //   this.list = res.Result.data
    //   this.total = res.Result.count
    // },
    paginationSizeChange (Limit) {
      this.pagination.Limit = Limit
      this.getList()
    },
    paginationCurrentChange (Page) {
      this.pagination.Page = Page
      this.getList()
    }
  },
  props: {
    bindData: {
      type: [String, Array]
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholderStr: {
      type: String,
      default: '请选择料号'
    },
    PARAM_NAME: {
      type: String
    }
  },
  watch: {
    localData: {
      handler (val) {
        this.$emit('getData', { val: val, name: this.PARAM_NAME })
        this.getList()
      }
    },
    bindData: {
      handler (val) {
        this.localData = val
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
