import { NotesCreateTypePush } from "@/types/push/notesCreateType";
import { supabase } from "./db/supabase";
import { notesSchema, NotesTypeRecieve } from "@/types/recieve/notesType";

const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/notes/'
export async function handleCreateNewNotes(newNotes: NotesCreateTypePush) {

    const { data: { session }} = await supabase.auth.getSession()
    
    if(!session)
        throw new Error('Người dùng chưa đăng nhập')

    const response = await fetch(url,{
        method:"POST",
        headers:{
            'Authorization':`Bearer ${session.access_token}`,
            'Content-Type':'application/json'
        },
        body: JSON.stringify(newNotes)
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
    }

    const data = await response.json()

    return data
}

export async function handleGetNotes() {
    const { data: { session }} = await supabase.auth.getSession()
    if(!session)
        throw new Error("Người dùng chưa đăng nhập")

    const response = await fetch(url,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${session.access_token}`
        }
    })

    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
    }

    const data = await response.json()
    
    return data
}

export async function handleGetNoteByID(id: string): Promise<NotesTypeRecieve> {
    const { data: { session }} = await supabase.auth.getSession()
    if(!session)
        throw new Error("Người dùng chưa đăng nhập")


    const response = await fetch(url + id,{
        method:"GET",
        headers:{
            'Authorization':`Bearer ${session.access_token}`
        }
    })

    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
    }

    const data = await response.json()
    const result = notesSchema.safeParse(data)

    if(!result.success)
        throw new Error(result.error.message)

    return result.data
}

export async function handleSaveDescription(description: string,id:string) {
    const { data: { session }} = await supabase.auth.getSession()

    if(!session)
        throw new Error("Người dùng chưa đăng nhập")

    const response = await fetch(url+id,{
        method:"PUT",
        headers: {
            'Authorization':`Bearer ${session.access_token}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "description":description
        })
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
    }

    return true
}

export async function handleDeleteNote(id: string) {
    const { data: { session }} = await supabase.auth.getSession()
    if(!session)
        throw new Error("Người dùng chưa đăng nhập")

    const response = await fetch(url+id,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${session.access_token}`
        }
    })

    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
    }

    return true
}