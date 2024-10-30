"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const AddClientButton = () => {
  
  const router = useRouter()
    return (
    <Button className='bg-green-700 px-8 py-5 font-bold text-base w-full hover:bg-green-800'
    onClick={() => router.push('/register')}
    >Add A Client</Button>
  )
}

export default AddClientButton