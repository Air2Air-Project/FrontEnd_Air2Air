import React, { useState } from 'react'
import Map from '../components/Map.js';
import Nav from '../components/Nav.js';
import LocationSel from '../components/LocationSel.js';
import Footer from '../components/Footer.js';



export default function Map_Page() {
  const [locationData, setLocationData] = useState({ address: '', info: '' });
  const handleAddressChange = ( newAddress, geoAddress, newInfo) => {
    setLocationData({ address: geoAddress, info: newInfo });
  };
  return (
    <>
    <Nav/>
    <div className="bg-[url('./components/background/cloudbg1.png')] text-white rounded-t-3xl p-3 h-[83vh] flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold mb-4 text-center m-5">미세먼지 측정소</h1>
      <div className='w-[90%]'>
      <LocationSel onChange={handleAddressChange}/>
      </div>
      <Map address={locationData.address} info={locationData.info}/>
      
    </div>
    <Footer />
    </>
  )
}
