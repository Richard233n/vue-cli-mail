import service from '..'
// 登录
export function getShopList () {
  return service({
    method: 'GET',
    url: '/api/v1/hotShops',
    params: { state: 1 }
  })
}

export function getShopInfo (data) {
  return service({
    method: 'GET',
    url: `/api/v1/shop/${data}`
  })
}

export function getProductList (data) {
  return service({
    method: 'GET',
    url: `/api/v1/product/${data.id}`,
    params: {
      tab: data.tab
    }
  })
}
