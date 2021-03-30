import request from '@/utils/request'

export function addGrease(params) {
  return request({
    url: '/grease/add',
    method: 'get',
    params
  })
}

export function getGrease() {
  return request({
    url: 'grease',
    method: 'get',
  })
}

export function delGrease(params) {
  return request({
    url: '/grease/del',
    method: 'get',
    params
  })
}

export function updGrease(params) {
  return request({
    url: '/grease/upd',
    method: 'get',
    params
  })
}
