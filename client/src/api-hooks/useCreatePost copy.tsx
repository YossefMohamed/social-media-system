import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Rootstate } from "../redux/store";

type PostData = {
  content: string;
};

const createNewPost = async (data: PostData, token: string) => {
  const res = await axios
    .post(`http://localhost:5001/api/posts`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
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

export const useCeatePost: any = () => {
  const { token } = useSelector((state: Rootstate) => state.authState);
  return useMutation((data: PostData) => createNewPost(data, token), {});
};
