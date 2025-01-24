import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-fulll h-screen flex flex-col items-center justify-center gap-3'>
      <h1>
        Page Not Found
      </h1>

      <Link to="/clinical-management/opd/new-patient" className='bg-purple text-white px-4 py-2 rounded-md'>
        Go to Dashboard
      </Link>

    </div>
  )
}

export default NotFound