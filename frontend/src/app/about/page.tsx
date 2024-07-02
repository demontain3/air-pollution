"use client"

import React from 'react'
import { useCounterStore } from "@/store/CounterStore"

const page = () => {
    const CounterState = useCounterStore()

    console.log(CounterState)

  return (
    <div>
        

      About page value is {CounterState.count}

      {/* count ++ button  */}
      <button onClick={() => CounterState.increment()}>Increment</button>
      {/* count -- button  */}
    </div>
  )
}

export default page
