import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

type LoginData = {
  username: string;
  password: string;
};

const postUserData = async (data: LoginData) => {
  const res = await axios
    .post(`http://127.0.0.1:5000/api/users/login`, data)
    .then((response) => {
      console.log(response);
      data = response.data;
      return data;
    })
    .catch((error: AxiosError) => {
      if (error.response) {
        return Promise.reject(error.response);
      } else if (error.request) {
        return Promise.reject(error.message);
      } else {
        console.log(error.message);
      }
      return Promise.reject("Server error");
    });

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginData) => postUserData(data), {});
};
