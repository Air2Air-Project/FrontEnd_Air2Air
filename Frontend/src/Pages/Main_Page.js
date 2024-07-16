import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Main_Page() {
  return (
    <div className='flex flex-col'>
    <Nav/>
    <div className='rounded-t-3xl'>
    <video src="/videos/clouds.mp4" autoPlay loop muted className=' rounded-t-3xl overflow-scroll'/>
    </div>
  <Footer/>
  </div>
  )
}
