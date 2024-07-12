import React, { useState } from 'react'
import Map from '../components/Map.js';
import Nav from '../components/Nav.js';
import LocationSel from '../components/LocationSel.js';
import Footer from '../components/Footer.js';



export default function Map_Page() {
  const [locationData, setLocationData] = useState({ address: '', info: '' });

  const handleAddressChange = (newAddress, newInfo) => {
    setLocationData({ address: newAddress, info: newInfo });
  };
  return (
    <>
    <Nav/>
    <div className="relative bg-[url('./components/background/background.png')] custom-bg-opacity-50 text-white text-center rounded-t-3xl p-3 h-[83vh]">
      <h1 className="text-2xl font-bold mb-4 text-center m-5">미세먼지 측정소</h1>
      {/* <div className='w-[80%]'> */}
      <LocationSel onChange={handleAddressChange}/>
      {/* </div> */}
      <Map address={locationData.address} info={locationData.info}/>
    </div>
    <Footer />
    </>
  )
}
