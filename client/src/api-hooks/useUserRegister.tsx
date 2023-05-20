import axios, { AxiosError } from "axios";

import { useMutation } from "react-query";

type RegisterData = {
  username: string;
  password: string;
};
const postUserData = async (data: RegisterData) => {
  const res = await axios
    .post(`http://127.0.0.1:5000/api/users/register`, data)
    .then((response) => {
      data = response.data;
      return data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return Promise.reject(error.response.data);
      } else if (error.request) {
        return Promise.reject(error.message);
      } else {
        console.log(error.message);
      }
      return Promise.reject("Server error");
    });

  return res;
};
export const useUserRegister: any = () => {
  return useMutation((data: RegisterData) => postUserData(data), {});
};
