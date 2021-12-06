import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MainHeader from "../components/MainHeader";
import SecondHeader from "../components/SecondHeader";
import LocationHeader from "../components/LocationHeader";
import ProfileOverView from "../components/ProfileOverView";
import EmergencyContactInfo from "../components/EmergencyContactInfo";
import { Link, useHistory } from "react-router-dom";
import axios from '../store/axios';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PharmacyReport from "../components/PharmacyReport";
import ChartReport from "../components/ChartReport";
import MonthlyReport from "../components/MonthlyReport";
import PieReport from "../components/PieReport";
import PieReport28 from "../components/PieReport28";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";



function Home() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [activePharmacy, setActivePharmacy] = useState(false);
    const [numbersreportActive, setNumbersreportActive] = useState(true);
    const [myPharmacyDailyReports, setMyPharmacyDailyReports] = useState([]);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState("");
    const [lastDayOfDailyReport, setLastDayOfDailyReport] = useState(undefined);
    const [dataGotFiltered, setDataGotFiltered] = useState(true);
    const [noOfDaysOfMonthuntilNow, setNoOfDaysOfMonthuntilNow] = useState(0);

    const getfirstDayOfMonth = () => {
        var todayStringDateUpdated = new Date().toLocaleDateString();
        var todayStringDateUpdatedArr = todayStringDateUpdated.split("/");
        setFirstDayOfMonth(todayStringDateUpdatedArr[0] + "/1/" + todayStringDateUpdatedArr[2]);
    };


    const getLastDayOfDailyReport = (myPharmacyDailyReportsC) => {
        var todayStringDateUpdated = new Date().toLocaleDateString();
        var todayStringDateUpdatedArr = todayStringDateUpdated.split("/");

        var lastDayOfDailyReportStringDateUpdated = myPharmacyDailyReportsC[0].day;
        var lastDayOfDailyReportStringDateUpdatedArr = lastDayOfDailyReportStringDateUpdated.split("/");
        setLastDayOfDailyReport(lastDayOfDailyReportStringDateUpdatedArr[0] + "/" + lastDayOfDailyReportStringDateUpdatedArr[1] + "/" + lastDayOfDailyReportStringDateUpdatedArr[2]);
        console.log( 'lastDayOfDailyReport', lastDayOfDailyReportStringDateUpdatedArr[0] + "/" + lastDayOfDailyReportStringDateUpdatedArr[1] + "/" + lastDayOfDailyReportStringDateUpdatedArr[2]);
        if (todayStringDateUpdatedArr[0] === lastDayOfDailyReportStringDateUpdatedArr[0] && todayStringDateUpdatedArr[2] === lastDayOfDailyReportStringDateUpdatedArr[2]) {
            setNoOfDaysOfMonthuntilNow(lastDayOfDailyReportStringDateUpdatedArr[1]);
            console.log( 'noOfDaysOfMonthuntilNow', lastDayOfDailyReportStringDateUpdatedArr[1]);
        }

    };

    const reArrangeDailyReports = (myPharmacyDailyReportsC) => {
        var reArrangedPharmacyDailyReports = [];
        for (var i = myPharmacyDailyReportsC.length - 1; i >= 0; i--) {
            reArrangedPharmacyDailyReports.push(myPharmacyDailyReportsC[i]);
        }
        setMyPharmacyDailyReports(reArrangedPharmacyDailyReports);
        console.log('reArrangedPharmacyDailyReports', reArrangedPharmacyDailyReports)
    };

    const getMyPharmacyData = () =>{
        axios.get(`/api/reports/pharmacyReports/${user.currentPharmacy}`).then((response) => {
            var myPharmacyDailyReportsC = response.data;
            console.log("got Data");
            console.log(myPharmacyDailyReportsC);

            if (myPharmacyDailyReportsC.length > 0) {
                getLastDayOfDailyReport(myPharmacyDailyReportsC);
                reArrangeDailyReports(myPharmacyDailyReportsC);
            }
        });
    }


    const handleActivatePharmacy = () => {
        if (user.currentPharmacy !== "") {
            if (activePharmacy) {
                setActivePharmacy(false);
            } else {
                if (myPharmacyDailyReports.length === 0) {
                    getfirstDayOfMonth();
                    getMyPharmacyData();
                } else {
                    setActivePharmacy(true);
                }
            }
        }
    };

    useEffect(() => {
        if(user.email === ''){
            history.push('/login')
        } else {
            getfirstDayOfMonth();
        }
        if (user.currentPharmacy !== "") {
            handleActivatePharmacy();
        }
    }, [user]);

    useEffect(() => {
        if (myPharmacyDailyReports.length > 0) {
            setActivePharmacy(true);
        }
    }, [myPharmacyDailyReports]);


    

    return (
        <div className="home">
            {user.email === "" ? (
                <></>
            ) : (
                <>
                    <MainHeader />
                    <SecondHeader />
                    <LocationHeader location="Home" />

                     

                    {myPharmacyDailyReports.length > 0 ? (
                        <div className="homeContainer__firstResponsive">
                            <div className="pageCentered__body">
                                <div className="whiteCenteredFlexibleContainer">
                                    <div className="wcfc__titleDiv mainDarkColor ">
                                        <div className="wcfc__title ">
                                            <span className="material-icons">local_pharmacy</span>
                                            <h3 className="wcfc__titleText">
                                                {user.currentPharmacy}
                                            </h3>
                                        </div>
                                        <div className="wcfc__btnExpand" onClick={() => handleActivatePharmacy()}>
                                            <ExpandMoreIcon color="inherit" fontSize="large" />
                                        </div>
                                    </div>
                                    {activePharmacy ? (
                                        <div className="wcfc__bodyDiv">
                                            {noOfDaysOfMonthuntilNow > 0 ? (
                                                <>
                                                    <MonthlyReport totalPharmacyReports={myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={lastDayOfDailyReport} noOfDaysOfMonthuntilNow={noOfDaysOfMonthuntilNow} />
                                                    <div className="pieReportDiv inline ">
                                                        <PieReport totalPharmacyReports={myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={lastDayOfDailyReport} noOfDaysOfMonthuntilNow={noOfDaysOfMonthuntilNow} />
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            <div className="pieReportDiv inline ">
                                                <PieReport28 totalPharmacyReports={myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={lastDayOfDailyReport} noOfDaysOfMonthuntilNow={noOfDaysOfMonthuntilNow} />
                                            </div>
                                            <div className="pharmacyReportType" dir="rtl">
                                                <button className="wcfc__btnSubmit" onClick={() => setNumbersreportActive(!numbersreportActive)}>
                                                    {numbersreportActive ? "View Charted Report" : "View Detailed Report"}
                                                </button>
                                            </div>

                                            {numbersreportActive ? <PharmacyReport pharmacyReports={myPharmacyDailyReports} /> : <ChartReport totalPharmacyReports={myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={lastDayOfDailyReport} noOfDaysOfMonthuntilNow={noOfDaysOfMonthuntilNow} />}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}


                    

                    <div className="homeContainer__firstResponsive">
                        <div className="homeContainer__ResponsiveComponent">
                            <ProfileOverView />
                        </div>
                        <div className="homeContainer__ResponsiveComponent">
                            <EmergencyContactInfo />
                        </div>
                    </div>
                </>
            )}

            
        </div>
    );
}

export default Home;
