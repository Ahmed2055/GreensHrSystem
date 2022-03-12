import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useHistory, useRouteMatch } from "react-router-dom";
import DashSecondHeader from "../components/DashSecondHeader";
import LocationHeader from "../components/LocationHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import axios from "../store/axios";

function DashVisitAdd() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [evaluatedPharmacy, setevaluatedPharmacy] = useState("P2001");
    const [currentPharmacistId, setcurrentPharmacistId] = useState("614f0265fe1ebe62d50fb67b");
    const [otherPharmacistId, setotherPharmacistId] = useState("");
    const [pharmacyHygienicMeasures, setpharmacyHygienicMeasures] = useState({ grade: 1, remarks: "" });
    const [counterHygienicMeasures, setcounterHygienicMeasures] = useState({ grade: 1, remarks: "" });
    const [pricing, setpricing] = useState({ grade: 1, remarks: "" });
    const [temperatureRegistration, settemperatureRegistration] = useState({ grade: 1, remarks: "" });
    const [merchandizing, setmerchandizing] = useState({ grade: 1, remarks: "" });
    const [offersDisplay, setoffersDisplay] = useState({ grade: 1, remarks: "" });
    const [officialDocumentsOrganized, setofficialDocumentsOrganized] = useState({ grade: 1, remarks: "" });
    const [availabiltyFollowUp, setavailabiltyFollowUp] = useState({ grade: 1, remarks: "" });
    const [expiryFollowUp, setexpiryFollowUp] = useState({ grade: 1, remarks: "" });
    const [randomStockTake, setrandomStockTake] = useState({ grade: 1, remarks: "" });

    const [personalHygienicMeasures, setpersonalHygienicMeasures] = useState({ grade: 1, remarks: "" });
    const [formalWear, setformalWear] = useState({ grade: 1, remarks: "" });
    const [dataAwareness, setdataAwareness] = useState({ grade: 1, remarks: "" });
    const [communicationSkills, setcommunicationSkills] = useState({ grade: 1, remarks: "" });
    const [CustomerService, setCustomerService] = useState({ grade: 1, remarks: "" });

    const [standardPersonalGrade, setstandardPersonalGrade] = useState({ grade: 6, remarks: "" });

    const [generalRemarks, setgeneralRemarks] = useState();

    const [allPharmacies, setAllPharmacies] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);

    useEffect(() => {
        axios.get("/api/users/").then((response) => {
            setAllEmployees(response.data);
            console.log("allEmployees", response.data);
        });
        axios.get(`/api/pharmacies`).then((response) => {
            setAllPharmacies(response.data);
            console.log("allPharmacies", response.data);
        });
    }, []);

    const handleAddingNewVisit = () => {
        if(currentPharmacistId === otherPharmacistId ){ alert("The current and the other working pharmacists can't be the same person"); return;}
        const newVisit1 = {
            evaluatingManager:user._id,
            evaluatedPharmacy,
            evaluatedPharmacistId : currentPharmacistId,
            evaluationType : 'inPrescence',
            pharmacyHygienicMeasures, counterHygienicMeasures, pricing, temperatureRegistration, merchandizing, offersDisplay, 
            officialDocumentsOrganized, availabiltyFollowUp, expiryFollowUp, randomStockTake,
            personalHygienicMeasures, formalWear, dataAwareness, communicationSkills, CustomerService, generalRemarks
        };
        const newVisit2 = {
            evaluatingManager:user._id,
            evaluatedPharmacy,
            evaluatedPharmacistId : otherPharmacistId,
            evaluationType : 'inAbscence',
            pharmacyHygienicMeasures, counterHygienicMeasures, pricing, temperatureRegistration, merchandizing, offersDisplay, 
            officialDocumentsOrganized, availabiltyFollowUp, expiryFollowUp, randomStockTake,
            personalHygienicMeasures:standardPersonalGrade, formalWear:standardPersonalGrade, dataAwareness:standardPersonalGrade, communicationSkills:standardPersonalGrade, CustomerService:standardPersonalGrade, generalRemarks
        };
        console.log(newVisit1);
        console.log(newVisit2);

        axios.post("api/visits/addAVisit", newVisit1).then((response) => {
            console.log(response);
            if(newVisit2.evaluatedPharmacistId === ''){
                alert(" New Visit Added")
                history.push('/');
            } else {
                axios.post("api/visits/addAVisit", newVisit2).then((response) => {
                    console.log(response);
                    alert(" New Visit Added")
                    history.push('/');
                }).catch(error => {
                    console.log(error);
                  });
            }
        }).catch(error => {
            console.log(error);
          });;
    };

    return (
        <div className="dashVisitAdd dashHome">
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader />
            <LocationHeader location="New Visit" />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title ">
                            <span className="material-icons">
                                <ManageAccountsIcon />
                            </span>
                            <h3 className="wcfc__titleText">Adding New Visit</h3>
                        </div>
                        <div className="wcfc__btnExpand">
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    <div className="wcfc__bodyDiv">
                        <div className="dashVisitAdd__names">
                            <div className="dashVisitAdd__nameLine">
                                <p className="dvaN__title">Choose Current Pharmacy</p>
                                <select className="dvaN__name" name="leaveTypes" value={evaluatedPharmacy} onChange={(e) => setevaluatedPharmacy(e.target.value)}>
                                    {allPharmacies.map((pharmacy, index) => (
                                        <option key={index} value={pharmacy.pharmacyName}>
                                            {pharmacy.pharmacyName}
                                        </option>
                                    ))}
                                    <option value="P2024">P2024</option>
                                    <option value="P2023">P2023</option>
                                    <option value="P2026">P2026</option>
                                </select>
                            </div>
                            <div className="dashVisitAdd__nameLine">
                                <p className="dvaN__title">Choose Current Working Pharmacist</p>
                                <select className="dvaN__name" name="leaveTypes" value={currentPharmacistId} onChange={(e) => setcurrentPharmacistId(e.target.value)}>
                                    {allEmployees.map((employee, index) => (
                                        <option key={index} value={employee._id}>
                                            {employee.shortestName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="dashVisitAdd__nameLine">
                                <p className="dvaN__title"> Other Working Pharmacist (Optional)</p>
                                <select className="dvaN__name" name="leaveTypes" value={otherPharmacistId} onChange={(e) => setotherPharmacistId(e.target.value)}>
                                    {allEmployees.map((employee, index) => (
                                        <option key={index} value={employee._id}>
                                            {employee.shortestName}
                                        </option>
                                    ))}
                                    <option value="">-- -- -- -- -- --</option>
                                </select>
                            </div>
                        </div>
                        <div className="dashVisitAdd__pharmacyStandards">
                            <h3 className="dashVisitAdd__standardsTitle pharmacy">Pharmacy Evaluation</h3>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Pharmacy Hygienic measures</p>
                                <select className="dvaS__detail" name="leaveTypes" value={pharmacyHygienicMeasures.grade} onChange={(e) => setpharmacyHygienicMeasures({ grade: parseInt(e.target.value) , remarks: pharmacyHygienicMeasures.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={pharmacyHygienicMeasures.remarks} onChange={(e) => setpharmacyHygienicMeasures({ grade: pharmacyHygienicMeasures.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Counter Hygienic measures</p>
                                <select className="dvaS__detail" name="leaveTypes" value={counterHygienicMeasures.grade} onChange={(e) => setcounterHygienicMeasures({ grade: parseInt(e.target.value) , remarks: counterHygienicMeasures.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={counterHygienicMeasures.remarks} onChange={(e) => setcounterHygienicMeasures({ grade: counterHygienicMeasures.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Pricing</p>
                                <select className="dvaS__detail" name="leaveTypes" value={pricing.grade} onChange={(e) => setpricing({ grade: parseInt(e.target.value) , remarks: pricing.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={pricing.remarks} onChange={(e) => setpricing({ grade: pricing.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Temperature Registeration</p>
                                <select className="dvaS__detail" name="leaveTypes" value={temperatureRegistration.grade} onChange={(e) => settemperatureRegistration({ grade: parseInt(e.target.value) , remarks: temperatureRegistration.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={temperatureRegistration.remarks} onChange={(e) => settemperatureRegistration({ grade: temperatureRegistration.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Merchandising</p>
                                <select className="dvaS__detail" name="leaveTypes" value={merchandizing.grade} onChange={(e) => setmerchandizing({ grade: parseInt(e.target.value) , remarks: merchandizing.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={merchandizing.remarks} onChange={(e) => setmerchandizing({ grade: merchandizing.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Offers Display</p>
                                <select className="dvaS__detail" name="leaveTypes" value={offersDisplay.grade} onChange={(e) => setoffersDisplay({ grade: parseInt(e.target.value) , remarks: offersDisplay.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={offersDisplay.remarks} onChange={(e) => setoffersDisplay({ grade: offersDisplay.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Official Documents Organized</p>
                                <select className="dvaS__detail" name="leaveTypes" value={officialDocumentsOrganized.grade} onChange={(e) => setofficialDocumentsOrganized({ grade: parseInt(e.target.value) , remarks: officialDocumentsOrganized.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={officialDocumentsOrganized.remarks} onChange={(e) => setofficialDocumentsOrganized({ grade: officialDocumentsOrganized.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Availability Follow up</p>
                                <select className="dvaS__detail" name="leaveTypes" value={availabiltyFollowUp.grade} onChange={(e) => setavailabiltyFollowUp({ grade: parseInt(e.target.value) , remarks: availabiltyFollowUp.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={availabiltyFollowUp.remarks} onChange={(e) => setavailabiltyFollowUp({ grade: availabiltyFollowUp.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Expiry/Slow-moving Follow Up</p>
                                <select className="dvaS__detail" name="leaveTypes" value={expiryFollowUp.grade} onChange={(e) => setexpiryFollowUp({ grade: parseInt(e.target.value) , remarks: expiryFollowUp.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={expiryFollowUp.remarks} onChange={(e) => setexpiryFollowUp({ grade: expiryFollowUp.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Random Stock Take</p>
                                <select className="dvaS__detail" name="leaveTypes" value={randomStockTake.grade} onChange={(e) => setrandomStockTake({ grade: parseInt(e.target.value) , remarks: randomStockTake.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={randomStockTake.remarks} onChange={(e) => setrandomStockTake({ grade: randomStockTake.grade, remarks: e.target.value })} />
                            </div>
                            <p className="dashVisitAdd__standardsRemark">The above standards are being evaluated to all pharmacy Members</p>
                        </div>
                        <div className="dashVisitAdd__personalStandards">
                            <h3 className="dashVisitAdd__standardsTitle personal">Pharmacist Evaluation</h3>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Personal Hygienic measures</p>
                                <select className="dvaS__detail" name="leaveTypes" value={personalHygienicMeasures.grade} onChange={(e) => setpersonalHygienicMeasures({ grade: parseInt(e.target.value) , remarks: personalHygienicMeasures.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={personalHygienicMeasures.remarks} onChange={(e) => setpersonalHygienicMeasures({ grade: personalHygienicMeasures.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Formal wear</p>
                                <select className="dvaS__detail" name="leaveTypes" value={formalWear.grade} onChange={(e) => setformalWear({ grade: parseInt(e.target.value) , remarks: formalWear.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={formalWear.remarks} onChange={(e) => setformalWear({ grade: formalWear.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Data Awareness</p>
                                <select className="dvaS__detail" name="leaveTypes" value={dataAwareness.grade} onChange={(e) => setdataAwareness({ grade: parseInt(e.target.value) , remarks: dataAwareness.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={dataAwareness.remarks} onChange={(e) => setdataAwareness({ grade: dataAwareness.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Communication Skills</p>
                                <select className="dvaS__detail" name="leaveTypes" value={communicationSkills.grade} onChange={(e) => setcommunicationSkills({ grade: parseInt(e.target.value) , remarks: communicationSkills.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={communicationSkills.remarks} onChange={(e) => setcommunicationSkills({ grade: communicationSkills.grade, remarks: e.target.value })} />
                            </div>
                            <div className="dashVisitAdd__standard">
                                <p className="dvaS__title">Customer Service</p>
                                <select className="dvaS__detail" name="leaveTypes" value={CustomerService.grade} onChange={(e) => setCustomerService({ grade: parseInt(e.target.value) , remarks: CustomerService.remarks })}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                </select>
                                <input type="text" className="dvaS__notes" placeholder="Remarks" value={CustomerService.remarks} onChange={(e) => setCustomerService({ grade: CustomerService.grade, remarks: e.target.value })} />
                            </div>
                        </div>
                        <div className="dashVisitAdd__names">
                            <div className="dashVisitAdd__nameLine">
                                <p className="dvaN__title">General Remarks</p>
                                <input type="text" className="dvaN__name generalRemarksInput" placeholder="General Remarks regarding the Pharmacy" value={generalRemarks} onChange={(e) => setgeneralRemarks(e.target.value )} />
                            </div>

                        </div>
                        <div className="dashVisitAdd__btnDiv">
                            <button className="wcfc__btnSubmit" onClick={() => handleAddingNewVisit()}>
                                Add A New Visit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashVisitAdd;
