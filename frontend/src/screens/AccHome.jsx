import React from 'react'
import AccSecondHeader from '../components/AccSecondHeader'
import LocationHeader from '../components/LocationHeader'

function AccHome() {
    return (
        <div className='dashHome'>
            <div className="dashHome__mainHeader">Accountant Dashboard</div>
            <AccSecondHeader  />
            <LocationHeader location='DashBoard' />
        </div>
    )
}

export default AccHome
