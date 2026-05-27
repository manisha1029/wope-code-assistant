"use client";

import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { useLoginCallback } from "@/hooks/useLoginCallback";


function page() {
  const searchParams = useSearchParams();
  const {data, isLoading, isError} = useLoginCallback(searchParams.get('code') || '');

  useEffect(() => {
    if(data){
        localStorage.setItem('jwt_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
    }
    if(isError){
        window.location.href = '/';
    }
  },[data, isError])
    
  
    
  return (
    <div className="flex justify-center items-center h-screen">Plase wait while we are signing you in....</div>
  )
}

export default page