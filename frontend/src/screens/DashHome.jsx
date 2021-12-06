import React, { useState, useEffect } from "react";
import Axios from "../store/axios.js";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import LocationHeader from "../components/LocationHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PharmacyReport from "../components/PharmacyReport";
import ChartReport from "../components/ChartReport";
import MonthlyReport from "../components/MonthlyReport";
import PieReport from "../components/PieReport";
import PieReport28 from "../components/PieReport28";
import ErrorBox from "../components/ErrorBox";
import axios from "../store/axios";
import DashSecondHeader from "../components/DashSecondHeader.jsx";
import Cookies from "js-cookie";

function DashHome() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [activePharmacy, setActivePharmacy] = useState({ id: 0, name: "", myPharmacyDailyReports: [], firstDayOfMonth: "", lastDayOfDailyReport: undefined, noOfDaysOfMonthuntilNow: 0 });
    const [numbersreportActive, setNumbersreportActive] = useState(true);
    const [chartreportActive, setChartreportActive] = useState(false);
    const [allPharmacies, setAllPharmacies] = useState([]);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState("");
    const [errorMessage, setErrorMessage ] = useState("")
    const [errorActive, setErrorActive ] = useState(false)

    const getfirstDayOfMonth = () => {
        var todayStringDateUpdated = new Date().toLocaleDateString();
        var todayStringDateUpdatedArr = todayStringDateUpdated.split("/");
        setFirstDayOfMonth(todayStringDateUpdatedArr[0] + "/1/" + todayStringDateUpdatedArr[2]);
    };

    const getDataPharmacies = () => {
        try{
        axios.get(`/api/pharmacies`).then((response) => {
            setAllPharmacies(response.data);
            console.log("allPharmacies", response.data);
        });
        } catch(response){
            setErrorMessage(response.message);
            setErrorActive(true);
            console.log('errorMessage', response);
        }
    };

    const reArrangeDailyReports = (currentPharmacy, pharmacyReports) => {
        var reArrangedPharmacyReports = [];
        for (var i = pharmacyReports.length - 1; i >= 0; i--) {
            reArrangedPharmacyReports.push(pharmacyReports[i]);
        }
        var editedCurrentPharmacy = currentPharmacy;
        editedCurrentPharmacy.myPharmacyDailyReports = reArrangedPharmacyReports;

        var todayStringDateUpdated = new Date().toLocaleDateString();
        var todayStringDateUpdatedArr = todayStringDateUpdated.split("/");
        editedCurrentPharmacy.firstDayOfMonth = todayStringDateUpdatedArr[0] + "/1/" + todayStringDateUpdatedArr[2];

        var lastDayOfDailyReportStringDateUpdated = pharmacyReports[0].day;
        var lastDayOfDailyReportStringDateUpdatedArr = lastDayOfDailyReportStringDateUpdated.split("/");
        editedCurrentPharmacy.lastDayOfDailyReport = lastDayOfDailyReportStringDateUpdatedArr[0] + "/" + lastDayOfDailyReportStringDateUpdatedArr[1] + "/" + lastDayOfDailyReportStringDateUpdatedArr[2];

        editedCurrentPharmacy.noOfDaysOfMonthuntilNow = 0;
        if (todayStringDateUpdatedArr[0] === lastDayOfDailyReportStringDateUpdatedArr[0] && todayStringDateUpdatedArr[2] === lastDayOfDailyReportStringDateUpdatedArr[2]) {
            editedCurrentPharmacy.noOfDaysOfMonthuntilNow = lastDayOfDailyReportStringDateUpdatedArr[1];
        }

        setActivePharmacy(editedCurrentPharmacy);
    };

    const getDataPharmacy = (phId, phName) => {
        axios.get(`/api/reports/pharmacyReports/${phName}`).then((response) => {
            var pharmacyReports = response.data;
            var currentPharmacy = { id: phId, phName: phName, reports: pharmacyReports };
            console.log(response.data);
            console.log(response.data.length);

            if (response.data.length > 0) {
                reArrangeDailyReports(currentPharmacy, pharmacyReports);
            } else {
                alert(`${phName} hasn't reported any sales`);
            }
        });
    };

    useEffect(() => {
        if (user.email === "") {
            history.push("/login");
        } else {
            getfirstDayOfMonth();
            getDataPharmacies();
        }
    }, []);

    return (
        <div className="dashHome">
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader />
            <LocationHeader location="DashBoard" />
            {errorActive && <ErrorBox message={errorMessage} />}


            {allPharmacies.length > 0 && (
                <>
                    {allPharmacies.map((pharmacy, index) => (
                        <div className="pageCentered__body" key={pharmacy._id}>
                            <div className="whiteCenteredFlexibleContainer">
                                <div className="wcfc__titleDiv mainDarkColor ">
                                    <div className="wcfc__title ">
                                        <span className="material-icons">local_pharmacy</span>
                                        <h3 className="wcfc__titleText">
                                            {pharmacy.pharmacyNo}-{pharmacy.pharmacyName}-{pharmacy.pharmacyAddress}
                                        </h3>
                                    </div>
                                    <div className="wcfc__btnExpand" onClick={() => getDataPharmacy(pharmacy._id, pharmacy.pharmacyName)}>
                                        <ExpandMoreIcon color="inherit" fontSize="large" />
                                    </div>
                                </div>
                                {activePharmacy.phName === `${pharmacy.pharmacyName}` && (
                                    <div className="wcfc__bodyDiv">
                                        {activePharmacy.noOfDaysOfMonthuntilNow > 0 ? (
                                            <>
                                                <MonthlyReport totalPharmacyReports={activePharmacy.myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={activePharmacy.lastDayOfDailyReport} noOfDaysOfMonthuntilNow={activePharmacy.noOfDaysOfMonthuntilNow} />
                                                <div className="pieReportDiv inline ">
                                                    <PieReport totalPharmacyReports={activePharmacy.myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={activePharmacy.lastDayOfDailyReport} noOfDaysOfMonthuntilNow={activePharmacy.noOfDaysOfMonthuntilNow} />
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        <div className="pieReportDiv inline ">
                                            <PieReport28 totalPharmacyReports={activePharmacy.myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={activePharmacy.lastDayOfDailyReport} noOfDaysOfMonthuntilNow={activePharmacy.noOfDaysOfMonthuntilNow} />
                                        </div>
                                        <div className="pharmacyReportType" dir="rtl">
                                            <button className="wcfc__btnSubmit" onClick={() => setNumbersreportActive(!numbersreportActive)}>
                                                {numbersreportActive ? "View Charted Report" : "View Detailed Report"}
                                            </button>
                                        </div>
                                        {numbersreportActive ? <PharmacyReport pharmacyReports={activePharmacy.myPharmacyDailyReports} /> : <ChartReport totalPharmacyReports={activePharmacy.myPharmacyDailyReports} firstDayOfMonth={firstDayOfMonth} lastDayOfDailyReport={activePharmacy.lastDayOfDailyReport} noOfDaysOfMonthuntilNow={activePharmacy.noOfDaysOfMonthuntilNow} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default DashHome;

/*


    const getDataPharmacy = async (phId, phName)=>{
        firebase.firestore().collection(phName)
        .orderBy('dayTimeStamp', 'desc')
        .onSnapshot( snapshot => {
            var pharmacyReports = await snapshot.docs.map(doc=>({ id: doc.id, data: doc.data() }))

            var currentPharmacy = {id: phId, name:phName, reports: pharmacyReports }
             
            reArrangeDailyReports(currentPharmacy, pharmacyReports)
            },
            error => {
                console.log(error)
            }
        ) 
    }


*/
