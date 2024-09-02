import React from 'react'
import Header from '@/components/Header'
import FAQ from '@/components/FAQ'
import Pricing from '@/components/Pricing'
import { Suspense } from 'react'
const page = () => {
  return (
    <>
    <Suspense>

   
    <Header/>
    <Pricing/>
    <FAQ/>
    </Suspense>
    
    </>
  )
}

export default page