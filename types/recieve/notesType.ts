import { z } from "zod"

export const notesSchema = z.object({
    id: z.uuid(),
    user_id: z.uuid(),
    title: z.string(),
    description: z.string(),
    created_at: z.string(),
    is_active: z.boolean(),
})

export type NotesTypeRecieve = z.infer<typeof notesSchema>

export const notesSelectSchema = z.array(notesSchema)
