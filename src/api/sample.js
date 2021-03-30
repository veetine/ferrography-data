import request from '@/utils/request'

export function addSample(params) {
  return request({
    url: '/sample/add',
    method: 'get',
    params
  })
}

export function getSample() {
  return request({
    url: 'sample',
    method: 'get',
  })
}

export function delSample(params) {
  return request({
    url: '/sample/del',
    method: 'get',
    params
  })
}

export function updSample(params) {
  return request({
    url: '/sample/upd',
    method: 'get',
    params
  })
}
