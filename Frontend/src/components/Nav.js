import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { IoMdPerson } from "react-icons/io";
import { Link } from 'react-router-dom'
import './Nav.css';
import { isLoggedInState, userState } from '../recoil/atoms';

const navigation = [
  { name: 'Location', href: '/map' },
  { name: 'Comprehend', href: '#' },
  { name: 'Realtime', href: '/real' },
  { name: 'Pastdata', href: '#' },
  { name: 'Board', href: '/board' },
  { name: 'Alert', href: '/alert' },
]

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const user = useRecoilValue(userState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  };

  return (
    <header className="bg-white">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1">
            <span className="sr-only">Your Company</span>
            <img className="h-[40px] w-[40px]" src="/images/pollution.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-shadow">
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">

        {isLoggedIn ? (
            <>
              <Link to="/" className="flex justify-center items-center text-sm font-semibold leading-6 bg-transparent text-gray-900 p-1 px-2 mx-1 hover:text-shadow">
                {user?.username}
              </Link>
              <button onClick={handleLogout} className='text-sm font-semibold leading-6 text-gray-900 hover:text-shadow'>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className='text-sm font-semibold leading-6 text-gray-900 hover:text-shadow'>
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-[30px] w-[30px]" src="/images/pure-water.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? (
                <>
                  <Link to="/" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {user?.username}
                  </Link>
                  <button onClick={handleLogout} className='text-sm font-semibold leading-6 text-gray-900 hover:text-shadow'>
                    Logout
                  </button>
                </>
                ) : (
                  <Link to="/login" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
