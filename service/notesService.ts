import { NotesCreateTypePush } from "@/types/push/notesCreateType";
import { supabase } from "./db/supabase";

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