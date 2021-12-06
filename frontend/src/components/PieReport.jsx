import React, {useState, useEffect} from 'react'
import {Chart} from "react-google-charts";

function PieReport({firstDayOfMonth, totalPharmacyReports, lastDayOfDailyReport, noOfDaysOfMonthuntilNow}) {

  

  const [uptodateSalesReport, setUptodateSalesReport] = useState([   ['Pharmacist', 'Sales'],  ])
  const [pieReportVisible, setPieReportVisible] = useState(false) 

    const prepareChartData = () =>{
      var filteredPharmacyReport = [];
        var counter = 0;
        if(noOfDaysOfMonthuntilNow > totalPharmacyReports.length ){
          filteredPharmacyReport = totalPharmacyReports
      }
      else{
          for( var i = (totalPharmacyReports.length)-noOfDaysOfMonthuntilNow ; i < totalPharmacyReports.length  ; i++){
              filteredPharmacyReport.push(totalPharmacyReports[i])
              counter++
          }
      }
      filteredPharmacyReport = filteredPharmacyReport.filter((report)=>new Date(report.day)   >=  new Date(firstDayOfMonth) )
        // console.log('applied new Filter in pie report');
        // console.log(filteredPharmacyReport);
        // console.log(counter);
        
        ///
        if(filteredPharmacyReport.length === 0 ){return;}
        ///

      var detailedSales = [['Pharmacist', 'Sales']]
        var pharmacists = []
//

      for(let i = 0; i< filteredPharmacyReport.length ; i++){

        if( pharmacists.indexOf(filteredPharmacyReport[i].firstPharmacist) !== -1 ){
          var indexOfCurrentPharmacist = pharmacists.indexOf(filteredPharmacyReport[i].firstPharmacist); // 1
          detailedSales[indexOfCurrentPharmacist + 1 ][1] +=  filteredPharmacyReport[i].firstSales
        } else if(filteredPharmacyReport[i].firstPharmacist !== ''){
          detailedSales.push([  filteredPharmacyReport[i].firstPharmacist , filteredPharmacyReport[i].firstSales ])
          pharmacists.push(filteredPharmacyReport[i].firstPharmacist)
        }

        if( pharmacists.indexOf(filteredPharmacyReport[i].secondPharmacist) !== -1 ){
          var indexOfCurrentPharmacistAgain = pharmacists.indexOf(filteredPharmacyReport[i].secondPharmacist); // 1
          detailedSales[indexOfCurrentPharmacistAgain + 1 ][1] +=  filteredPharmacyReport[i].secondSales
        } else if(filteredPharmacyReport[i].secondPharmacist !== ''){
          detailedSales.push([  filteredPharmacyReport[i].secondPharmacist , filteredPharmacyReport[i].secondSales ])
          pharmacists.push(filteredPharmacyReport[i].secondPharmacist)
        }
        // console.log('after calculating day', filteredPharmacyReport[i].day )
        // console.log(detailedSales)
      }

      // console.log(detailedSales);
      detailedSales.shift();
      detailedSales.sort();
      // console.log('Pie after sorting names');
      // console.log(detailedSales);
      detailedSales.unshift(['Pharmacist', 'Sales']);
      setUptodateSalesReport(detailedSales)
      if(uptodateSalesReport.length > 1){setPieReportVisible(true)}
    }

    useEffect(() => {
      prepareChartData()
    }, [])

    return (
        <div className='pieReport'>

        {uptodateSalesReport.length >  1  ?
            <Chart
              width={'500px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={uptodateSalesReport}
              options={{
                title: 'Pharmacy Sales Distribution for current Month',
                // Just add this option
                is3D: true,
              }}
              rootProps={{ 'data-testid': '2' }}
              />
              :<button className="wcfc__btnSubmit"  onClick={()=>prepareChartData()}>View Pharmacists Contributions this month</button>}

              

        </div>
    )
}

export default PieReport
