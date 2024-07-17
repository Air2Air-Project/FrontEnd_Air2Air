import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FindPw() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://10.125.121.224:8080/user/find/password', formData);
      setError('');
      navigate('/resetPw', { state: { email: formData.email, phoneNumber: formData.phoneNumber } });
    } catch (error) {
      setError('등록되지 않은 회원정보 입니다.');
    }
  };

  return (
    <div className='bg-white bg-opacity-80 p-10 rounded-lg shadow-lg w-full max-w-2xl'>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <form onSubmit={handleSubmit}>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-blue-500">
                <tbody className="divide-y divide-blue-500">
                  <tr>
                    <td className="text-left px-4 py-4 text-blue-500 font-semibold">회원정보에 등록한 Email</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type='text'
                        onChange={handleChange}
                        name="email"
                        className="whitespace-nowrap px-6 py-4 text-sm text-blue-500 bg-transparent placeholder-blue-300 w-full"
                        placeholder='Email를 입력하세요.'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left px-4 py-4 text-blue-500 font-semibold">회원정보에 등록한 전화번호</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type='text'
                        onChange={handleChange}
                        name='phoneNumber'
                        className="whitespace-nowrap px-6 py-4 text-sm text-blue-500 bg-transparent placeholder-blue-300 w-full"
                        placeholder='전화번호를 입력하세요.'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-end items-center'>
                <button
                  type="submit"
                  className="bg-blue-300 bg-opacity-50 hover:bg-transparent hover:border hover:border-blue-300 hover:text-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                >
                  찾기
                </button>
              </div>
            </div>
          </form>
          {error && (
            <div className='mx-10 mt-4 p-2 text-center text-red-700 border border-red-700 bg-transparent rounded'>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
