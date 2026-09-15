import { handleGetNotes } from "@/service/notesService.ts";
import { notesSelectSchema, NotesTypeRecieve } from "@/types/recieve/notesType.ts";
import { useEffect, useState } from "react";

export function useNotes() {
    const [notes,setNotes] = useState<NotesTypeRecieve[]>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState<string | null>(null)

    const reFetchNotes =  async () => {
        setLoading(true)
        try {
            const data = await handleGetNotes()
            const result = notesSelectSchema.safeParse(data)
            if (!result.success) 
                throw new Error(result.error.message)
            
            setNotes(result.data)
        } catch (err) {
            if (err instanceof Error) 
                setError(err.message)
            else 
                setError('Failed to get notes')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        reFetchNotes()
    },[])

    return {
        notes,
        loading,
        error,
        reFetchNotes
    }
}