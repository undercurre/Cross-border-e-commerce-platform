import { ExportTPL, LoadData, LoadMainData } from '@/api/ImportExcel'
import d2HeaderFullscreen from '@/layout/header-aside/components/header-fullscreen'
import request from '@/plugin/axios'
import { throttle } from 'lodash'

const cssObject = {
  'scroll-content': {
    position: 'relative',
    overflow: 'hidden'
  },
  'header-container': {
    transition: 'transform 0.3s',
    whiteSpace: 'nowrap',
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  'is-scrollable': {
    position: 'relative',
    padding: '0 20px'
  },
  menu__prev: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    fontSize: '20px',
    width: '20px',
    cursor: 'pointer',
    color: '#ff929a',
    background: 'transparent'
  },
  menu__next: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    fontSize: '20px',
    width: '20px',
    cursor: 'pointer',
    color: '#ff929a',
    background: 'transparent'
  }
}
export default {
  name: 'custom-container-header',
  render (h) {
    return (<div style={this.isScroll ? cssObject['is-scrollable'] : {}}>
      <div style={cssObject['scroll-content']} ref="scrollContent">
        <div style={{
          transform: `translateX(${this.currentTranslateX}px)`,
          ...cssObject['header-container']
        }} ref="scrollHeader">
          <div style="display: flex;align-items: center;">
            {this.$slots.default}
            {/* 上传 */}
            {...this.isImport && this.$btnList.indexOf(this.importBtnName) !== -1 ? [h('el-upload', {
              props: {
                accept: '.xls,.xlsx',
                action: '#',
                'file-list': this.fileList,
                limit: 20,
                // 'on-success': (response, file, fileList) => this.handleUploadSuccess(response, file, fileList),
                'show-file-list': false,
                'http-request': (data) => this.handleRequest(data)
              },
              ref: 'customUpload',
              style: {
                margin: '0 10px'
              }
            }, [
              h('el-button', {
                props: {
                  icon: 'el-icon-cloudy',
                  size: 'small',
                  type: 'primary'
                }
              }, this.$t('publics.btn.click_Import'))
            ])] : []
            }
            {/* 导入 */}
            {this.isExport && this.$btnList.indexOf(this.exportBtnName) !== -1 ? <el-button icon="el-icon-s-order" size="small" type="info" onClick={() => this.handlerCallFunc()}>{this.$t('publics.btn.export_document')}</el-button> : ''}
            {/* 导出模板 */}
            {this.isExportTpl && this.$btnList.indexOf(this.exportTplName) !== -1 ? <el-button icon="el-icon-download" size="small" type="success" onClick={() => this.handleExportTpl()}>{this.$t('publics.btn.export_template')}</el-button> : ''}
            {/* 全屏 */}
            {this.isFull ? <d2-header-fullscreen style="padding-left: 15px;padding-right: 20px"></d2-header-fullscreen> : ''}
          </div>
        </div>
      </div>
      {this.isScroll ? <div><div style={cssObject.menu__prev} onClick={() => { this.scroll('left') }}>
        <div style="display: flex;width: 100%;height: 100%;align-items: center;"><i class="el-icon-arrow-left" /></div>
      </div><div style={cssObject.menu__next} onClick={() => this.scroll('right')}>
        <div style="display: flex;width: 100%;height: 100%;align-items: center;"><i class='el-icon-arrow-right' /></div>
      </div></div> : ''}
      {/* 进度条 */}
      {this.isProgress ? <transition name="el-fade-in-linear"><div class="el-dialog__wrapper" style="z-index: 999">
        <div style="display: flex;align-items: center;justify-content: center;height: 100%">
          <el-progress type="circle" percentage={this.progressPercent} status={this.uploadStatus}></el-progress>
        </div>
      </div></transition> : ''}
    </div>)
  },
  data () {
    return {
      isScroll: false,
      scrollWidth: 0,
      contentWidth: 0,
      currentTranslateX: 0,
      throttledCheckScroll: null,
      fileList: [],
      // uploadURl: process.env.VUE_APP_BASE_IMG + '/api/ImportExcel/ImportExcelFile',
      serviceUrl: process.env.VUE_APP_BASE_IMG,
      tableNameObj: {},
      progressPercent: 0,
      uploadStatus: 'warning',
      isProgress: false,
      timer: null
    }
  },
  components: {
    d2HeaderFullscreen
  },
  props: {
    importBtnName: {
      type: String,
      default: () => ''
    },
    exportBtnName: {
      type: String,
      default: () => ''
    },
    exportTplName: {
      type: String,
      default: () => ''
    },
    // 默认加载数据方法名称
    defaultLoadDataMethodsName: {
      type: String,
      default: () => 'getLoadData'
    },
    // 是否需要全屏
    isFull: {
      type: Boolean,
      default: false
    },
    // 是否需要导出模板
    isExportTpl: {
      type: Boolean,
      default: true
    },
    // 导出数据方法名称
    exportMehodsName: {
      type: String,
      default: 'getLoadData'
    },
    // 导入表名
    tableName: { // 废弃 采取接口形式
      type: String,
      default: ''
    },
    // 导出数据方法名称相关
    defaultTotalPage: {
      type: String,
      default: 'totalPage'
    },
    // 导出数据方法名称相关
    defaultMainTable: {
      type: String,
      default: 'mainTable'
    },
    // 导出数据方法名称相关
    defaultLoadingFlag: {
      type: String,
      default: 'loading'
    },
    // 导出数据方法名称相关
    defaultFormData: {
      type: String,
      default: 'formData'
    },
    // 是否显示导出按钮
    isExport: {
      type: Boolean,
      default: true
    },
    // 是否显示导入按钮
    isImport: {
      type: Boolean,
      default: true
    },
    // 默认导出table的ref
    defaultTableRefs: {
      type: String,
      default: 'xTable'
    },
    uploadURl: {
      type: String,
      default: () => process.env.VUE_APP_BASE_IMG + '/api/ImportExcel/ImportExcelFile'
    }
  },
  methods: {
    // getOtherParams () {
    //   const _parent = this.$parent.$parent.$parent
    //   // eslint-disable-next-line camelcase
    //   let table_name = ''
    //   if (this.tableName) {
    //     // eslint-disable-next-line camelcase
    //     table_name = this.tableName
    //   } else {
    //     let routeName = _parent.$route.name
    //     let tableName = ''
    //     if (/^\//.test(routeName)) {
    //       tableName = routeName.split('/')[1]
    //     } else {
    //       tableName = routeName.split('/')[0]
    //     }
    //     // 驼峰转换下划线
    //     // eslint-disable-next-line no-inner-declarations
    //     function toLine (name) {
    //       return name.replace(/([A-Z])/g, '_$1').toLowerCase()
    //     }
    //     tableName = toLine(tableName).toUpperCase().substr(1)
    //     // eslint-disable-next-line camelcase
    //     table_name = tableName
    //   }
    //   return {
    //     table_name
    //   }
    // },
    async getOtherParams () { // 获取tableName方法
      const _parent = this.$parent.$parent.$parent
      const routeName = _parent.$route.name
      let tableName = ''
      const arr = routeName.split('/')
      if (/^\//.test(routeName)) {
        tableName = `${arr[1]}/Index`
      } else {
        tableName = `${arr[0]}/Index`
      }
      const res = await LoadMainData({
        Page: 1,
        Limit: 15,
        TOTABLE_NAME: '',
        DESC_CN: '',
        DESC_EN: tableName,
        Key: ''
      })
      const obj = res.Result?.[0] || {}
      this.tableNameObj = {
        fileName: obj.DESC_CN,
        table_name: obj.TOTABLE_NAME
      }
    },
    async handleExportTpl () {
      const tableName = this.tableNameObj.table_name ? this.tableNameObj : this.getOtherParams()
      if (!tableName || !tableName.table_name) return false
      const res = await ExportTPL(tableName.table_name)
      if (res.Result) {
        window.open(this.serviceUrl + res.Result)
        this.$notify.success({
          title: this.$t('publics.tips.success'),
          message: this.$t('publics.tips.successExportTpl')
        })
      }
    },
    // 获取全局导出数据
    async handlerCallFunc () {
      const _parent = this.$parent.$parent.$parent
      const tmpTotalPage = _parent[this.defaultTotalPage]
      const tmpMainTable = _parent[this.defaultMainTable]
      const tmpFormData = _parent[this.defaultFormData]
      _parent[this.defaultFormData].Page = 1
      _parent[this.defaultFormData].Limit = tmpTotalPage
      const timeout = request.defaults.timeout // 修改 axios 实例的默认配置
      request.defaults.timeout = timeout * 1000
      await _parent[this.exportMehodsName]({
        table_name: this.tableName
      })
      const afterMainTable = _parent[this.defaultMainTable] // 导出的数据
      request.defaults.timeout = timeout
      _parent[this.defaultFormData] = tmpFormData
      _parent[this.defaultTotalPage] = tmpTotalPage
      _parent[this.defaultMainTable] = tmpMainTable
      // 导出excel
      const tableName = this.tableNameObj.table_name || this.getOtherParams().table_name
      const res = await LoadData(tableName)
      if (res.Result && res.Result.ImportDtlList && res.Result.ImportDtlList.length) {
        const T = res.Result.ImportDtlList
        const excel = await import('@/vender/Export2Excel')
        const tHeader = T.sort((currentItem, nextItem) => currentItem.EXCEL_ITEM > nextItem.EXCEL_ITEM ? 1 : -1).map(item => item.COLUMN_CAPTION)
        const fileList = T.map(item => item.COLUMN_NAME)
        const data = []
        afterMainTable.map(item => {
          const tmpArr = []
          fileList.map(_item => {
            tmpArr.push(item[_item])
          })
          data.push(tmpArr)
        })
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.tableNameObj.fileName || _parent.$route.meta.title,
          autoWidth: true,
          bookType: 'xlsx'
        })
      }
    },
    handleUploadSuccess (response, file, fileList) { // 上传成功回调 已废弃 =============
      if (response.ErrorInfo?.Status) {
        this.$message.error(response.ErrorInfo?.Message || this.$t('publics.tips.handleFail'))
        return false
      }
      if (response.Result) {
        this.$notify.success({
          title: this.$t('SmtPlacementHeader._103'),
          message: this.$t('SmtPlacementHeader._104')
        })
        const _parent = this.$parent.$parent.$parent
        _parent[this.defaultFormData].Page = 1
        _parent[this.defaultLoadDataMethodsName]()
      } else {
        this.$notify.error({
          title: this.$t('SmtPlacementHeader._105'),
          message: this.$t('SmtPlacementHeader._106')
        })
      }
    },
    // 自定义上传
    async handleRequest (data) {
      const formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('fileName', data.file.name)
      formdata.append('table_name', this.tableNameObj.table_name || this.getOtherParams().table_name)
      this.isProgress = true
      this.uploadStatus = 'warning'
      const res = await request.post(this.uploadURl, formdata, {
        onUploadProgress: progressEvent => {
          // progressEvent.loaded:已上传文件大小
          // progressEvent.total:被上传文件的总大小
          this.progressPercent = Number((progressEvent.loaded / progressEvent.total * 100).toFixed(2))
        }
      }).catch(_ => {
        this.timer = setTimeout(() => {
          this.isProgress = false
          clearTimeout(this.timer)
        }, 1000)
      })
      if (res.Result) {
        this.uploadStatus = 'success'
        this.$notify.success({
          title: this.$t('SmtPlacementHeader._103'),
          message: this.$t('SmtPlacementHeader._104')
        })
        const _parent = this.$parent.$parent.$parent
        _parent[this.defaultFormData].Page = 1
        _parent[this.defaultLoadDataMethodsName]()
      } else {
        this.uploadStatus = 'exception'
        this.$notify.error({
          title: this.$t('SmtPlacementHeader._105'),
          message: this.$t('SmtPlacementHeader._106')
        })
      }
      this.timer = setTimeout(() => {
        this.isProgress = false
        clearTimeout(this.timer)
      }, 1000)
    },
    checkScroll () {
      let contentWidth = this.$refs.scrollContent.clientWidth
      let scrollWidth = this.$refs.scrollHeader.clientWidth
      if (this.isScroll) {
        // 页面依旧允许滚动的情况，需要更新width
        if (this.contentWidth - this.scrollWidth === this.currentTranslateX) {
          // currentTranslateX 也需要相应变化【在右端到头的情况时】
          this.currentTranslateX = contentWidth - scrollWidth
          // 快速的滑动依旧存在判断和计算时对应的contentWidth变成正数，所以需要限制一下
          if (this.currentTranslateX > 0) {
            this.currentTranslateX = 0
          }
        }
        // 更新元素数据
        this.contentWidth = contentWidth
        this.scrollWidth = scrollWidth
        // 判断何时滚动消失: 当scroll > content
        if (contentWidth > scrollWidth) {
          this.isScroll = false
        }
      }
      // 判断何时滚动出现: 当scroll < content
      if (!this.isScroll && contentWidth < scrollWidth) {
        this.isScroll = true
        // 注意，当isScroll变为true，对应的元素盒子大小会发生变化
        this.$nextTick(() => {
          contentWidth = this.$refs.scrollContent.clientWidth
          scrollWidth = this.$refs.scrollHeader.clientWidth
          this.contentWidth = contentWidth
          this.scrollWidth = scrollWidth
          this.currentTranslateX = 0
        })
      }
    },
    scroll (direction) {
      if (direction === 'left') {
        // 向右滚动
        this.currentTranslateX = 0
      } else {
        // 向左滚动
        if (
          this.contentWidth * 2 - this.currentTranslateX <=
          this.scrollWidth
        ) {
          this.currentTranslateX -= this.contentWidth
        } else {
          this.currentTranslateX = this.contentWidth - this.scrollWidth
        }
      }
    }
  },
  created () {
    // this.getOtherParams()
    this.$parent.$parent.$nextTick(() => {
      this.checkScroll()
    })
    // 默认判断父元素和子元素的大小，以确定初始情况是否显示滚动
    window.addEventListener('load', this.checkScroll)
    // 全局窗口变化监听，判断父元素和子元素的大小，从而控制isScroll的开关
    this.throttledCheckScroll = throttle(this.checkScroll, 300)
    window.addEventListener('resize', this.throttledCheckScroll)
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    // 取消监听
    window.removeEventListener('resize', this.throttledCheckScroll)
    window.removeEventListener('load', this.checkScroll)
  }
}
