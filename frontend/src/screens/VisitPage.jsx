import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useHistory, useRouteMatch } from "react-router-dom";
import DashSecondHeader from "../components/DashSecondHeader";
import LocationHeader from "../components/LocationHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "../store/axios";

const assumedVisit = {
    _id: "",
    evaluatingManager: "",
    evaluatedPharmacy: "P",
    evaluatedPharmacistId: "",
    evaluationType: "",
    pharmacyHygienicMeasures: { grade: 1, remarks: "No Remarks" },
    counterHygienicMeasures: { grade: 1, remarks: "" },
    pricing: { grade: 1, remarks: "" },
    temperatureRegistration: { grade: 1, remarks: "" },
    merchandizing: { grade: 1, remarks: "" },
    offersDisplay: { grade: 1, remarks: "" },
    officialDocumentsOrganized: { grade: 1, remarks: "" },
    availabiltyFollowUp: { grade: 1, remarks: "Needs Focus" },
    expiryFollowUp: { grade: 1, remarks: "" },
    randomStockTake: { grade: 1, remarks: "" },
    personalHygienicMeasures: { grade: 1, remarks: "No Remarks" },
    formalWear: { grade: 1, remarks: "" },
    dataAwareness: { grade: 1, remarks: "" },
    communicationSkills: { grade: 1, remarks: "" },
    CustomerService: { grade: 1, remarks: "" },
    createdAt: new Date(),
    updatedAt: new Date(),
    evaluatedPharmacistName: "",
    evaluatingManagerName: "",
};


function VisitPage() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();
    let match = useRouteMatch();

    const [visit, setVisit] = useState(assumedVisit);
    const [totalGrade, settotalGrade] = useState(0);

    const getVisitsData = () => {
        axios.get(`/api/visits/visitDetails/${match.params.visitId}`).then((response) => {
            console.log(response.data);
            setVisit(response.data);
        });
    };

    useEffect(() => {
        if (!visit._id) {
            getVisitsData();
        }
    }, []);

    useEffect(()=>{
        settotalGrade(visit.pharmacyHygienicMeasures.grade + visit.counterHygienicMeasures.grade + visit.pricing.grade + visit.temperatureRegistration.grade + visit.merchandizing.grade + visit.offersDisplay.grade + visit.officialDocumentsOrganized.grade + visit.availabiltyFollowUp.grade + visit.expiryFollowUp.grade + visit.randomStockTake.grade + visit.personalHygienicMeasures.grade + visit.formalWear.grade + visit.dataAwareness.grade + visit.communicationSkills.grade + visit.CustomerService.grade)
    },[visit])

    return (
        <div className="visitPage">
            <div className="dashHome__mainHeader">Dashboard</div>
            <DashSecondHeader />
            <LocationHeader location="Visit Details" />
            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title ">
                            <span className="material-icons">
                                <AssignmentIcon />
                            </span>
                            <h3 className="wcfc__titleText">Visit Details ( {visit.evaluationType} Evaluation )</h3>
                        </div>
                        <div className="wcfc__btnExpand">
                            <ExpandMoreIcon color="inherit" fontSize="large" onClick={() => console.log(visit)} />
                        </div>
                    </div>
                    <div className="wcfc__bodyDiv">
                        <div className="visitPage__details">
                            <div className="visitPage__detail">
                                <p className="visitPage__title"> Supervisor</p>
                                <span className="visitPage__data">{visit.evaluatingManagerName}</span>
                            </div>
                            <div className="visitPage__detail">
                                <p className="visitPage__title">Pharmacy</p>
                                <span className="visitPage__data">{visit.evaluatedPharmacy}</span>
                            </div>
                            <div className="visitPage__detail">
                                <p className="visitPage__title">Evaluated Pharmacist</p>
                                <span className="visitPage__data">{visit.evaluatedPharmacistName}</span>
                            </div>
                        </div>
                        <div className="visitPage__standards">
                            <div className="visitPage__standardsPharmacy">
                                <table className="vpTable">
                                    <thead className="vpTable__Head">
                                        <tr className="vpTable__line vpheadLine">
                                            <th className="vpTable__lineStandard vphead">Standard</th>
                                            <th className="vpTable__lineGrade vphead">Grade</th>
                                            <th className="vpTable__lineRemarks vphead">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="vpTable__Body">
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Pharmacy Hygienic measures </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.pharmacyHygienicMeasures.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.pharmacyHygienicMeasures.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Counter Hygienic measures </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.counterHygienicMeasures.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.counterHygienicMeasures.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Pricing </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.pricing.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.pricing.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Temperature Registeration </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.temperatureRegistration.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.temperatureRegistration.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Merchandising </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.merchandizing.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.merchandizing.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Offers Display </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.offersDisplay.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.offersDisplay.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Official Documents Organized </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.officialDocumentsOrganized.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.officialDocumentsOrganized.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Availability Follow up </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.availabiltyFollowUp.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.availabiltyFollowUp.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Expiry/Slow-moving Follow Up </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.expiryFollowUp.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.expiryFollowUp.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Random Stock Take </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.randomStockTake.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.randomStockTake.remarks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="visitPage__standardsPharmacist">
                                <table className="vpTable">
                                    <thead className="vpTable__Head">
                                        <tr className="vpTable__line vpheadLine">
                                            <th className="vpTable__lineStandard vphead">Standard</th>
                                            <th className="vpTable__lineGrade vphead">Grade</th>
                                            <th className="vpTable__lineRemarks vphead">Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="vpTable__Body">
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Personal Hygienic measures </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.personalHygienicMeasures.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.personalHygienicMeasures.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Formal wear </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.formalWear.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.formalWear.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Data Awareness </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.dataAwareness.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.dataAwareness.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Communication Skills </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.communicationSkills.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.communicationSkills.remarks}</td>
                                        </tr>
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> Customer Service </td>
                                            <td className="vpTable__lineGrade vpBody">{visit.CustomerService.grade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.CustomerService.remarks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="vpTable vpTable__total">
                                    <thead className="vpTable__Head">
                                        <tr className="vpTable__line vpheadLine">
                                            <th className="vpTable__lineStandard vphead">Total</th>
                                            <th className="vpTable__lineRemarks vphead">General Remarks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="vpTable__Body">
                                        <tr className="vpTable__line  vpBodyLine">
                                            <td className="vpTable__lineStandard vpBody"> {totalGrade}</td>
                                            <td className="vpTable__lineRemarks vpBody">{visit.generalRemarks}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisitPage;
