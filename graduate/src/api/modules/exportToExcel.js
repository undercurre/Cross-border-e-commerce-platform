export async function printToExcel (multiHeader, dataList, fileList, fileName, merges, tHeader) {
  const excel = await import('@/vender/Export2Excel')
  const data = []
  dataList.map(item => {
    const tmpArr = []
    fileList.map(_item => {
      tmpArr.push(item[_item])
    })
    data.push(tmpArr)
  })
  excel.export_json_to_excel({
    multiHeader: multiHeader,
    header: tHeader,
    data,
    merges,
    filename: fileName,
    autoWidth: true,
    bookType: 'xlsx'
  })
}
