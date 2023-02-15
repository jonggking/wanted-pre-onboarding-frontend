import axios, { AxiosError } from "axios";

const serverUrl = "https://pre-onboarding-selection-task.shop/";

async function get(endpoint: string, params?: string) {
  console.log(`GET 요청 ${serverUrl + endpoint}`);
  return axios.get(
    params ? serverUrl + endpoint + "/" + params : serverUrl + endpoint,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
}

async function post(endpoint: string, data: any, isFile?: boolean) {
  const bodyData = !isFile ? JSON.stringify(data) : data;
  console.log("bodyData: ", bodyData);
  console.log(`%cPOST 요청: ${serverUrl + endpoint}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": !isFile ? "application/json" : "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

async function put(endpoint: string, data: any, isFile?: boolean) {
  const bodyData = !isFile ? JSON.stringify(data) : data;
  console.log(`%cPUT 요청: ${serverUrl + endpoint}`, "color: #059c4b;");
  console.log(`%cPUT 요청 데이터: ${bodyData}`, "color: #059c4b;");

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": !isFile ? "application/json" : "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint: string, params?: string) {
  console.log(`DELETE 요청 ${serverUrl + endpoint + "/" + params}`);
  return axios.delete(
    params ? serverUrl + endpoint + "/" + params : serverUrl + endpoint,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );
}

export { get, post, put, del as delete };
