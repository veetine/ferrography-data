import request from '@/utils/request'
import qs from 'qs'

export function delImages(params) {
  return request({
    url: '/images/del',
    method: 'get',
    params
  })
}
