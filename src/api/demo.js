// 接口测试 DEMO

import request from "@/utils/http/request.js"

//  测试 GET
export const getDemo = (params) => {
  let url = 'http://jsonplaceholder.typicode.com/comments'
  return request.get(url, params)
}

// 获取用户资料
export const getUser = (params) => {
  let url = 'https://jsonplaceholder.typicode.com/users/1'
  return request.get(url, params)
}
