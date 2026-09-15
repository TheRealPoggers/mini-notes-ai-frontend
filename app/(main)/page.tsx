'use client'


import { supabase } from "@/service/db/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter()
  useEffect(() => {
    const verifyLoginSession = async () => {
      const { data: { session }} = await supabase.auth.getSession()
      if (!session)
        router.push('/login')
      else
        router.push('/dashboard')
    } 
    verifyLoginSession()
  },[])
  
  return (
    <h2>Loading...</h2>
  )
}
