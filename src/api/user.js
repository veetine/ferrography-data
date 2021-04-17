import request from '@/utils/request'
import qs from 'qs'


export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'get',
    params
  })
}

export function getUser() {
  return request({
    url: 'user',
    method: 'get',
  })
}

export function delUser(params) {
  return request({
    url: '/user/del',
    method: 'get',
    params
  })
}

export function updUser(params) {
  return request({
    url: '/user/upd',
    method: 'get',
    params
  })
}

export function dump(params) {
  return request({
    url: '/dump',
    method: 'get',
    params
  })
}

export function login(data) {
  return request({
    url: 'login/admin',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: 'user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}

export function userPwd(data) {
  return request({
    url: 'user/pwd',
    method: 'post',
    data: qs.stringify(data)
  })
}
