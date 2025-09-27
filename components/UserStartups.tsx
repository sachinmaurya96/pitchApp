import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/query'
import React from 'react'
import StartUpCard, { StartupTypeCard } from './StartUpCard'

const UserStartups =async ({id}:{id:string}) => {
    const startups  = await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id})
  return (
  <>
  {
    startups?.length >0 ?(
        startups.map((startup:StartupTypeCard)=><StartUpCard key={startup?._id} post={startup}/>)
    ):<p className='no-result'>No post yet</p>
  }
  </>
  )
}

export default UserStartups
