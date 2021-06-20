<template>
 <d2-container>
   <manager-tab>
     <template slot="content">
       <el-input v-model="key" placeholder="请输入相关用户名关键字" size="small"></el-input>
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
           <vxe-table-column field="name" title="姓名" min-width="200"></vxe-table-column>
           <vxe-table-column field="type_str" title="客户类型" min-width="200"></vxe-table-column>
           <vxe-table-column field="level_str" title="客户等级" min-width="200"></vxe-table-column>
           <vxe-table-column field="place" title="所属地区" min-width="200"></vxe-table-column>
           <vxe-table-column field="date" title="注册时间" min-width="200"></vxe-table-column>
           <vxe-table-column field="phone" title="联系方式" min-width="200"></vxe-table-column>
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
                 <el-form-item label="类型">
                   <el-select v-model="formData.type" placeholder="请选择类型" style="width: 100%">
                     <el-option :label="item.label" :value="item.value" v-for="item in [{label: '个人',value: '0'},{label: '公司',value: '1'},{label: '政府',value: '2'}]"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <el-form-item label="客户等级">
                   <el-select v-model="formData.level" placeholder="请选择等级" style="width: 100%">
                     <el-option :label="item.label" :value="item.value" v-for="item in levelOptions"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="联系方式" >
                   <el-input v-model="formData.phone" placeholder="请输入联系方式"></el-input>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <el-form-item label="所属地区">
                   <el-select v-model="formData.place" placeholder="请选择所属地区" style="width: 100%">
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
import { GetTableData, SaveCustomer, UpdateCustomer, DeleteCustomer } from '@/api/modules/customerManager'
import { printToExcel } from '@/api/modules/exportToExcel'
import levelOptions from '@/libs/levelOptions'
import worldOptions from '@/libs/worldOptions'

export default {
  name: 'customerMain',
  components: { ManagerTable, ManagerTab },
  data () {
    return {
      levelOptions,
      worldOptions,
      key: '',
      formData: {
        id: '',
        name: '',
        level: '',
        type: '',
        place: '',
        phone: ''
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
        [['客户表', '', '', '', '', '', '', '']],
        this.$refs.ctable.tableData.map((item, index) => {
          return {
            index: index + 1,
            name: item.name,
            type: item.type,
            level: item.level,
            phone: item.phone,
            place: item.place
          }
        }),
        ['index', 'name', 'type', 'level', 'phone', 'place'],
        '客户表',
        ['A1:F1'],
        ['序号', '客户姓名', '客户类别', '客户等级', '联系方式', '所属地区']).then(() => {
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
          case '0':
            item.level_str = '白银会员'
            break
          case '1':
            item.level_str = '黄金会员'
            break
          case '2':
            item.level_str = '钻石会员'
            break
          case '3':
            item.level_str = '至尊会员'
            break
        }
        switch (item.type) {
          case '0':
            item.type_str = '个人'
            break
          case '1':
            item.type_str = '公司'
            break
          case '2':
            item.type_str = '政府'
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
