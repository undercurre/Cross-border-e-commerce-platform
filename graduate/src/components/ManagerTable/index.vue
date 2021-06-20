<template>
  <div class="table_box">
      <vxe-table
        :loading="loading"
        :data="tableData"
        show-overflow
        border
        resizable
        keep-source
        ref="xTable"
        @cell-dblclick="cellDBLClickEvent"
        :expand-config="{accordion: true}"
        align="center"
      >
        <vxe-table-column
          type="seq"
          title="序号"
          width="50">
        </vxe-table-column>
        <slot name="template"></slot>
        <vxe-table-column title="操作" width="200" fixed="right">
          <template #default="{ row }">
            <vxe-button @click="editEvent(row)">编辑</vxe-button>
            <vxe-button @click="removeEvent(row)">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        :hide-on-single-page="singlePage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
      <el-dialog  :title="selectRow ? '编辑&保存' : '新增&保存'"
                  :visible.sync="tempShowEdit"
                  width="60%"
                  :before-close="clearTempFormData">
        <slot name="form"></slot>
      </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ManagerTable',
  data () {
    return {
      tableData: [],
      pagination: {
        currentPage: 1,
        total: 1,
        size: 10
      },
      tempFormData: this.formData,
      loading: false,
      singlePage: false,
      tempShowEdit: this.showEdit,
      selectRow: null,
      submitLoading: false
    }
  },
  created () {
    this.setTableData()
  },
  methods: {
    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    clearTempFormData () {
      Object.keys(this.formData).forEach(item => {
        const type = Object.prototype.toString.call(this.formData[item]).slice(7, -1)
        if (type === 'String') {
          this.tempFormData[item] = ''
        } else {
          this.tempFormData[item] = []
        }
      })
      this.tempShowEdit = false
    },
    submitEvent () {
      this.submitLoading = true
      setTimeout(async () => {
        let res
        if (this.selectRow) {
          res = await this.updateMethod(this.tempFormData)
        } else {
          res = await this.saveMethod(this.tempFormData)
        }
        if (res.code === 1) {
          this.submitLoading = false
          this.tempShowEdit = false
          this.setTableData()
          if (this.selectRow) {
            this.$notify({ title: '保存成功', message: res.msg, type: 'success' })
          } else {
            this.$notify({ title: '新增成功', message: res.msg, type: 'success' })
          }
          this.selectRow = null
          this.clearTempFormData()
        } else {
          if (this.selectRow) {
            this.$notify({ title: '保存失败', message: res.msg, type: 'error' })
          } else {
            this.$notify({ title: '新增失败', message: res.msg, type: 'error' })
          }
        }
      }, 500)
    },
    editEvent (row) {
      this.tempFormData = {}
      Object.keys(this.formData).forEach(item => {
        if (row[item] !== null) {
          this.tempFormData[item] = row[item]
        } else {
          this.tempFormData[item] = []
        }
      })
      this.selectRow = row
      this.tempShowEdit = true
      this.$emit('getFormData', this.tempFormData)
    },
    removeEvent (row) {
      this.$confirm('您确定要删除该数据?').then(async type => {
        if (type === 'confirm') {
          const res = await this.deleteMethod({ id: row.id })
          if (res.code === 1) {
            this.$notify({ title: '删除成功', message: res.msg, type: 'success' })
            this.setTableData()
          } else {
            this.$notify({ title: '删除失败', message: res.msg, type: 'error' })
          }
        }
      })
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.setTableData()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.setTableData()
    },
    async setTableData (key) {
      if (key) {
        this.pagination.key = key
      }
      const res = await this.getTableData(this.pagination)
      const data = this.mapData(res.data.data)
      this.tableData = data
      this.pagination.size = res.data.size
      this.pagination.total = res.data.total
      this.pagination.currentPage = res.data.currentPage
      if (this.pagination.total / this.pagination.size <= 1) {
        this.singlePage = true
      }
      this.pagination.key = null
      this.$nextTick(() => {
        this.loading = false
      })
    },
  },
  props: {
    getTableData: {
      type: Function
    },
    formData: {
      type: Object
    },
    showEdit: {
      type: Boolean
    },
    saveMethod: {
      type: Function
    },
    updateMethod: {
      type: Function
    },
    deleteMethod: {
      type: Function
    },
    mapData: {
      type: Function
    }
  },
  watch: {
    tempShowEdit: {
      handler (val) {
        this.$emit('getShowEdit', val)
        if (!val) {
          this.selectRow = null
        }
      }
    },
    showEdit: {
      handler (val) {
        this.tempShowEdit = val
      }
    },
    formData: {
      handler (val) {
        this.tempFormData = val
      }
    }
  }
}
</script>

<style scoped lang="scss">
.table_box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .vxe-table{
    flex: 1;
  }
  .el-pagination {
    flex: 0;
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
}
</style>
