import { auth } from '@/auth'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_GITHUB_ID_QUERY, AUTHOR_BY_ID_QUERY } from '@/sanity/lib/query'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async ({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const session = await auth()
    const user = client.fetch(AUTHOR_BY_ID_QUERY,{id})
    if(!user) return notFound()
  return (
    <div>
      
    </div>
  )
}

export default page
