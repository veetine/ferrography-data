import request from '@/utils/request'
import qs from 'qs'


export function addStatement(params) {
  return request({
    url: '/statement/add',
    method: 'get',
    params
  })
}


export function findStatements(params) {
  return request({
    url: 'statement',
    method: 'get',
    params
  })
}
