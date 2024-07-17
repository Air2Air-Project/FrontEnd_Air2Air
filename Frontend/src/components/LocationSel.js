import {useState, useEffect,Fragment } from 'react';
import addressData from '../data/station.json'
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useRecoilState } from 'recoil';
import { userLocationState } from '../recoil/atoms';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function LocationSel({ onChange = () => {} }) {
    const [largeCategories, setLargeCategories] = useState([]);
    const [selectedLarge, setSelectedLarge] = useState('');
    const [mediumCategories, setMediumCategories] = useState([]);
    const [selectedMedium, setSelectedMedium] = useState('');
    const [selectedSmall, setSelectedSmall] = useState('');
    const [smallCategories, setSmallCategories] = useState([]);
    // const [location, setLocation] = useRecoilState(locationState);

    useEffect(() => {
      let tm = addressData.map(item => item.large);
      tm = new Set(tm);
      tm = [...tm];
      setLargeCategories(tm);
    }, []);
  
    const handleLargeChange = (value) => {
      setSelectedLarge(value);
      const filteredMediums = addressData.filter(item => item.large === value).map(item => item.middle);
      setMediumCategories([...new Set(filteredMediums)]);
      setSmallCategories([]);
      setSelectedMedium('');
      setSelectedSmall('');
      // onChange('');
    };
  
    const handleMediumChange = (value) => {
      setSelectedMedium(value);
      const filteredSmalls = addressData.filter(item => item.large === selectedLarge && item.middle === value).map(item => item.small);
      setSmallCategories([...new Set(filteredSmalls)]);
      setSelectedSmall('');
      // onChange('');
    };
  
    const handleSmallChange = (value) => {
      setSelectedSmall(value);
      const newAddress = { large: selectedLarge, middle: selectedMedium, small: value };
      const geoAddress = `${selectedLarge} ${selectedMedium} ${value}`;
      // const newAddress = `${value}`;
      const info = getInfo(value);
      onChange(newAddress, geoAddress, info);
    };
    const getInfo = (value) => {
      const station = addressData.find(item => item.small === value);
      return station ? station.info : '';
    };

    return (
        <div className="flex w-full items-center min-w-[200px] justify-start">
          <div className="text-lg pr-5 w-1/3">
            <Listbox value={selectedLarge} onChange={handleLargeChange}>
              {({ open }) => (
                <>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white bg-opacity-80 py-1.5 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-2 custom-button sm:text-sm sm:leading-6">
                      <span className="block truncate">{selectedLarge || '시 / 도'}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {largeCategories.map((large, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={large}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                  {large}
                                </span>
                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-blue-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>

          {mediumCategories.length > 0 && (
            <div className="text-lg px-2 w-1/3">
              <Listbox value={selectedMedium} onChange={handleMediumChange}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white bg-opacity-80 py-1.5 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring custom-button sm:text-sm sm:leading-6">
                        <span className="block truncate">{selectedMedium || '구 / 군'}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {mediumCategories.map((middle, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={middle}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {middle}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-blue-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          )}

          {smallCategories.length > 0 && (
            <div className="text-lg w-1/3">
              <Listbox value={selectedSmall} onChange={handleSmallChange}>
                {({ open }) => (
                  <>
<<<<<<< Updated upstream
                    <div className="relative mt-2 pl-5">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white bg-opacity-80 py-1.5 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
=======
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white bg-opacity-80 py-1.5 pl-3 pr-10 text-left text-black shadow-sm ring-1 ring-inset ring-gray-700 focus:outline-none focus:ring-2 custom-button sm:text-sm sm:leading-6">
>>>>>>> Stashed changes
                        <span className="block truncate">{selectedSmall || '읍 / 면 / 동'}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {smallCategories.map((small, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-blue-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={small}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                    {small}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-blue-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          )}
        </div>

    );
}
