<template>
  <d2-container>
    <manager-tab>
      <template slot="content">
        <el-input v-model="key" placeholder="请输入相关订单关键字" size="small"></el-input>
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
        <vxe-table-column type="expand" width="80" title="订单详情">
          <template #content="{ row }">
            <vxe-table
              border
              :data="row.goodList">
              <vxe-table-column field="name" title="商品名称"></vxe-table-column>
              <vxe-table-column field="count" title="数量"></vxe-table-column>
            </vxe-table>
          </template>
        </vxe-table-column>
        <vxe-table-column field="id" title="订单编号" min-width="200"></vxe-table-column>
        <vxe-table-column field="name" title="客户姓名" min-width="200"></vxe-table-column>
        <vxe-table-column field="status_str" title="订单状态" min-width="200"></vxe-table-column>
        <vxe-table-column field="create_time" title="起始时间" min-width="200"></vxe-table-column>
        <vxe-table-column field="end_time" title="结束时间" min-width="200" :formatter="formatEndTime"></vxe-table-column>
      </template>
      <template slot="form">
        <el-form :model="formData" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="客户">
                <el-select v-model="formData.customerId" placeholder="请选择客户" style="width: 100%" @change="this.$forceUpdate">
                  <el-option :label="item.label" :value="item.value" v-for="item in customerOptions"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属地区">
                <el-select v-model="formData.place" placeholder="请选择所属地区" style="width: 100%">
                  <el-option :label="item.label" :value="item.value" v-for="item in worldOptions"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="详细地址">
                <el-input v-model="formData.address" placeholder="请输入详细地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="订单状态">
                <el-select v-model="formData.status" placeholder="请选择订单状态" style="width: 100%">
                  <el-option :label="item.label" :value="item.value" v-for="item in processOptions"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="item in formData.goodList">
            <el-col :span="6">
              <el-form-item label="商品">
                <el-select v-model="item.id" placeholder="请选择商品" style="width: 100%">
                  <el-option :label="store.label" :value="store.value" v-for="store in goodOptions"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item style="display: flex;justify-content: space-around;">
                <img v-for="img in item.images" :src="'http://81.71.85.68:3036/static'+img" style="width: 50%">
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="购买数量">
                <el-input v-model="item.count" placeholder="请输入购买数量"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="display: flex;justify-content: center">
            <el-button type="text" @click="pushGood"><i class="el-icon-circle-plus"></i></el-button>
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
import { GetTableData, SaveCustomer, UpdateCustomer, DeleteCustomer } from '@/api/modules/orderManager'
import { GetTableData as GetCustomer } from '@/api/modules/customerManager'
import { GetTableData as GetGood } from '@/api/modules/goodManager'
import { printToExcel } from '@/api/modules/exportToExcel'
import worldOptions from '@/libs/worldOptions'
import processOptions from '@/libs/processOptions'

export default {
  name: 'orderMain',
  components: { ManagerTable, ManagerTab },
  data () {
    return {
      worldOptions,
      processOptions,
      customerOptions: [],
      goodOptions: [],
      activeName: '1',
      key: '',
      selectedUserType: null,
      formData: {
        id: '',
        customerId: '',
        place: '',
        address: '',
        status: '',
        goodList: [
          { id: '', count: '' }
        ]
      },
      showEdit: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getCustomer()
      this.getGood()
    },
    async getCustomer () {
      const res = await GetCustomer({ currentPage: 1, size: 10, key: '' })
      this.customerOptions = res.data.data.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    async getGood () {
      const res = await GetGood({ currentPage: 1, size: 10, key: '' })
      this.goodOptions = res.data.data.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    submit () {
      this.$refs.ctable.submitEvent()
    },
    pushGood () {
      this.formData.goodList.push({
        id: '',
        count: ''
      })
    },
    setShowEdit (val) {
      this.showEdit = val
    },
    setFormData (val) {
      this.formData = JSON.parse(JSON.stringify(val))
    },
    insertEvent () {
      this.showEdit = true
      this.formData = {
        id: '',
        customerId: '',
        place: '',
        address: '',
        status: '',
        goodList: [
          { id: '', count: '' }
        ]
      }
    },
    exportToExcel () {
      printToExcel(
        [['订单', '', '', '', '', '']],
        this.$refs.ctable.tableData.map((item, index) => {
          return {
            index: index + 1,
            id: item.id,
            name: item.name,
            status_str: item.status_str,
            create_time: item.create_time,
            end_time: item.end_time
          }
        }),
        ['index', 'id', 'name', 'status_str', 'create_time', 'end_time'],
        '订单表',
        ['A1:F1'],
        ['序号', '订单编号', '客户姓名', '订单状态', '创建时间', '结束时间']).then(() => {
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
        if (item.goodList) {
          item.goodList = JSON.parse(item.goodList)
        } else {
          item.goodList = []
        }
        switch (item.status) {
          case 0:
            item.status_str = '订单正在处理'
            break
          case 1:
            item.status_str = '正在准备货物'
            break
          case 2:
            item.status_str = '货物运输中'
            break
          case 3:
            item.status_str = '货物已到达所属地区'
            break
          case 4:
            item.status_str = '所属地区内快递中'
            break
          case 5:
            item.status_str = '待验收'
            break
          case 6:
            item.status_str = '售后保障中'
            break
          case 7:
            item.status_str = '订单已完结'
            break
        }
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
    },
    clickEvent () {
      this.$refs.xDown.togglePanel()
    },
    formatEndTime ({ cellValue, row, column }) {
      if (!cellValue) {
        return '待确认'
      } else {
        return cellValue
      }
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
.my-dropdown {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
</style>
