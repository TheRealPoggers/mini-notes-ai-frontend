'use client'

import { NotesTypeRecieve } from "@/types/recieve/notesType";
import Link from "next/link";

export default function NotesItem({note}:{note:NotesTypeRecieve}){
    return (
        <Link href={`/note/${note.id}`}>
            <h2>{note.title}</h2>
            <h2>{note.description}</h2>
            <h3>{note.created_at}</h3>
        </Link>
    )
}