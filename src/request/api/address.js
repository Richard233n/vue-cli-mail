import service from "..";

// .get('/api/v1/address/'+userinfo.id)
export function getAddress(data) {
  return service({
    method: "get",
    url: `/api/v1/address/${data}`,
  });
}
// request.post('/api/v1/addAddress/'+ userinfo.id,
export function saveAddress(id, data) {
  return service({
    method: "post",
    url: `/api/v1/addAddress/${id}`,
    data: data,
  });
}

export function updateAddress(id, data) {
  return service({
    method: "post",
    url: `/api/v1/updateAddress/${id}`,
    data: data,
  });
}

export function beDefault(id, data) {
  return service({
    method: "post",
    url: `/api/v1/updateAddress/${id}`,
    data: data,
  });
}
export function deleteAddress(id, data) {
  return service({
    method: "post",
    url: `/api/v1/delAddress/${id}`,
    data: data,
  });
}
