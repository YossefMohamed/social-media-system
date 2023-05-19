import axios from "axios";
import { useMutation } from "react-query";

type RegisterData = {
  username: string;
  password: string;
};
const postUserData = async (data: RegisterData) => {
  const res = await axios
    .post(`http://127.0.0.1:5000/api/users/register`, data)
    .then((res) => {
      return res.data.user;
    })
    .catch((e) => e.response.data);

  return res;
};

export const useUserRegister = () => {
  return useMutation((data: RegisterData) => postUserData(data), {});
};
