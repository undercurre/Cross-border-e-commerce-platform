<template>
 <d2-container>
   <manager-tab>
     <template slot="content">
       <el-input v-model="key" placeholder="请输入相关用户名关键字" size="small"></el-input>
<!--       <el-select v-model="selectedUserType" placeholder="请选择用户类别" size="small">-->
<!--         <el-option-->
<!--           v-for="item in userType"-->
<!--           :key="item.value"-->
<!--           :label="item.label"-->
<!--           :value="item.value">-->
<!--         </el-option>-->
<!--       </el-select>-->
       <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
       <el-button type="primary" icon="el-icon-plus" size="small" @click="insertEvent()">新增</el-button>
       <el-button type="info" icon="el-icon-document" size="small" @click="exportToExcel">导出</el-button>
     </template>
   </manager-tab>
   <manager-table     :form-rules="formRules"
                      :form-items="formItems"
                      :form-data="formData"
                      :map-data="mapData"
                      :getTableData="getTableData"
                      :save-method="save"
                      :update-method="update"
                      :delete-method="deleteById"
                      :show-edit="showEdit"
                      @getShowEdit="setShowEdit"
                      ref="ctable">
         <template slot="template">
           <vxe-table-column field="name" title="姓名" min-width="200"></vxe-table-column>
           <vxe-table-column field="type" title="客户类型" min-width="200"></vxe-table-column>
           <vxe-table-column field="level" title="消费等级" min-width="200"></vxe-table-column>
           <vxe-table-column field="place" title="所属地区" min-width="200"></vxe-table-column>
           <vxe-table-column field="date" title="注册时间" min-width="200"></vxe-table-column>
           <vxe-table-column field="phone" title="联系方式" min-width="200"></vxe-table-column>
           <vxe-table-column field="message" title="备注"  min-width="200"></vxe-table-column>
         </template>
   </manager-table>
 </d2-container>
</template>

<script>
import ManagerTab from '@/components/ManagerTab'
import ManagerTable from '@/components/ManagerTable'
import { GetTableData, SaveCustomer, UpdateCustomer, DeleteCustomer } from '@/api/modules/customerManager'
import { printToExcel } from '@/api/modules/exportToExcel'

export default {
  name: 'customerMain',
  components: { ManagerTable, ManagerTab },
  data () {
    return {
      activeName: '1',
      key: '',
      selectedUserType: null,
      userType: [{
        label: '公司',
        value: '1'
      }, {
        label: '个人',
        value: '2'
      }, {
        label: '政府',
        value: '3'
      }],
      formData: {
        name: '',
        level: '',
        type: '',
        date: '',
        place: '',
        message: '',
        phone: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' }
        ]
      },
      formItems: [
        { title: 'Basic information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { icon: 'fa fa-address-card-o' } },
        { field: 'name', title: '姓名', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
        { field: 'phone', title: '联系方式', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入联系方式' } } },
        { field: 'place', title: '所属地区', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入客户所属地区' } } },
        { field: 'date', title: '注册时间', span: 12, itemRender: { name: '$input', props: { type: 'datetime', placeholder: '请选择时间' } } },
        { title: 'Other information', span: 24, titleAlign: 'left', titleWidth: 200, titlePrefix: { icon: 'fa fa-info-circle' } },
        { field: 'level', title: '消费等级', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入联系方式' } } },
        { field: 'type', title: '客户类型', span: 12, itemRender: { name: '$input', props: { placeholder: '请输入客户所属地区' } } },
        { field: 'message', title: '备注', span: 24, itemRender: { name: '$textarea', props: { autosize: { minRows: 2, maxRows: 4 }, placeholder: '请填写备注' } } },
        { align: 'center', span: 24, titleAlign: 'left', itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
      ],
      showEdit: false
    }
  },
  created () {
  },
  methods: {
    setShowEdit (val) {
      this.showEdit = val
    },
    insertEvent () {
      this.showEdit = true
    },
    exportToExcel () {
      console.log(this.$refs.ctable.tableData.map((item, index) => {
        return {
          index: index + 1,
          name: item.name,
          type: item.type,
          level: item.level,
          phone: item.phone,
          place: item.place,
          date: item.date,
          message: item.message
        }
      }))
      printToExcel(
        [['客户表', '', '', '', '', '', '', '']],
        this.$refs.ctable.tableData.map((item, index) => {
          return {
            index: index + 1,
            name: item.name,
            type: item.type,
            level: item.level,
            phone: item.phone,
            place: item.place,
            date: item.date,
            message: item.message
          }
        }),
        ['index', 'name', 'type', 'level', 'phone', 'place', 'date', 'message'],
        '客户表',
        ['A1:H1'],
        ['序号', '客户姓名', '客户类别', '客户等级', '联系方式', '所属地区', '注册时间', '备注']).then(() => {
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
        switch (item.level) {
          case '1':
            item.level = '白银会员'
            break
          case '2':
            item.level = '黄金会员'
            break
          case '3':
            item.level = '钻石会员'
            break
        }
        switch (item.type) {
          case '1':
            item.type = '公司'
            break
          case '2':
            item.type = '个人'
            break
          case '3':
            item.type = '政府'
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
