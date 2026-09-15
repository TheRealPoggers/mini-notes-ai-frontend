'use client'

import NotesList from "@/components/NotesList";
import SignOutButton from "@/components/SignOutButton.tsx";

import Link from "next/link";

export default function DashboardPage() {

    return (
        <div>
            <NotesList />
            <h2 className="text-2xl">Dashboard Page</h2>
            <Link href={'/create-notes'}>Create New Notes</Link>
            <SignOutButton />
        </div>
    )
}