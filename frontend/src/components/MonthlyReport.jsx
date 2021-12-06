import { set } from 'js-cookie';
import React, {useState, useEffect} from 'react'
import { useStateValue } from '../store/StateProvider';

function MonthlyReport({firstDayOfMonth, totalPharmacyReports, lastDayOfDailyReport, noOfDaysOfMonthuntilNow}) {

    

    const [pharmacyReports, setPharmacyReports] = useState([])
    const [monthTodateSales, setMonthTodateSales] = useState()
    const [expectedMonthSales, setexpectedMonthSales] = useState()
    const [lastSalesDate, setLastSalesDate] = useState(totalPharmacyReports[totalPharmacyReports.length-1].day)
    const [noOfDaysOfMonthSoFar, setNoOfDaysOfMonthSoFar] = useState(noOfDaysOfMonthuntilNow)
    const [currentMonthLength, setCurrentMonthLength] = useState(30)
    const [currentAverageDailySales, setCurrentAverageDailySales] = useState()
    const [target, setTarget] = useState(200000)
    const [expectedTargetAchievement, setExpectedTargetAchievement] = useState()
    const [dailySalesfor75, setDailySalesfor75] = useState()
    const [dailySalesfor90, setDailySalesfor90] = useState()
    const [dailySalesfor100, setDailySalesfor100] = useState()
    const [monthlyReportVisible, setMonthlyReportVisible] = useState(false)
    

    const calculateAllData = () =>{
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
        setPharmacyReports(filteredPharmacyReport);

        var totalSales = 0;
        for(var i = 0 ; i < filteredPharmacyReport.length ; i++){
            totalSales = totalSales + filteredPharmacyReport[i].firstSales + filteredPharmacyReport[i].secondSales;
        }
        setMonthTodateSales(totalSales)

        
        var lastSalesDateArr = lastDayOfDailyReport.split('/')

        var currentMonth = lastSalesDateArr[0];
        var currentYear = lastSalesDateArr[2];
        const longMonths = [1,3,5,7,8,10,12]
        const longYears = [2020,2024,2028,2032,2036,2040]

        var currentMonthLengthC = 30;
        if(longMonths.indexOf(currentMonth) === -1){ currentMonthLengthC = 31; setCurrentMonthLength(31);}
        else if(currentMonth === 2){
            if(longYears.indexOf(currentYear) !== -1){ currentMonthLengthC = 28; setCurrentMonthLength(28)}else{ currentMonthLengthC = 29 ; setCurrentMonthLength(29)}
        }

        setCurrentAverageDailySales( totalSales/noOfDaysOfMonthuntilNow  )
        var currentAverageDailySalesC = (totalSales/noOfDaysOfMonthuntilNow)


        setexpectedMonthSales(currentAverageDailySalesC * currentMonthLengthC)
        var expectedMonthSalesC = currentAverageDailySalesC * currentMonthLengthC

        setExpectedTargetAchievement( (expectedMonthSalesC / target )  *  100 )
        var noOfDaysRemainingtillEndMonth = currentMonthLengthC - noOfDaysOfMonthSoFar ;
        setDailySalesfor75( ((target*.75)- totalSales) / noOfDaysRemainingtillEndMonth )
        setDailySalesfor90( ((target*.9)- totalSales) / noOfDaysRemainingtillEndMonth )
        setDailySalesfor100( ((target)- totalSales) / noOfDaysRemainingtillEndMonth )  

        
    }


    useEffect(() => {
        calculateAllData();
    }, [])


    return (
        <div className='monthlyReport'>
            
            {pharmacyReports.length > 0 ?
                <div className="monthlyReport__table">
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop">Last Sales Date</div>
                        <div className="monthlyReport__tableColBottom  bold"> {lastDayOfDailyReport} </div>
                    </div>
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop smaller">Month To Date Sales </div>
                        <div className="monthlyReport__tableColBottom">{monthTodateSales? monthTodateSales.toFixed(2) : '' } </div>
                    </div>
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop smaller">Expected Total Month Sales </div>
                        <div className="monthlyReport__tableColBottom">{expectedMonthSales? expectedMonthSales.toFixed(2) : '' } </div>
                    </div>
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop">Target </div>
                        <div className="monthlyReport__tableColBottom"> {target} </div>
                    </div>
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop smaller"> Expected Target Achievement</div>
                        <div className="monthlyReport__tableColBottom"> {expectedTargetAchievement? expectedTargetAchievement.toFixed(2) : '' } %</div>
                    </div>
                    <div className="monthlyReport__tableCol">
                        <div className="monthlyReport__tableColTop smaller"> Average Daily Sales </div>
                        <div className="monthlyReport__tableColBottom"> {currentAverageDailySales? currentAverageDailySales.toFixed(2) : '' } </div>
                    </div>
                    <div className="monthlyReport__tableCol notImportant">
                        <div className="monthlyReport__tableColTop smaller"> Daily Sales to achieve 75% </div>
                        <div className="monthlyReport__tableColBottom"> {dailySalesfor75? dailySalesfor75.toFixed(2) : '' } </div>
                    </div>
                    <div className="monthlyReport__tableCol notImportant">
                        <div className="monthlyReport__tableColTop smaller"> Daily Sales to achieve 90% </div>
                        <div className="monthlyReport__tableColBottom"> {dailySalesfor90? dailySalesfor90.toFixed(2) : '' } </div>
                    </div>
                    <div className="monthlyReport__tableCol notImportant">
                        <div className="monthlyReport__tableColTop smaller"> Daily Sales to achieve 100% </div>
                        <div className="monthlyReport__tableColBottom"> {dailySalesfor100? dailySalesfor100.toFixed(2) : '' } </div>
                    </div>
                </div> :<button className="wcfc__btnSubmit"  onClick={()=>calculateAllData()}>View Pharmacy Achievement</button>}
            
                
        </div>
    )
}

export default MonthlyReport