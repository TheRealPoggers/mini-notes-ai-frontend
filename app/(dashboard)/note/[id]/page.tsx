'use client'

import { handleGetNoteByID, handleSaveDescription, handleDeleteNote } from "@/service/notesService"
import { NotesTypeRecieve } from "@/types/recieve/notesType"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function NotePage(){

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [save,setSave] = useState(true) 
    const [trigger,setTrigger] = useState(0)
    
    const [note,setNote] = useState<NotesTypeRecieve | null>(null)
    const [deleteLoading,setDeleteLoading] = useState(false)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')
    const { id } = useParams<{ id: string}>()

    const router = useRouter()
    
    const loadNote = async () => {
        setLoading(true)
        try {
            const data = await handleGetNoteByID(id)
            setNote(data)
        } catch (err) {
            if(err instanceof Error)
                setError(err.message)
            else
                setError('Không thể tìm thấy note')
        } finally {
            setLoading(false)
        }
            
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        try {
            await handleDeleteNote(id)
            router.push('/dashboard')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save description')
        }
        finally {
            setDeleteLoading(false)
        }
            
        
    }

    const saveDescription = async (): Promise<boolean> => {
        if(!textareaRef.current) return false
        try {
            await handleSaveDescription(textareaRef.current.value,id)
            setSave(true)
            return true
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save description')
            return false
        }
    }

    const handleBack = async () => {
        if (!save) {
            const confirmSave = window.confirm(
                "Bạn có muốn lưu trước khi rời trang không?"
            )

            if (confirmSave) {
                const saved = await saveDescription()
                if(!saved) return
            }

        }

        router.push("/dashboard")

    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if(save) return
            e.preventDefault()
            e.returnValue = "Bạn còn có thay đổi cần làm"
        }

        window.addEventListener("beforeunload", handleBeforeUnload)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [save])

    useEffect(() => {
        if(trigger === 0 || !textareaRef.current) return
        setSave(false)
        const timer = setTimeout(() => {
            saveDescription()
        },3000)
        return () => clearTimeout(timer)
    },[trigger])

    useEffect(() => {
        if(!id) return
        loadNote()
    },[id])

    if(loading)
        return <h2>Loading...</h2>

    if(error)
        return <h2>Error: {error}</h2>

    if (!note)
        return null
        
    return (
        <div>
            <h2>{note.title}</h2>
            <div>
                <label>Description</label>
                <textarea 
                    ref={textareaRef}
                    onChange={() => setTrigger(prev => prev + 1)}
                    className="border w-200 h-200 p-4 bg-black/10 text-lg" 
                    id="description"
                    defaultValue={note.description}/>
            </div>
            <h3>{note.created_at}</h3>
            <button onClick={handleDelete} disabled={deleteLoading}>{deleteLoading ? "Deleting..." : "Delete"}</button>
            <button onClick={handleBack} disabled={deleteLoading}>Dashboard</button>
        </div>
    )
}