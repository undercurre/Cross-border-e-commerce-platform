<template>
  <d2-container>
    <manager-tab>
      <template slot="content">
        <el-input v-model="key" placeholder="请输入相关工厂关键字" size="small"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="insertEvent()">新增</el-button>
        <el-button type="info" icon="el-icon-document" size="small" @click="exportToExcel">导出</el-button>
      </template>
    </manager-tab>
    <manager-table
                       :form-data="formData"
                       :map-data="mapData"
                       :getTableData="getTableData"
                       :save-method="save"
                       :update-method="update"
                       :delete-method="deleteById"
                       :show-edit="showEdit"
                       @getShowEdit="setShowEdit"
                       @getFormData="setFormData"
                       ref="ctable">
      <template slot="template">
        <vxe-table-column field="name" title="工厂名称" min-width="200"></vxe-table-column>
        <vxe-table-column field="place" title="所属地区" min-width="200"></vxe-table-column>
      </template>
      <template slot="form">
        <el-form :model="formData" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属地区">
                <el-select v-model="formData.place" placeholder="请选择所属地区" @change="this.$forceUpdate" style="width: 100%">
                  <el-option :label="item.label" :value="item.value" v-for="item in worldOptions"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row style="display: flex;justify-content: center">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-row>
        </el-form>
      </template>
    </manager-table>
  </d2-container>
</template>

<script>
import ManagerTab from '@/components/ManagerTab'
import ManagerTable from '@/components/ManagerTable'
import { GetTableData, SaveCustomer, UpdateCustomer, DeleteCustomer } from '@/api/modules/factoryManager'
import { printToExcel } from '@/api/modules/exportToExcel'
import worldOptions from '@/libs/worldOptions'

export default {
  name: 'factoryMain',
  components: { ManagerTable, ManagerTab },
  data () {
    return {
      worldOptions,
      activeName: '1',
      key: '',
      formData: {
        id: '',
        name: '',
        place: ''
      },
      showEdit: false
    }
  },
  created () {
  },
  methods: {
    setFormData (val) {
      this.formData = JSON.parse(JSON.stringify(val))
    },
    submit () {
      this.$refs.ctable.submitEvent()
    },
    setShowEdit (val) {
      this.showEdit = val
    },
    insertEvent () {
      this.showEdit = true
    },
    exportToExcel () {
      printToExcel(
        [['工厂', '', '']],
        this.$refs.ctable.tableData.map((item, index) => {
          return {
            index: index + 1,
            name: item.name,
            place: item.place
          }
        }),
        ['index', 'name', 'place'],
        '工厂',
        ['A1:C1'],
        ['序号', '工厂名称', '所属地区']).then(() => {
        this.$notify({
          title: '成功',
          message: '打印成功',
          type: 'success'
        })
      })
    },
    getTableData (query) {
      return GetTableData(query)
    },
    mapData (data) {
      data.map(item => {
        return item
      })
      return data
    },
    save (query) {
      return SaveCustomer(query)
    },
    update (query) {
      return UpdateCustomer(query)
    },
    deleteById (query) {
      return DeleteCustomer(query)
    },
    search () {
      this.$refs.ctable.setTableData(this.key)
      this.key = ''
    },
    handleClick (tab, event) {
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .d2-container-full__body{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .container{
    flex: 0;
  }
}
</style>
