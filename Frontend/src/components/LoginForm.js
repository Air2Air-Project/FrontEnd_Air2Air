import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState, isLoggedInState, userLocationState } from '../recoil/atoms';

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUserLocation = useSetRecoilState(userLocationState);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.125.121.224:8080/login', formData);
      console.log('Login successful:', response.data.username);
      localStorage.setItem('ACCESS_TOKEN', response.headers['authorization']);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      console.log("userData:", response.data);
      setUser(response.data);
      setUserLocation(response.data.stationName);
      console.log("stationName:",response.data.stationName);
      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      alert('아이디와 비밀번호가 다릅니다.');
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className='flex justify-center items-center'>
    <form 
    onSubmit={handleSubmit} 
    className="bg-white bg-opacity-80 p-10 rounded-2xl shadow-black shadow-md w-full max-w-sm">
      <input
        type="text"
        name="email"
        placeholder="ID"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-transparent mt-7 text-black"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-transparent text-black"
      />
      <button type="submit" className="w-full bg-[#1F3230] bg-opacity-50 text-black p-2 rounded hover:bg-gray-500">
        Login
      </button>
      <div className='flex justify-between items-center text-sm pt-5 text-black'>
        <a href='/findId'>Find ID</a>
        <a href='/findPw'>Find Password</a>
        <a href='/register'>Register</a>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
