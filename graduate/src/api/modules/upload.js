import request from '@/plugin/axios'

export function upload (data) {
  return request.post('/upload/img', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
