import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  return request({
    url: 'login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: 'profile',
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


export function userPwd(params) {
  return request({
    url: '/user/pwd',
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
