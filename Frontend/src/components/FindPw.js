import React, { useState } from 'react';
import axios from 'axios';

export default function FindPw() {
  const [userPw, setPw] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    memberId: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
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
      setPw(response.data);
      setError('');
    } catch (error) {
      setPw('');
      setError('등록되지 않은 회원정보 입니다.');
    }
  };

  return (
    <div className='bg-white bg-opacity-50 p-10 rounded-lg shadow-lg w-full max-w-2xl'>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <form onSubmit={handleSubmit}>
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="text-left px-4 py-2 text-white hae">회원정보에 등록한 ID</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type='text'
                        onChange={handleChange}
                        name="memberId"
                        className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 bg-transparent placeholder-slate-500 w-full"
                        placeholder='ID를 입력하세요.'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left px-4 py-4 text-white">회원정보에 등록한 전화번호</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input
                        type='text'
                        onChange={handleChange}
                        name='phoneNumber'
                        className="whitespace-nowrap px-3 py-4 text-sm text-slate-500 bg-transparent placeholder-slate-500 w-full"
                        placeholder='전화번호를 입력하세요.'
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='flex justify-end items-center'>
                <button
                  type="submit"
                  className="text-[#153c27] hover:text-white border border-[#153c27] hover:bg-[#153c27] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
                >
                  찾기
                </button>
              </div>
            </div>
          </form>
          {userPw && (
            <div className='mt-4 p-2 text-center bg-transparent text-green-700 border border-green-700 rounded font-bold'>
              사용자의 비밀번호가 &#91;<span className='text-black'>{userPw}</span>&#93;로 재설정 되었습니다.
            </div>
          )}
          {error && (
            <div className='mt-4 p-2 text-center text-red-700 border border-red-700 bg-transparent rounded'>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
