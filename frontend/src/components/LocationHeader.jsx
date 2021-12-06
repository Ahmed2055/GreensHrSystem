import React from 'react'

function LocationHeader({location}) {
    return (
        <div className='locationHeader'>
            <p className="locationHeader__text">{location}</p>
        </div>
    )
}

export default LocationHeader
