'use client'

import { handleCreateNewNotes } from "@/service/notesService"
import { notesCreateSchema } from "@/types/push/notesCreateType"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateNotesPage() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()


    const handleCreateNotes = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)


        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
        }

        const result = notesCreateSchema.safeParse(data)
        
        if(!result.success) {
            console.error(result.error)
            return
        }

        setLoading(true)
        
        try {
            const data = await handleCreateNewNotes(result.data)
            console.log(data)
            router.push('/dashboard')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <form onSubmit={handleCreateNotes}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title"></input>
                </div>
                <div>
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
            </form>
        </div>
    )
}