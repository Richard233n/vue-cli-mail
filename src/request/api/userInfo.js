import service from '..'

export function saveUser (id, data) {
  return service({
    method: 'POST',
    url: `/api/v1/saveUser/${id}`,
    data: data
  })
}
