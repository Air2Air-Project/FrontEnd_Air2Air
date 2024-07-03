import React from 'react'
import { Link } from'react-router-dom'
import Nav from '../components/Nav'
// import Main from '../components/Main'
// import Header from '../components/Header'
// import Sidebar from '../components/Sidebar'
// import'./Main.css';
// import Footer from '../components/Footer';

export default function Main_Page() {
  return (
    <>
    <Nav/>
    <div className="flex flex-col h-[100vh] bg-[url('./components/background/waterbg6.png')] bg-cover text-white text-center rounded-t-3xl p-3">
    어쩌구 저쩌구
    <button className='bg-red-800' title='지진'/>
  </div>
  </>
  )
}
