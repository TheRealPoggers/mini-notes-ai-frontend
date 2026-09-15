'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { handleAuthLogin } from "@/service/authSerivce.ts"



export default function LoginPage() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget)

        const email = formData.get('email') as string
        const password = formData.get('password') as string
        setLoading(true)
        try {
            const data = await handleAuthLogin(email,password)
            console.log(data) 
            router.push('/')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password"></input>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Signing In' : "Sign In"}</button>
            </form>
        </div>
    )
}