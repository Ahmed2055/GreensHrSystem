import React, { useState, useEffect } from "react";
import LocationHeader from "../components/LocationHeader";
import MainHeader from "../components/MainHeader";
import SecondHeader from "../components/SecondHeader";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ShortageComponent from "../components/ShortageComponent";
import AddShortage from "../components/AddShortage";
import axios from "../store/axios";

function TrendingShortages() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [shortagesReportsActive, setShortageReportsActive] = useState(true);
    const [addShortageActive, setAddShortageActive] = useState(true);
    const [shortagesReports, setShortagesReports] = useState([]);

    useEffect(() => {
        axios.get(`/api/trendingShortages/latest`).then((response) => {
            setShortagesReports(response.data);
        });
    }, []);

    return (
        <div className="trendingShortages">
            <MainHeader />
            <SecondHeader />
            <LocationHeader location="Trending Shortages" />

            {shortagesReports.length > 0 && (
                <div className="pageCentered__body">
                    <div className="whiteCenteredFlexibleContainer">
                        <div className="wcfc__titleDiv orange">
                            <div className="wcfc__title ">
                                <span className="material-icons">whatshot</span>
                                <h3 className="wcfc__titleText">Recent Trending Shortages</h3>
                            </div>
                            <div className="wcfc__btnExpand" onClick={() => setShortageReportsActive(!shortagesReportsActive)}>
                                <ExpandMoreIcon color="inherit" fontSize="large" />
                            </div>
                        </div>
                        {shortagesReportsActive && (
                            <div className="wcfc__bodyDiv">
                                <div className="addShortage__box">
                                    {addShortageActive && (
                                        <button className="wcfc__btnSubmit addShortage__btn" onClick={() => setAddShortageActive(!addShortageActive)}>
                                            Add A New Shortage
                                        </button>
                                    )}
                                    {!addShortageActive &&
                                    <AddShortage /> }
                                </div>
                                {shortagesReports.map((shortagesReport, index) => (
                                    <div key={index}>
                                        <ShortageComponent shortagesReport={shortagesReport} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <button onClick={() => console.log(shortagesReports)}>shortagesReports</button>
        </div>
    );
}

export default TrendingShortages;
