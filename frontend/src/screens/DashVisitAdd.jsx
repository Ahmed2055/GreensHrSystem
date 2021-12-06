import React from 'react'

import DashSecondHeader from '../components/DashSecondHeader';
import LocationHeader from '../components/LocationHeader';

function DashVisitAdd() {


    
    return (
        <div className='dashVisitAdd dashHome'>
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader  />
            <LocationHeader location='New Visit' />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">

                </div>
            </div>
            
        </div>
    )
}

export default DashVisitAdd

