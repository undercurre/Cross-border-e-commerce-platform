<template>
 <d2-container>
   <manager-tab>
     <template slot="content">
       <el-input v-model="key" placeholder="请输入相关货物关键字" size="small"></el-input>
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
           <vxe-table-column type="expand" width="80" title="库存情况">
             <template #content="{ row }">
               <vxe-table
                 border
                 :data="row.store"
               >
                 <vxe-table-column field="name" title="名称"></vxe-table-column>
                 <vxe-table-column field="count" title="数量"></vxe-table-column>
               </vxe-table>
               <div style="display: flex; margin-top: 20px">
                 <label>图片：</label>
                 <img :src="'http://81.71.85.68:3036/static' + img" v-for="img in row.images" :key="img" style="width: 200px;">
               </div>
             </template>
           </vxe-table-column>
           <vxe-table-column field="name" title="名称" min-width="200"></vxe-table-column>
           <vxe-table-column field="priceC" title="单价" min-width="200"></vxe-table-column>
           <vxe-table-column field="origin_type_str" title="来源类型" min-width="200"></vxe-table-column>
           <vxe-table-column field="origin_name" title="来源" min-width="200"></vxe-table-column>
         </template>
         <template slot="form">
           <el-form :model="formData" label-width="80px">
             <el-row>
               <el-col :span="12">
                 <el-form-item label="名称">
                   <el-input v-model="formData.name" placeholder="请输入名称"></el-input>
                 </el-form-item>
               </el-col>
               <el-col :span="6">
                 <el-form-item label="单价">
                   <el-select v-model="formData.CCY" placeholder="货币类型" @change="this.$forceUpdate">
                     <el-option :label="item.label" :value="item.value" v-for="item in CCYOptions"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
               <el-col :span="6">
                   <el-input v-model="formData.price" placeholder="请输入单价数额"></el-input>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="6">
                 <el-form-item label="来源">
                   <el-select v-model="formData.origin_type" placeholder="来源类型" @change="getOriginOptions">
                     <el-option :label="item.label" :value="item.value" v-for="item in originTypeOptions"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
               <el-col :span="6">
                 <el-select v-model="formData.origin_id" placeholder="请选择来源">
                   <el-option :label="item.label" :value="item.value" v-for="item in originOptions"></el-option>
                 </el-select>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <el-form-item label="商品类型">
                   <el-select v-model="formData.type" placeholder="请选择商品类型">
                     <el-option :label="item.label" :value="item.value" v-for="item in typeOptions"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row v-for="item in formData.store">
               <el-col :span="12">
                 <el-form-item label="入库数量">
                   <el-input v-model="item.count" placeholder="请输入入库数量"></el-input>
                 </el-form-item>
               </el-col>
               <el-col :span="12">
                 <el-form-item label="仓库">
                   <el-select v-model="item.id" placeholder="请选择仓库" style="width: 100%">
                     <el-option :label="store.label" :value="store.value" v-for="store in storeOptions"></el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="24">
                 <el-form-item label="已上传">
                   <div style="display: flex;">
                     <img :src="img" v-for="img in this.formData.images.map(item => 'http://81.71.85.68:3036/static'+item)" style="width: 20%">
                   </div>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="24">
                 <el-form-item label="图片">
                   <el-upload
                     ref="upload"
                     :on-change="handleChange"
                     action="#"
                     :file-list="imgs"
                     list-type="picture-card"
                     :auto-upload="false">
                     <i slot="default" class="el-icon-plus"></i>
                     <div slot="file" slot-scope="{file}">
                       <img
                         class="el-upload-list__item-thumbnail"
                         :src="file.url" alt=""
                         style="width: 100%;"
                       >
                       <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                     </div>
                   </el-upload>
                   <el-dialog :visible.sync="dialogImgVisible" append-to-body>
                     <img width="100%" :src="dialogImageUrl" alt="">
                   </el-dialog>
                 </el-form-item>
               </el-col>
             </el-row>
             <el-row style="display: flex;justify-content: center">
               <el-button type="text" @click="pushStore"><i class="el-icon-circle-plus"></i></el-button>
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
import { GetTableData, SaveCustomer, UpdateCustomer, DeleteCustomer } from '@/api/modules/goodManager'
import { GetTableData as GetFactory } from '@/api/modules/factoryManager'
import { GetTableData as GetSupport } from '@/api/modules/supportManager'
import { GetTableData as GetStore } from '@/api/modules/storeManager'
import { printToExcel } from '@/api/modules/exportToExcel'
import CCYOptions from '@/libs/CCYOptions'
import { upload } from '@/api/modules/upload'

export default {
  name: 'goodMain',
  components: { ManagerTable, ManagerTab },
  data () {
    return {
      imgs: [],
      dialogImageUrl: '',
      dialogImgVisible: false,
      CCYOptions,
      originTypeOptions: [
        { label: '工厂', value: 0 },
        { label: '供应商', value: 1 }
      ],
      typeOptions: [
        { label: '单品', value: 0 },
        { label: '系列', value: 1 },
        { label: '场景', value: 2 },
        { label: '设计', value: 3 }
      ],
      originOptions: [],
      storeOptions: [],
      key: '',
      formData: {
        id: '',
        name: '',
        price: '',
        CCY: '',
        origin_id: '',
        type: '',
        store: [{
          id: '',
          count: ''
        }],
        images: [],
        origin_type: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入名称' }
        ]
      },
      showEdit: false
    }
  },
  created () {
    this.getStoreOptions()
  },
  methods: {
    handleChange (file, fileList) {
      this.imgs = fileList
    },
    handleDownload (file) {
      console.log(file)
    },
    handleRemove (file) {
      console.log(file)
      this.imgs = this.imgs.filter(item => item.uid !== file.uid)
      console.log(this.imgs)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },
    initEditFaker () {
      this.getOriginOptions(this.formData.origin_type)
    },
    async submit () {
      await this.uploaderSubmit()
      this.$refs.ctable.submitEvent()
    },
    async uploaderSubmit () {
      if (this.imgs.length) {
        let formData = new FormData()
        this.imgs.forEach(item => {
          formData.append('test', item.raw)
        })
        const res = await upload(formData)
        this.formData.images = res.data
        this.imgs = []
      }
    },
    pushStore () {
      this.formData.store.push({
        id: '',
        count: ''
      })
    },
    changeUpdate (val) {
      this.$forceUpdate()
    },
    async getStoreOptions () {
      const res = await GetStore({ currentPage: 1, size: 10, key: '' })
      this.storeOptions = res.data.data.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    async getOriginOptions (e) {
      let res
      if (e === 1) {
        res = await GetSupport({ currentPage: 1, size: 10, key: '' })
      } else {
        res = await GetFactory({ currentPage: 1, size: 10, key: '' })
      }
      this.originOptions = res.data.data.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    },
    setShowEdit (val) {
      this.showEdit = val
    },
    setFormData (val) {
      this.formData = JSON.parse(JSON.stringify(val))
      this.initEditFaker()
    },
    insertEvent () {
      this.showEdit = true
      this.formData = {
        id: '',
        name: '',
        price: '',
        CCY: '',
        images: [],
        origin_id: '',
        type: '',
        store: [{
          id: '',
          count: ''
        }],
        origin_type: ''
      }
    },
    exportToExcel () {
      printToExcel(
        [['货物清单', '', '', '', '']],
        this.$refs.ctable.tableData.map((item, index) => {
          return {
            index: index + 1,
            name: item.name,
            priceC: item.priceC,
            origin_type_str: item.origin_type_str,
            origin_name: item.origin_name
          }
        }),
        ['index', 'name', 'priceC', 'origin_type_str', 'origin_name'],
        '货物清单',
        ['A1:E1'],
        ['序号', '货物名称', '价格', '来源类型', '来源']).then(() => {
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
        switch (item.CCY) {
          case 'CNY':
            item.priceC = '¥' + item.price
            break
          case 'RUB':
            item.priceC = '₽' + item.price
            break
          case 'USD':
            item.priceC = '$' + item.price
            break
          case 'GBP':
            item.priceC = '￡' + item.price
            break
          case 'JPY':
            item.priceC = '￥' + item.price
            break
        }
        switch (item.origin_type) {
          case 0:
            item.origin_type_str = '工厂'
            break
          case 1:
            item.origin_type_str = '供应商'
            break
        }
        item.store = JSON.parse(item.store)
        item.images = JSON.parse(item.images)
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
