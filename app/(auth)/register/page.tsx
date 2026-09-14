'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { handleAuthRegister } from "@/service/authSerivce"


export default function RegisterPage() {

    const [loading,setLoading] = useState(false)

    const router = useRouter()

    const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            console.error('Mật khẩu không khớp')
            return
        }

        setLoading(true)
        try {
            const data = await handleAuthRegister(email,password)
            console.log(data)
            router.push('/login')
             
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email"></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password"></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword" id="confirmPassword"></input>
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Signing Up' : 'Sign Up'}</button>
            </form>
        </div>
    )
}