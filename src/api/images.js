import request from '@/utils/request'
import qs from 'qs'

export function delImages(params) {
  return request({
    url: '/images/del',
    method: 'get',
    params
  })
}


export function addImages(data) {
  return request({
    url: '/images/upload',
    method: 'post',
    headers: { "content-Type": "multipart/form-data" },
    data: data
  })
}

export function getImageDetail(params) {
  return request({
    url: '/images/detail',
    method: 'get',
    params
  })
}


export function updImages(params) {
  return request({
    url: '/images/upd',
    method: 'get',
    params
  })
}