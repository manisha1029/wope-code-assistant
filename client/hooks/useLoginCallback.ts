import { useQuery } from "@tanstack/react-query";
import { handleCallback } from "@/services/auth";
import type { LoginResponse } from "@/types/auth";

export const useLoginCallback = (code: string) => {
  return useQuery({
    queryKey: ["login", code],
    queryFn: () => handleCallback(code),
  });
};
