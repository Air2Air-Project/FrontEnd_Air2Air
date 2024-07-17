import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResetPw() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phoneNumber } = location.state || {};
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const checkPw = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    setPasswordValid(regex.test(password));
  }

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://10.125.121.224:8080/user/change/password', {
        email,
        phoneNumber,
        password
      });
      setError('');
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // navigate to login or another page if needed
      navigate('/login');
    } catch (error) {
      setError('비밀번호를 재설정할 수 없습니다.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-2xl'>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <form onSubmit={handleSubmit}>
              <table className='min-w-full divide-y divide-gray-300'>
                <tbody className='divide-y divide-blue-500'>
                  <tr>
                    <td className='text-left px-4 py-2 text-gray-600 font-semibold text-lg'>비밀번호 설정하기</td>
                  </tr>
                  <tr>
                    <td colSpan='2'>
                      <input
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        className='whitespace-nowrap px-5 py-4 text-base text-blue-500 bg-transparent placeholder-blue-300 w-full'
                        placeholder='새로운 비밀번호를 입력하세요.'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-end items-center'>
                <button
                  type='submit'
                  className='bg-blue-500 bg-opacity-50 hover:bg-transparent hover:border hover:border-blue-300 hover:text-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center mt-4'
                >
                  설정
                </button>
              </div>
            </form>
            {error && (
              <div className='mt-4 p-2 text-center text-red-700 border border-red-700 bg-transparent rounded'>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
