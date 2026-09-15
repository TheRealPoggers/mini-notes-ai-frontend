'use client'
import { useNotes } from "@/hooks/notesHooks.ts";
import NotesItem from "./NotesItem";


export default function NotesList() {
    const { loading, error, notes } = useNotes()

    if(loading)
        return <h2>Loading...</h2>

    if(error)
        return <h2>Error: {error}</h2>

    return (
        <div>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <NotesItem note={note} />
                    </li>
                ))}
            </ul>
        </div>
    )
}