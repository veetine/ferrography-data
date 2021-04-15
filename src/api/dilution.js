import request from '@/utils/request'

export function addDilution(params) {
  return request({
    url: '/dilution/add',
    method: 'get',
    params
  })
}

export function getDilution() {
  return request({
    url: 'dilution',
    method: 'get',
  })
}

export function delDilution(params) {
  return request({
    url: '/dilution/del',
    method: 'get',
    params
  })
}

export function updDilution(params) {
  return request({
    url: '/dilution/upd',
    method: 'get',
    params
  })
}
