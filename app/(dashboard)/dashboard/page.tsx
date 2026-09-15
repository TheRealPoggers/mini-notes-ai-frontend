'use client'

import SignOutButton from "@/components/SignOutButton.tsx";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            <h2 className="text-2xl">Dashboard Page</h2>
            <Link href={'/create-notes'}>Create New Notes</Link>
            <SignOutButton />
        </div>
    )
}