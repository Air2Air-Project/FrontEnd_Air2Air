import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Main_Page() {
  return (
    <div className='flex flex-col'>
    <Nav/>
    <div className='rounded-t-3xl'>
<<<<<<< Updated upstream
    <video src="/videos/clouds.mp4" autoPlay loop muted className=' rounded-t-3xl overflow-scroll w-full'/>
=======
    <video src="/videos/clouds.mp4" autoPlay loop muted className='w-full rounded-t-3xl overflow-scroll'/>
>>>>>>> Stashed changes
    </div>
  <Footer/>
  </div>
  )
}
