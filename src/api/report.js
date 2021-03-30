import request from '@/utils/request'

export function getReport(params) {
  return request({
    url: 'report',
    method: 'get',
    params
  })
}

export function getReportImages(params) {
  return request({
    url: 'report/images',
    method: 'get',
    params
  })
}


export function addReport(params) {
  return request({
    url: '/report/add',
    method: 'get',
    params
  })
}

export function delReport(params) {
  return request({
    url: '/report/del',
    method: 'get',
    params
  })
}

export function updReport(params) {
  return request({
    url: '/report/upd',
    method: 'get',
    params
  })
}
