import React from 'react'
import Hero from '../components/Hero'
import HomestayList from '../components/HomestayList'
import Facility from '../components/Facility'
import SightSeeing from '../components/SightSeeing'

const Homepage = () => {
  return (
    <div>
        <Hero/>
        <div id="bookings">
          <HomestayList/>
        </div>
        <SightSeeing/>
        <div id="facilities">
          <Facility/>
        </div>
    </div>
  )
}

export default Homepage