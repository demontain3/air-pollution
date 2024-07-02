"use client"

import { useCounterStore } from '@/store/CounterStore'
import React from 'react'


const page = () => {
   const CounterState = useCounterStore()


  return (
    <div>
      about page aa is value is {CounterState.count}
    </div>
  )
}

export default page
