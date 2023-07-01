import service from "..";

export function getCreateOrder(data) {
  return service({
    method: "POST",
    url: "/api/v1/create",
    data: data,
  });
}
// const result=await request.get('/api/v1/defaultAddress/'+userinfo.id)
export function getDefaultAddress(data) {
  return service({
    method: "GET",
    url: `/api/v1/defaultAddress/${data}`,
  });
}
