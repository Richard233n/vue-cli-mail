import service from "..";
//登录
export function getRegister(data) {
  return service({
    method: "POST",
    url: "/api/v1/register",
    data: data,
  });
}
