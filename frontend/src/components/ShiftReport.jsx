import React from 'react'

function ShiftReport({sales, pharmacist, remarks, shiftEnd}) {
    return (
        <div className='shiftReport'>
            {sales === 0? '' :
            <>
            <div className="shiftReport__detail">
                <span className="shiftReport__detailTitle">Sales</span>
                <span className="shiftReport__detailText"> {sales? sales.toFixed(2) : '' }{sales === 0? '0.00':''} SAR</span>
            </div>
            <div className="shiftReport__detail">
                <span className="shiftReport__detailTitle">Pharmacist</span>
                <span className="shiftReport__detailText">{pharmacist===''? '':pharmacist}</span>
            </div>
            <div className="shiftReport__detail">
                <span className="shiftReport__detailTitle">Shift Ended At:</span>
                <span className="shiftReport__detailText">{shiftEnd}</span>
            </div>
            <div className="shiftReport__detail">
                <span className="shiftReport__detailTitle">Remarks</span>
                <span className="shiftReport__detailText">{remarks}</span>
            </div>
            </>}
        </div>
    )
}

export default ShiftReport
