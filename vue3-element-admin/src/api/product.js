import request from '@/utils/request'

// 获取菜单
export const GetProduct = params => {
  return request({
    url: '/api/product',
    method: 'get',
    params,
  })
}
export const GetProductList = params => {
  return request({
    url: '/napi/product/list',
    method: 'get',
    params,
  })
}
export const searchDetail = id => {
  return request({
    url: `/napi/product/detail?id=${id}`,
    method: 'get',
  })
}
export const addProduct = data => {
  return request({
    url: '/napi/product/add',
    method: 'post',
    data,
  })
}
export const changeProduct = data => {
  return request({
    url: '/napi/product/change',
    method: 'post',
    data,
  })
}
export const deleteProduct = data => {
  return request({
    url: '/napi/product/delete',
    method: 'post',
    data,
  })
}
