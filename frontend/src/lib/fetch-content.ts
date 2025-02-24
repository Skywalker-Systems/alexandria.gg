
import { contentSchema } from '@/lib/schema'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

export default async function fetchContent({ personal, latest, recommended }: { personal: boolean, latest: boolean, recommended: boolean }) {
    const params = new URLSearchParams()
    if (personal) params.append('personal', 'true')
    if (latest) params.append('latest', 'true')
    if (recommended) params.append('recommended', 'true')

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/content${params.toString() ? '?' + params.toString() : ''}`

    const { getToken } = await auth()
    const res = await fetch(API_URL, {
        method: 'GET',
        cache: 'force-cache',
        next: {
            tags: ['content']
        },
        headers: {
            'Authorization': `Bearer ${await getToken()}`
        }
    })

    if (!res.ok) {
        return {
            error: res.statusText
        }
    }

    const data = await res.json()
    return z.array(contentSchema).parse(data)
}
