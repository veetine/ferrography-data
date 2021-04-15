import request from '@/utils/request'

export function addMotor(params) {
  return request({
    url: '/motor/add',
    method: 'get',
    params
  })
}

export function getMotor() {
  return request({
    url: 'motor',
    method: 'get',
  })
}

export function delMotor(params) {
  return request({
    url: '/motor/del',
    method: 'get',
    params
  })
}

export function updMotor(params) {
  return request({
    url: '/motor/upd',
    method: 'get',
    params
  })
}


export function getFormData() {
  return request({
    url: '/form/data',
    method: 'get',
  })
}
