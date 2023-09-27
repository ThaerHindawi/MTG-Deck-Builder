import axios, { AxiosError } from "axios";
import { json, useNavigate } from "react-router-dom";
import API_LOCAL_URL from "../Utils/API_URL";

async function PrivateFetch(method: string, path: string, body: any) {
try {
  const res = await axios({
    method: method,
    url: API_LOCAL_URL(path),
    data: JSON.stringify(body),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  const data = res.data;
  console.log("res.data axios: " + res.data)
  return data;
} catch(error: any) {
  console.log(error.response?.data)
  return error.response?.data
}

}


export default PrivateFetch;