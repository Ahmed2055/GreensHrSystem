import React, {useState, useEffect} from 'react'
import {Chart} from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";

function ChartReport({firstDayOfMonth, totalPharmacyReports, lastDayOfDailyReport, noOfDaysOfMonthuntilNow}) {

    const user = useSelector(selectUser);
    const [currentPharmacyData, setCurrentPharmacyData ] = useState([])

    useEffect(() => {
        var filteredPharmacyReport = [];
        var counter = 0;
        if(noOfDaysOfMonthuntilNow>totalPharmacyReports.length ){
            filteredPharmacyReport = totalPharmacyReports
        }
        else{
            for( var i = (totalPharmacyReports.length)-noOfDaysOfMonthuntilNow ; i < totalPharmacyReports.length  ; i++){
                filteredPharmacyReport.push(totalPharmacyReports[i])
                counter++
            }
        }
        filteredPharmacyReport = filteredPharmacyReport.filter((report)=>new Date(report.day)    >=  new Date(firstDayOfMonth) )
        // console.log('applied new Filter in Chart report');
        // console.log(filteredPharmacyReport);
        // console.log(counter);
        
        ///
        if(filteredPharmacyReport.length === 0 ){return;}
        ///
        ///
      const pharmacyData =[  ['Day', 'Morning Shift', 'Night Shift', 'Total Sales'], ]
      for(let i=0 ; i < filteredPharmacyReport.length ; i++ ){
        pharmacyData.push([ filteredPharmacyReport[i].day , filteredPharmacyReport[i].firstSales , filteredPharmacyReport[i].secondSales, filteredPharmacyReport[i].firstSales+ filteredPharmacyReport[i].secondSales ])
      }
      setCurrentPharmacyData(pharmacyData)
    }, [])

    return (
        <div className='chartReport'>
            {currentPharmacyData.length > 1 ? 
            <Chart    
                height={350}
                chartType="ColumnChart"
                loader={<div> Loading Pharmacy Chart </div>}
                data={currentPharmacyData}
                options={{
                title: 'Sales of Pharmacy  '+ user.currentPharmacy,
                chartArea: { width: '70%' },
                hAxis: {
                    title: 'Days',
                    minValue: 0,
                },
                vAxis: {
                    title: 'Sales SAR',
                },
                }}
                legendToggle
            /> : ''}

        </div>
    )
}

export default ChartReport
