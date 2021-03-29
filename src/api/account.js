import request from '@/utils/request'
import qs from 'qs'
export function getAccountList() {
  return request({
    url: '/account-ad',
    method: 'get'
  })
}

export function getJuliangList() {
  return request({
    url: '/account-dd',
    method: 'get'
  })
}

export function getDouYinList(params) {
  return request({
    url: `douyin_contents`,
    method: 'get',
    params
  })
}
export function getfeedDouYinList(params) {
  console.log(params)
  return request({
    url: `feed_douyins`,
    method: 'get',
    params
  })
}

export function updateDoudianCookie(id, params) {
  return request({
    url: `/account-dd/${id}`,
    method: 'put',
    data: params
  })
}

export function updateDouYinBuyingCookie(params) {
  return request({
    url: `/account-dy/cookie/buying`,
    method: 'patch',
    data: params
  })
}

export function updateDouYinAwemeCookie(data) {
  return request({
    url: `/douyin/update`,
    method: 'put',
    data: qs.stringify(data)
  })
}
// 客服列表

export function getkefus() {
  return request({
    url: `dd_kefu/list_by_tag`,
    method: 'get'

  })
}
// 抖音号列表

export function getdouyinaccounts() {
  return request({
    url: `douyin_contents`,
    method: 'get'

  })
}
// 运营列表
export function getyunyings() {
  return request({
    url: `doudians/list_by_tag`,
    method: 'get'

  })
}
// 修改客服

export function setkefus(id, data) {
  return request({
    url: `dd_kefu/` + id,
    method: 'put',
    data: qs.stringify(data)
  })
}
// 修改抖店
export function setdoudians(id, data) {
  return request({
    url: `doudians/` + id,
    method: 'put',
    data: qs.stringify(data)
  })
}

// 存储密码
export function storepassword(id, data) {
  return request({
    url: `doudians/` + id + '/account_store',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 得到密码

export function getpassword(id) {
  return request({
    url: `doudians/` + id + '/get_account',
    method: 'get'

  })
}
