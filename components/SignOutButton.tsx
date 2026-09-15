'use client'

import { handleAuthSignOut } from "@/service/authSerivce.ts"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignOutButton(){
    const [signOutLoading,setSignOutLoading] = useState(false)
    const router = useRouter()
    const handleSignOut = async () => {
        setSignOutLoading(true)
        try { 
            await handleAuthSignOut()
            router.push('/')
            
        } catch (error) {
            console.error(error)
        } finally {
            setSignOutLoading(false)
        }
    }
    return (
        <button onClick={handleSignOut} disabled={signOutLoading}>{ signOutLoading ? "Signing Out" : "Sign Out" }</button>
    )
}