import React, {useState, useEffect} from 'react'
import { useStateValue } from '../store/StateProvider';
import { Link , useHistory} from 'react-router-dom';
import ShiftReport from './ShiftReport'

function PharmacyReport({pharmacyReports}) {

    const [currentPharmacyReports, setCurrentPharmacyReports] = useState([])

    useEffect(() => {
        var originalPharmacyReports = [...pharmacyReports];
        originalPharmacyReports.reverse();
        setCurrentPharmacyReports(originalPharmacyReports)
    }, [])

    return (
        <div className='pharmacyReport'>

            {currentPharmacyReports.map((dayReport, index) =>
            <div className="pharmacyReport__pharmacyContainer" key={index} >
                <div className="pharmacyReport__pharmacyContainerTitle">{dayReport.day} : </div>
                <div className="pharmacyReport__shiftContainer"><ShiftReport sales={dayReport.firstSales} pharmacist={dayReport.firstPharmacist} remarks={dayReport.firstRemarks} shiftEnd={dayReport.firstShiftEnd}  /></div>
                {dayReport.dayType === 'double'? 
                <div className="pharmacyReport__shiftContainer"><ShiftReport sales={dayReport.secondSales} pharmacist={dayReport.secondPharmacist} remarks={dayReport.secondRemarks} shiftEnd={dayReport.secondShiftEnd}  /></div>
                : '' }
                <div className="pharmacyReport__totalContainer">
                    <span className="pharmacyReport__totalContainerTitle">Total Sales:</span>
                    <span className="pharmacyReport__totalContainerText"> {parseFloat(dayReport.firstSales)+parseFloat(dayReport.secondSales)? (parseFloat(dayReport.firstSales)+parseFloat(dayReport.secondSales)).toFixed(2) : '' } SAR</span>
                </div>
            </div> 
            )}
            
        </div>
    )
}

export default PharmacyReport
