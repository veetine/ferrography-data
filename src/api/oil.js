import request from '@/utils/request'

export function addOil(params) {
  return request({
    url: '/oil/add',
    method: 'get',
    params
  })
}

export function getOil() {
  return request({
    url: 'oil',
    method: 'get',
  })
}

export function delOil(params) {
  return request({
    url: '/oil/del',
    method: 'get',
    params
  })
}

export function updOil(params) {
  return request({
    url: '/oil/upd',
    method: 'get',
    params
  })
}
