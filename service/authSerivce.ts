import { supabase } from "./db/supabase"

export async function handleAuthRegister(email:string,password:string){
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register'
    const response = await fetch(url,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'An unknown error occurred')
    }

    const data = await response.json()
    return data
}

export async function handleAuthLogin(email:string,password:string){
    const { data, error } = await supabase.auth.signInWithPassword({
        'email':email,
        'password':password
    })
    if (error)
        throw new Error(error.message)

    return data
}

export async function handleAuthSignOut(){
    const { error } = await supabase.auth.signOut()
    if (error)
        throw new Error(error.message)
    
    return true
}