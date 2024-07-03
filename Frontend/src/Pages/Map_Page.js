import React from 'react'
import Map from '../components/Map.js';
import Nav from '../components/Nav.js';
import LocationSel from '../components/LocationSel.js';

export default function Map_Page() {
  return (
    <>
    <Nav/>
    <div className="bg-gray-700 text-white text-center rounded-t-3xl p-3">
      <h1 className="text-2xl font-bold mb-4 text-center m-5">폐수 처리장 위치</h1>
      <LocationSel/>
      <Map />
    </div>
    </>
  )
}
