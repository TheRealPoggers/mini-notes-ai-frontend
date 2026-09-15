import { z } from 'zod'
export const notesCreateSchema = z.object({
    title: z.string(),
    description: z.string()
})

export type NotesCreateTypePush = z.infer<typeof notesCreateSchema>