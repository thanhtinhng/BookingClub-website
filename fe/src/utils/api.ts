import axios from "./axios.customize";

interface CreateUserPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const createUserApi = (data: CreateUserPayload) => {
  const URL_API = "/api/register";
  return axios.post(URL_API, data);
};

export {
  createUserApi
}
