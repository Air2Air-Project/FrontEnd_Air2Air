import React, { useState } from 'react';
import axios from 'axios';
import LocationSel from './LocationSel'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData]=useState({
    email:'',
    username:'',
    password:'',
    phoneNumber:'',
    region:{
      large:'',
      middle:'',
      small:''
    }
  });
  const [isEmailUnique, setIsEmailUnique] = useState(null); // ID 중복 확인 결과를 저장할 상태
  const [checkMessage, setCheckMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:value
    });
    if(name === 'password'){
      checkPw(value);
    }
  };
  
  const handleRegionChange = (region) => {
    setFormData({
      ...formData,
      region: {
        ...formData.region,
        ...region
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://10.125.121.224:8080/user/register', formData)
      .then(response => {
        console.log('Data sent successfully:', response.data);
        navigate('/login'); // 성공적으로 등록된 후 로그인 페이지로 리디렉션
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleCheckId = async () => {
    try {
      const response = await axios.get(`http://10.125.121.224:8080/checkId/${formData.email}`);
      if (response.data) {
        setIsEmailUnique(true);
        setCheckMessage('사용 가능한 ID입니다.');
      } else {
        setIsEmailUnique(false);
        setCheckMessage('이미 사용 중인 ID입니다.');
      }
    } catch (error) {
      console.error('Error checking ID uniqueness:', error);
      setIsEmailUnique(false);
      setCheckMessage('ID 확인 중 오류가 발생했습니다.');
    }
  };

  const checkPw = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    setPasswordValid(regex.test(password));
  }
  return (
    <form onSubmit={handleSubmit} className='w-full max-w-xl mx-auto'>
    <div className="bg-white bg-opacity-70 p-10 rounded-2xl shadow-md w-full">
          {/* <form action="#" method="POST" className="space-y-6"> */}
            <div>
              <label htmlFor="email" className="block text-base font-bold text-black">Email</label>
              <div className='flex justify-between'>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-3/4 p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent" />
                <div className='flex justify-center items-center mr-5'>
                  <button type="button" className='border border-black text-black hover:bg-white hover:bg-opacity-30 py-1 px-3 rounded-md'
                    onClick={handleCheckId}
                    >
                  중복확인</button>
                </div>
              </div>
              {isEmailUnique !== null && (
            <p className={`m-2 text-sm ${isEmailUnique ? 'text-[#153c27]' : 'text-red-800'}`}>
              {checkMessage}
            </p>
          )}
            </div>
            <div>
              <label htmlFor="username" className="block text-base font-bold text-black">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent" />
            </div>
            <div className='mt-4'>
              <label htmlFor="password" className="block text-base font-bold text-black">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent" />
              {!passwordValid && <p className="text-red-800 text-sm mt-1">비밀번호는 대소문자와 숫자를 각각 하나 이상 포함해야 합니다.</p>}
            </div>
            <div className='mt-4'>
              <label htmlFor="phoneNumber" className="block text-base font-bold text-black">Cellphone</label>
              <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent" />
            </div>
            <div className='mt-4'>
              <label htmlFor="region" className="block text-base font-bold text-black">관측소 선택</label>
              <div className='flex justify-start items-center'>
              <LocationSel onChange={handleRegionChange}/>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button type="submit" className="w-full py-2 px-4 bg-[#153c27] text-white font-semibold rounded-md hover:bg-opacity-80">REGISTER</button>
            </div>
          {/* </form> */}
        </div>
        </form>
  )
}
