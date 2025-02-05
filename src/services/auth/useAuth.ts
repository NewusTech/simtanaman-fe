import { useMutation } from "@tanstack/react-query";
import { ApiResponse, DataObject, LoginData, LoginPayload } from "@/types";
import { sendData } from "../api/fetcher";

export const useLoginMutation = () => {
  return useMutation<ApiResponse<DataObject<LoginData>>, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      return await sendData("login", payload, "POST");
    },
  });
};
