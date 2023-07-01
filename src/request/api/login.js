import service from "..";
//登录
export function getLogin(data) {
  return service({
    method: "POST",
    url: "/api/v1/login",
    data: data,
  });
}
