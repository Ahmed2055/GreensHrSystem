import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "../store/axios";
import { Link, useHistory } from "react-router-dom";

function ShortageComponent(props) {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [shortagesReport, setShortagesReport] = useState(props.shortagesReport);
    const [shortageLikersActive, setShortageLikersActive] = useState(false);

    function checkLiked() {
        const shortageRegisterersNames = [];
        for (var i = 0; i < shortagesReport.shortageRegisterers.length; i++) {
            shortageRegisterersNames.push(shortagesReport.shortageRegisterers[i].name);
        }

        if (shortageRegisterersNames.includes(user.shortestName)) {
            return true;
        } else {
            return false;
        }
    }

    const handlePressingLike = () => {
        if (checkLiked()) {
            const updatedShortagesReport = JSON.parse(JSON.stringify(shortagesReport));
            const UpdatedShortageRegisterers = [];
            for (var i = 0; i < updatedShortagesReport.shortageRegisterers.length; i++) {
                if (updatedShortagesReport.shortageRegisterers[i].name != user.shortestName) {
                    UpdatedShortageRegisterers.push(updatedShortagesReport.shortageRegisterers[i]);
                }
            }
            updatedShortagesReport.shortageRegisterers = UpdatedShortageRegisterers;
            axios.post(`/api/trendingShortages/trendingShortageUpdate/${shortagesReport._id}`, updatedShortagesReport).then((response) => {
                console.log(response);
                setShortagesReport(updatedShortagesReport);
            });
        } else {
            const updatedShortagesReport = JSON.parse(JSON.stringify(shortagesReport));
            updatedShortagesReport.shortageRegisterers.push({ name: user.shortestName, phName: user.currentPharmacy, timeDone: new Date().toLocaleDateString() });

            console.log(updatedShortagesReport);
            axios.post(`/api/trendingShortages/trendingShortageUpdate/${shortagesReport._id}`, updatedShortagesReport).then((response) => {
                console.log(response);

                setShortagesReport(updatedShortagesReport);
            });
        }
    };

    return (
        <div className="shortageComponent">
            <div className="shortageDetails">
                <span className="shortageDetail">{shortagesReport.shortageUPC}</span>
                <span className="shortageDetail bold">{shortagesReport.shortageName}</span>
                <span className="shortageDetail">{shortagesReport.shortagePrice.toFixed(2)} SAR</span>
                <a href={`${shortagesReport.shortagePicLink}`} className="shortageDetail">
                    <img src={`${shortagesReport.shortagePicLink}`}  className="shortageDetail__Pic" />
                </a>
                <div className="shortageDetail shortageLikes" onClick={() => setShortageLikersActive(!shortageLikersActive)}>
                    <span className="bold smallMargin"> {shortagesReport.shortageRegisterers.length} </span> <ThumbUpIcon fontSize="small" />
                    {shortageLikersActive && shortagesReport.shortageRegisterers.length > 0 && (
                        <div className="shortageLikes__likersBox">
                            {shortagesReport.shortageRegisterers.map((registerer, index) => (
                                <span key={index} className="shortageLikes__liker">{registerer.name} - {registerer.phName}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="shortageLike blue" onClick={() => handlePressingLike()}>
                {checkLiked() ? <ThumbUpIcon fontSize="large" /> : <ThumbUpOutlinedIcon />}
            </div>
        </div>
    );
}

export default ShortageComponent;
