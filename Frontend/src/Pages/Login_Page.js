import React from 'react'
import Nav from '../components/Nav.js';
import LoginForm from '../components/LoginForm.js';

export default function Login_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-[#17444F] text-white text-center rounded-t-3xl p-3 h-[100vh] flex justify-center items-center">
      <LoginForm/>
    </div>
    </>
  )
}
