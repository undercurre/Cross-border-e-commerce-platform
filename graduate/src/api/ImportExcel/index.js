import request from '@/plugin/axios'

// 首页视图
export function Index () {
  return request.get('ImportExcel/Index')
}

// 查询当前表对应的导入模板数据
// eslint-disable-next-line camelcase
export function LoadData (table_name) {
  return request.get('ImportExcel/LoadData', {
    params: {
      table_name
    }
  })
}

// 获取导入表信息集
export function GetMstTableList () {
  return request.get('ImportExcel/GetMstTableList')
}

// 获取原始表对应的字段信息集
// eslint-disable-next-line camelcase
export function GetIntiTableColumnList (table_name) {
  return request.get('ImportExcel/GetIntiTableColumnList', {
    params: {
      table_name
    }
  })
}

// 保存模板数据
export function SaveData (data) {
  return request.post('ImportExcel/SaveData', data)
}

// 导出Excel模板
// eslint-disable-next-line camelcase
export function ExportTPL (table_name) {
  return request.get('ImportExcel/ExportTPL', {
    params: {
      table_name
    }
  })
}

// 导入Excel文件数据到指定表
export function ImportExcelFile (formData) {
  return request.post('ImportExcel/ImportExcelFile', formData)
}

export function LoadMainData (query) {
  return request.get('ImportExcel/LoadMainData', {
    params: query
  })
}

// 导入Excel模板
export function ImportExcelDemoFile (formData) {
  return request.post('ImportExcel/ImportExcelDemoFile', formData)
}
// 删除Excel模板
export function DelExcel (formData) {
  return request.post('ImportExcel/DelExcel', formData)
}
