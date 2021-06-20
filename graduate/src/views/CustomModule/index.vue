<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :importBtnName = "modulesName + 'Import'"
                               :exportBtnName = "modulesName + 'Export'"
                               :exportTplName = "modulesName + 'ExportTPL'"
                               export-mehods-name="exportData"
      >
        <el-dropdown>
          <el-button type="primary" size="small" style="margin-right: 10px">
            报表选择<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item in modulesList" :key="item.id">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input v-for="item in inputList" :key="item.MST_ID" :placeholder="'请输入'+item.TITLE" v-model="form[item.PARAM_NAME]" style="width: 150px; margin-right: 10px" size="small"></el-input>
        <el-select v-for="item in selectList" :key="item.MST_ID" :placeholder="'请选择'+item.TITLE" v-model="form[item.PARAM_NAME]" style="width: 150px; margin-right: 10px" size="small">
          <el-option v-for="option in item.REFERENCE_List"
                     :key="option.CODE"
                     :label="option.NAME"
                     :value="option.CODE">
          </el-option>
        </el-select>
        <PSelect v-for="item in PselectList"
                 :key="item.MST_ID"
                 :bind-data="form[item.PARAM_NAME]"
                 :placeholder-str="item.TITLE"
                 :p-a-r-a-m_-n-a-m-e="item.PARAM_NAME"
                 @getData="setPSelectData"
                 style="width: 150px; margin-right: 10px"
        ></PSelect>
        <el-button @click="sort_drawer = true" size="small">高级筛选</el-button>
      </custom-container-header>
    </template>
    <div class="table">
      <vxe-table
        border
        resizable
        show-overflow
        height="100%"
        :data="tableData"
        :edit-config="{trigger: 'dblclick', mode: 'cell'}">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
        <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', attrs: {type: 'text', placeholder: '请输入昵称'}}"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" :edit-render="{name: '$select', options: sexList, optionProps: {value: 'value', label: 'label'}}"></vxe-table-column>
        <vxe-table-column field="sex2" title="多选下拉" :edit-render="{name: '$select', options: sexList, props: {multiple: true}}"></vxe-table-column>
        <vxe-table-column field="num1" title="Amount" :edit-render="{name: '$input', props: {type: 'float', digits: 2}}"></vxe-table-column>
        <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date', placeholder: '请选择日期'}}"></vxe-table-column>
        <vxe-table-column field="date13" title="Week" :edit-render="{name: '$input', props: {type: 'week', placeholder: '请选择日期'}}"></vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.currentPage"
      :page-sizes="[15, 20, 30, 40]"
      :page-size="listQuery.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-drawer title="高级筛选"
               :visible.sync="sort_drawer"
               direction="rtl"
               :before-close="sort_handleClose"
               size="60%">
      <el-card class="box-card"
               style="margin: 0 10px">
        <div slot="header"
             class="clearfix">
          <span>范围筛选</span>
          <el-button style="float: right; padding: 3px 0"
                     type="text">
          重置</el-button>
          <el-button style="float: right; padding: 3px 0; margin-right: 20px"
                     type="text"
                     @click="searchClick">确认</el-button>
        </div>
        <div>
          <el-form :model="form" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-col :span="12" :key="item.MST_ID" v-for="item in sortList">
              <el-form-item :label="item.TITLE">
                <el-input v-if="item.DATA_TYPE === 1" :placeholder="'请输入'+item.TITLE" v-model="form[item.PARAM_NAME]" size="small"></el-input>
                <el-select v-if="item.DATA_TYPE === 2" :placeholder="'请选择'+item.TITLE" v-model="form[item.PARAM_NAME]" size="small">
                  <el-option v-for="option in item.REFERENCE_List"
                             :key="option.CODE"
                             :label="option.NAME"
                             :value="option.CODE">
                  </el-option>
                </el-select>
                <PSelect v-if="item.DATA_TYPE === 4"
                         :bind-data="form[item.PARAM_NAME]"
                         :placeholder-str="item.TITLE"
                         :p-a-r-a-m_-n-a-m-e="item.PARAM_NAME"
                         @getData="setPSelectData"
                ></PSelect>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </d2-container>
</template>

<script>
import PSelect from '@/components/PSelect'
import CustomContainerHeader from '@/components/custom-container-header'
// import { GetParamsForQuery } from '@/api/modules/customModule'

export default {
  name: 'CustomModule',
  data () {
    return {
      modulesName: '',
      form: {},
      data: [],
      inputList: [],
      dateList: [],
      selectList: [],
      PselectList: [],
      sortList: [],
      modulesList: [{
        id: 1,
        name: '测试1'
      }],
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 44, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10009, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10010, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex2: ['1', '0'], num1: 20, age: 30, address: 'Shanghai', date12: '2020-09-20', date13: '' },
        { id: 10011, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['0'], num1: 10, age: 21, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10012, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '0', sex2: ['0'], num1: 5, age: 29, address: 'Shenzhen', date12: '2020-01-02', date13: '2020-09-20' },
        { id: 10013, name: 'Test8', nickname: 'T8', role: 'PM', sex: '1', sex2: ['0'], num1: 2, age: 35, address: 'Shenzhen', date12: '', date13: '' }
      ],
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      total: 400,
      listQuery: {
        currentPage: 1,
        limit: 15
      },
      sort_drawer: false
    }
  },
  methods: {
    searchClick () {
      console.log(1)
    },
    sort_handleClose () {
      this.sort_drawer = false
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    updateView () {
      this.$forceUpdate()
    },
    setPSelectData (val) {
      this.form[val.name] = val.val
    },
    async getParamsForQuery () {
      // const res = await GetParamsForQuery()
      // this.data = res.Result.map(item => {
      //   return item
      // })
      this.data = [
        {
          PARAM_NAME: 'OPERATION_NAME',
          DATA_TYPE: 2,
          TITLE: '维修类型',
          REFERENCE_List: [{
            CODE: 4,
            NAME: '测试'
          }, {
            CODE: 19,
            NAME: 'BFT维修'
          }, {
            CODE: 20,
            NAME: 'RMA维修'
          }],
          MST_ID: 1
        }, {
          PARAM_NAME: 'OPERATION_NAME1',
          DATA_TYPE: 2,
          TITLE: '维修类型',
          REFERENCE_List: [{
            CODE: 4,
            NAME: '测试'
          }, {
            CODE: 19,
            NAME: 'BFT维修'
          }, {
            CODE: 20,
            NAME: 'RMA维修'
          }],
          MST_ID: 2
        }, {
          PARAM_NAME: 'OPERATION_NAME2',
          DATA_TYPE: 1,
          TITLE: '料号',
          MST_ID: 3
        }, {
          PARAM_NAME: 'OPERATION_NAME3',
          DATA_TYPE: 1,
          TITLE: '工单号',
          MST_ID: 4
        }, {
          DATA_TYPE: 3,
          TITLE: '导出',
          MST_ID: 5
        }, {
          DATA_TYPE: 3,
          TITLE: '打印',
          MST_ID: 6
        }, {
          DATA_TYPE: 3,
          TITLE: '搜索',
          MST_ID: 7
        }, {
          PARAM_NAME: 'OPERATION_NAME4',
          DATA_TYPE: 4,
          TITLE: '项目号',
          MST_ID: 8
        }, {
          PARAM_NAME: 'mytest',
          DATA_TYPE: 4,
          TITLE: '料号号',
          MST_ID: 9
        }]
      this.data.forEach(item => {
        if (item.PARAM_NAME) {
          this.$set(this.form, item.PARAM_NAME.toString(), '')
        }
      })
      this.$forceUpdate()
      this.selectList = this.data.filter(item => item.DATA_TYPE === 2)
      this.inputList = this.data.filter(item => item.DATA_TYPE === 1)
      this.PselectList = this.data.filter(item => item.DATA_TYPE === 4)
      this.sortList = this.data.filter(item => item.DATA_TYPE !== 3)
    }
  },
  created () {
    this.getParamsForQuery()
  },
  components: {
    CustomContainerHeader,
    PSelect
  }
}
</script>

<style scoped lang="scss">
  .d2-container-full__header {
    padding: 10px 20px;
  }
  .table{
    height: calc(100vh - 250px);
  }
 ::v-deep .el-drawer__body{
   padding: 20px;
   display: flex;
   justify-content: space-between;
   flex-direction: column;
 }
</style>
