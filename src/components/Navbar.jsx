import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-amber-500 text-white py-2'>
        <div className="logo">
          <span className='font-bold text-xl mx-8'>TaskNest</span>
        </div>
        <ul className='flex gap-4 mx-8'>
            <li className='cursor-pointer hover:font-bold w-20'>Home</li>
            <li className='cursor-pointer hover:font-bold w-20'>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar