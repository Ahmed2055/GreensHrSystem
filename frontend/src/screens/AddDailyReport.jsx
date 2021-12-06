import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MainHeader from "../components/MainHeader";
import SecondHeader from "../components/SecondHeader";
import LocationHeader from "../components/LocationHeader";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "../store/axios";

function AddDailyReport() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [sales, setSales] = useState(0);
    const [remarks, setRemarks] = useState(``);
    const [reportDate, setReportDate] = useState(new Date());
    const [dayType, setDayType] = useState("single");
    const [shiftType, setShiftType] = useState("morning");

    useEffect(() => {}, [dayType, shiftType]);

    const handleDailyReport = (e) => {
        e.preventDefault();
        var reportsOntheSameDay = [];
        var reportOntheSameDay = {};
        var editedDailyReport = {};
        let parameters = { reportDate: new Date(reportDate).toLocaleDateString() , pharmacyName: user.currentPharmacy }

        axios.get(`/api/reports/pharmacyReportsDay/${user.currentPharmacy}` , { params:  parameters} ).then((response) => {
            console.log(response.data);
            response.data.forEach((doc) => {
                reportsOntheSameDay.push(doc);
            });

            if (reportsOntheSameDay.length === 1) {
                reportOntheSameDay = reportsOntheSameDay[0];
                console.log("reportsOntheSameDay => 1", reportOntheSameDay);
                if (dayType === "single") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName: reportOntheSameDay.pharmacyName,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName,
                        firstRemarks: remarks,
                        firstShiftEnd: new Date().toLocaleString(),
                        secondSales: 0,
                        secondPharmacist: "",
                        secondRemarks: "",
                        secondShiftEnd: "",
                    };
                } else if (dayType === "double" && shiftType === "morning") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName: reportOntheSameDay.pharmacyName,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName,
                        firstRemarks: remarks,
                        firstShiftEnd: new Date().toLocaleString(),
                        secondSales: reportOntheSameDay.secondSales,
                        secondPharmacist: reportOntheSameDay.secondPharmacist,
                        secondRemarks: reportOntheSameDay.secondRemarks,
                        secondShiftEnd: reportOntheSameDay.secondShiftEnd,
                    };
                } else if (dayType === "double" && shiftType === "night") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName: reportOntheSameDay.pharmacyName,
                        firstSales: reportOntheSameDay.firstSales,
                        firstPharmacist: reportOntheSameDay.firstPharmacist,
                        firstRemarks: reportOntheSameDay.firstRemarks,
                        firstShiftEnd: reportOntheSameDay.firstShiftEnd,
                        secondSales: parseFloat(sales),
                        secondPharmacist: user.shortestName,
                        secondRemarks: remarks,
                        secondShiftEnd: new Date().toLocaleString(),
                    };
                }
                console.log("edit the report", editedDailyReport);

                axios.post(`/api/reports/editAReport/${reportOntheSameDay._id}`, editedDailyReport ).then((response) => { console.log(response) });

            } else if (reportsOntheSameDay.length === 0) {
                console.log("reportsOntheSameDay => 0");

                if (dayType === "single") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName: user.currentPharmacy,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName,
                        firstRemarks: remarks,
                        firstShiftEnd: new Date().toLocaleString(),
                        secondSales: 0,
                        secondPharmacist: "",
                        secondRemarks: "",
                        secondShiftEnd: "",
                    };
                } else if (dayType === "double" && shiftType === "morning") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName: user.currentPharmacy,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName,
                        firstRemarks: remarks,
                        firstShiftEnd: new Date().toLocaleString(),
                        secondSales: 0,
                        secondPharmacist: "",
                        secondRemarks: "",
                        secondShiftEnd: "",
                    };
                } else if (dayType === "double" && shiftType === "night") {
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString(),
                        dayTimeStamp: reportDate,
                        pharmacyName:user.currentPharmacy,
                        firstSales: 0,
                        firstPharmacist: "",
                        firstRemarks: "",
                        firstShiftEnd: "",
                        secondSales: parseFloat(sales),
                        secondPharmacist: user.shortestName,
                        secondRemarks: remarks,
                        secondShiftEnd: new Date().toLocaleString(),
                    };
                }
                axios.post("/api/reports/addAReport", editedDailyReport).then((response) => { console.log(response.data);   });
            } else {
                console.log("the number of reports on that day are more than one", reportsOntheSameDay);
            }
             history.push('/')
        }).catch(error => {
            console.log(error)
          });

        /*

        firebase.firestore().collection(user.currentPharmacy).where("day", "==", reportDate.toLocaleDateString())
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                reportsOntheSameDay.push({id:doc.id,data:doc.data()})
                
            });
            if(reportsOntheSameDay.length === 1){
                reportOntheSameDay=reportsOntheSameDay[0]
                console.log('reportsOntheSameDay => 1')
                if(dayType==='single'){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName , 
                        firstRemarks: remarks, 
                        firstShiftEnd: new Date().toLocaleString() , 
                        secondSales:0 , 
                        secondPharmacist:'', 
                        secondRemarks:'', 
                        secondShiftEnd:''}
                }
                else if(dayType==='double'  && shiftType==='morning' ){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName , 
                        firstRemarks: remarks, 
                        firstShiftEnd: new Date().toLocaleString() , 
                        secondSales: reportOntheSameDay.data.secondSales , 
                        secondPharmacist:reportOntheSameDay.data.secondPharmacist , 
                        secondRemarks:reportOntheSameDay.data.secondRemarks , 
                        secondShiftEnd:reportOntheSameDay.data.secondShiftEnd }
                }
                else if(dayType==='double'  && shiftType==='night' ){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: reportOntheSameDay.data.firstSales ,
                        firstPharmacist: reportOntheSameDay.data.firstPharmacist  , 
                        firstRemarks: reportOntheSameDay.data.firstRemarks , 
                        firstShiftEnd: reportOntheSameDay.data.firstShiftEnd , 
                        secondSales: parseFloat(sales) , 
                        secondPharmacist: user.shortestName , 
                        secondRemarks: remarks , 
                        secondShiftEnd: new Date().toLocaleString() }
                }
                firebase.firestore().collection(user.currentPharmacy).doc(reportOntheSameDay.id).set(editedDailyReport).then(function() {alert("Report successfully edited!"); console.log(editedDailyReport);}).catch(function(error) {console.error("Error writing document: ", error); }); 

            } else if(reportsOntheSameDay.length === 0){
                console.log('reportsOntheSameDay => 0')

                if(dayType==='single'){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName , 
                        firstRemarks: remarks, 
                        firstShiftEnd: new Date().toLocaleString() , 
                        secondSales:0 , 
                        secondPharmacist:'', 
                        secondRemarks:'', 
                        secondShiftEnd:''}
                }
                else if(dayType==='double'  && shiftType==='morning' ){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: parseFloat(sales),
                        firstPharmacist: user.shortestName , 
                        firstRemarks: remarks, 
                        firstShiftEnd: new Date().toLocaleString() , 
                        secondSales:0 , 
                        secondPharmacist:'', 
                        secondRemarks:'', 
                        secondShiftEnd:''}
                }
                else if(dayType==='double'  && shiftType==='night' ){
                    editedDailyReport = {
                        dayType: dayType,
                        day: reportDate.toLocaleDateString() ,
                        dayTimeStamp: reportDate,
                        firstSales: 0,
                        firstPharmacist: '' , 
                        firstRemarks: '', 
                        firstShiftEnd: '', 
                        secondSales: parseFloat(sales) , 
                        secondPharmacist: user.shortestName , 
                        secondRemarks: remarks , 
                        secondShiftEnd: new Date().toLocaleString() }
                }
                firebase.firestore().collection(user.currentPharmacy).add(editedDailyReport).then(_doc => { alert('Report successfully sent'); console.log(editedDailyReport); }).catch((error) => { alert(error) });

            } else {console.log('the number of reports on that day are more than one', reportsOntheSameDay )}
            history.push('/home')
            
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

         */
    };

    const handleSales = (e) => {
        e.preventDefault();
        setSales(e.target.value);
        if (e.target.value === "") {
            setSales("0");
        }
    };

    return (
        <div className="addDailyReport">
            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title ">
                            <span className="material-icons">post_add</span>
                            <h3 className="wcfc__titleText">New Report</h3>
                        </div>
                        <div className="wcfc__btnExpand">
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>

                    <div className="wcfc__bodyDiv adr__mainContent">
                        <div className="addDailyReport__line">
                            <span className="addDailyReport__lineTitle">Current Pharmacy:</span>
                            <span className="addDailyReport__lineData adr__span">{user.currentPharmacy}</span>
                        </div>
                        <div className="addDailyReport__line">
                            <span className="addDailyReport__lineTitle">Report Date:</span>
                            <div className="addDailyReport__lineData  adr__selector">
                                <DatePicker selected={reportDate} onChange={(date) => setReportDate(date)} />
                            </div>
                        </div>
                        <div className="addDailyReport__line">
                            <span className="addDailyReport__lineTitle">Day Type:</span>
                            <select className="addDailyReport__lineData adr__selector" name="DayType" value={dayType} onChange={(e) => setDayType(e.target.value)}>
                                <option value="single">Single Shift</option>
                                <option value="double">Double Shift</option>
                            </select>
                        </div>
                        {dayType === "single" ? (
                            ""
                        ) : (
                            <div className="addDailyReport__line">
                                <span className="addDailyReport__lineTitle">Shift Type:</span>
                                <select className="addDailyReport__lineData adr__selector" name="ShiftType" value={shiftType} onChange={(e) => setShiftType(e.target.value)}>
                                    <option value="morning">Morning Shift</option>
                                    <option value="night">Night Shift</option>
                                </select>
                            </div>
                        )}
                        <div className="addDailyReport__line">
                            <span className="addDailyReport__lineTitle"></span>
                            <span className="addDailyReport__lineData"></span>
                        </div>
                        {dayType === "double" ? (
                            <>
                                <div className="whiteCenteredFlexibleContainer">
                                    <div className="wcfc__titleDiv yellow">
                                        <div className="wcfc__title ">
                                            <span className="material-icons">light_mode</span>
                                            <h3 className="wcfc__titleText">Morning Shift</h3>
                                        </div>
                                        <div className="wcfc__btnExpand">
                                            <ExpandMoreIcon color="inherit" fontSize="large" />
                                        </div>
                                    </div>
                                    {shiftType === "morning" ? (
                                        <div className="wcfc__bodyDiv adr__mainContent">
                                            <div className="addDailyReport__line">
                                                <span className="addDailyReport__lineTitle">Sales</span>
                                                <input className="addDailyReport__lineData" value={sales} onChange={(e) => handleSales(e)} />
                                            </div>
                                            <div className="addDailyReport__line">
                                                <span className="addDailyReport__lineTitle ">Remarks</span>
                                                <input className="addDailyReport__lineData adr__remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                            </div>
                                            <div className="addDailyReport__divBtn">
                                                <button className="wcfc__btnSubmit" onClick={(e) => handleDailyReport(e)}>
                                                    Send Report
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className="whiteCenteredFlexibleContainer">
                                    <div className="wcfc__titleDiv darkBlue">
                                        <div className="wcfc__title ">
                                            <span className="material-icons">dark_mode</span>
                                            <h3 className="wcfc__titleText">Night Shift</h3>
                                        </div>
                                        <div className="wcfc__btnExpand">
                                            <ExpandMoreIcon color="inherit" fontSize="large" />
                                        </div>
                                    </div>
                                    {shiftType === "night" ? (
                                        <div className="wcfc__bodyDiv adr__mainContent">
                                            <div className="addDailyReport__line">
                                                <span className="addDailyReport__lineTitle">Sales</span>
                                                <input className="addDailyReport__lineData" value={sales} onChange={(e) => handleSales(e)} />
                                            </div>
                                            <div className="addDailyReport__line">
                                                <span className="addDailyReport__lineTitle ">Remarks</span>
                                                <input className="addDailyReport__lineData adr__remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                            </div>
                                            <div className="addDailyReport__divBtn">
                                                <button className="wcfc__btnSubmit" onClick={(e) => handleDailyReport(e)}>
                                                    Send Report
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        {dayType === "single" ? (
                            <div className="whiteCenteredFlexibleContainer">
                                <div className="wcfc__titleDiv ">
                                    <div className="wcfc__title ">
                                        <span className="material-icons yellow">light_mode</span>
                                        <span className="material-icons darkBlue">dark_mode</span>
                                        <h3 className="wcfc__titleText">Single Shift</h3>
                                    </div>
                                    <div className="wcfc__btnExpand">
                                        <ExpandMoreIcon color="inherit" fontSize="large" />
                                    </div>
                                </div>
                                <div className="wcfc__bodyDiv adr__mainContent">
                                    <div className="addDailyReport__line">
                                        <span className="addDailyReport__lineTitle">Sales</span>
                                        <input className="addDailyReport__lineData" value={sales} onChange={(e) => handleSales(e)} />
                                    </div>
                                    <div className="addDailyReport__line">
                                        <span className="addDailyReport__lineTitle ">Remarks</span>
                                        <input className="addDailyReport__lineData adr__remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                    </div>
                                    <div className="addDailyReport__divBtn">
                                        <button className="wcfc__btnSubmit" onClick={(e) => handleDailyReport(e)}>
                                            Send Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDailyReport;
