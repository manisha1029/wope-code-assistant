"use client";

import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { useLoginCallback } from "@/hooks/useLoginCallback";
import { useRouter } from "next/navigation";


function GithubLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const {data, isLoading, isError} = useLoginCallback(code || '');

  useEffect(() => {
    if(!code){
      router.replace("/")
    }
    if(data){
        localStorage.setItem('jwt_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.replace("/dashboard")
    }
    if(isError){
        router.replace('/');
    }
  },[code, data, isError, router])
    
  return (
   isLoading ? 
   <div className="flex justify-center items-center h-screen">
      Plase wait while we are signing you in....
   </div> 
   : null
  )
}

export default GithubLogin;