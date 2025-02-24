'use server'

import { auth } from '@clerk/nextjs/server'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/ingest`

const schema = z.object({
    url: z.string({
        invalid_type_error: 'Invalid URL',
    }),
})

async function processURL(url: string, name: string) {
    const { getToken } = await auth()
    const validatedFields = schema.safeParse({ url })

    if (!validatedFields.success) {
        throw new Error(validatedFields.error.flatten().fieldErrors.url?.[0] || 'Invalid URL')
    }

    const res = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ ...validatedFields.data, name }),
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

export async function submitURL(formData: FormData, name: string) {
    const url = formData.get('url') as string
    try {
        await processURL(url, name)
        revalidateTag('content')
    } catch (error) {
        throw error
    }
}