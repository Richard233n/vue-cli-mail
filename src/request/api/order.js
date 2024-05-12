import service from '..'
// 登录
export function getOrderList (data) {
  return service({
    method: 'GET',
    url: `/api/v1/orders/${data}`
  })
}
