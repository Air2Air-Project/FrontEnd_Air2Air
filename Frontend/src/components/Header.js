import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState, userState } from '../recoil/atoms';
import { Link } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { useEffect } from 'react';


export default function Header({ title }) {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const user = useRecoilValue(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('nickname');
    localStorage.removeItem('memberId');
    localStorage.removeItem('USER_LOCATION');
  };
  
  return (
    <header className="w-full flex justify-start items-center bg-white bg-opacity-20 p-3 shadow rounded-lg Haeparang">
      <div className="flex w-full justify-between items-center ml-4">
        <div className='justify-start items-center text-2xl text-white'>
          <span>{title}</span>
        </div>
        <div className='flex justify-center items-center'>
          {isLoggedIn ? (
            <>
              <button onClick={handleLogout} className='bg-transparent text-white rounded-3xl p-2 mx-2 text-base shadow hover:bg-gray-200 hover:bg-opacity-20'>
                Logout
              </button>
              <Link to="/myPage" className="flex justify-center items-center text-base bg-transparent text-white rounded-3xl p-1 px-2 mx-1 shadow hover:bg-gray-200 hover:bg-opacity-20">
              <IoMdPerson 
                  className="w-6 h-6 mr-2"
                />
                {user?.nickname}
              </Link>
            </>
          ) : (
            <Link to="/login" className=' bg-transparent text-white rounded-3xl p-2 mx-2 text-sm shadow  hover:bg-gray-200 hover:bg-opacity-20'>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
