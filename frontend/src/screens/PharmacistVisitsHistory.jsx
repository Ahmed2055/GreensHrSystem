import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useHistory, useRouteMatch } from "react-router-dom";
import DashSecondHeader from "../components/DashSecondHeader";
import LocationHeader from "../components/LocationHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HistoryIcon from "@mui/icons-material/History";
import axios from "../store/axios";
import VisitComponent from "../components/VisitComponent";
import SecondHeader from "../components/SecondHeader";
import MainHeader from "../components/MainHeader";

function PharmacistVisitsHistory() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [visits, setVisits] = useState([])

    const getVisitsData = ()=>{
        axios.get(`/api/visits/userVisits/${user._id}`).then((response) => { setVisits(response.data);  console.log( 'allVisits', response.data); });

      }

      useEffect(() => {
        if(visits.length === 0 ){
            getVisitsData();
        }
      }, [])


    return (
        <div className="visitsHistory">
                    <MainHeader />
                    <SecondHeader />
                    <LocationHeader location="Pharmacist Previous Visits" />

            <div className="pageCentered__body">
                <div className="whiteCenteredFlexibleContainer">
                    <div className="wcfc__titleDiv ">
                        <div className="wcfc__title ">
                            <span className="material-icons">
                                <HistoryIcon />
                            </span>
                            <h3 className="wcfc__titleText" >My Previous Visits</h3>
                        </div>
                        <div className="wcfc__btnExpand">
                            <ExpandMoreIcon color="inherit" fontSize="large" />
                        </div>
                    </div>
                    <div className="wcfc__bodyDiv"> {visits.map((visit, index)=> <VisitComponent key={index} visit={visit} />)}  </div>
                </div>
            </div>
        </div>
    );
}

export default PharmacistVisitsHistory;