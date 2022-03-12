import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../store/axios";

function VisitComponent({ visit }) {
    const [evaluatedPharmacistDetails, setevaluatedPharmacistDetails] = useState({});

    const getPharmacistDetails = () => {
        axios.get(`/api/users/${visit.evaluatedPharmacistId}`).then((response) => {
            setevaluatedPharmacistDetails(response.data);
        });
    };

    useEffect(() => {
        if (!evaluatedPharmacistDetails.shortestName) {
            getPharmacistDetails();
        }
    }, []);

    return (
        <div className="visitComponent">
            <Link to={`/visitPage/${visit._id}`} className="visitComponent__link link1">
                <span className="visitComponent__detail detail1"> {visit.evaluatedPharmacy}  </span>
            </Link>
            <Link to={`/visitPage/${visit._id}`} className="visitComponent__link link2">
                <span className="visitComponent__title">Ph/</span>
                <span className="visitComponent__detail detail2">{evaluatedPharmacistDetails.shortestName} </span>
            </Link>
            <Link to={`/visitPage/${visit._id}`} className="visitComponent__link link3">
                <span className="visitComponent__detail detail3"> {new Date(visit.createdAt).toLocaleDateString()} </span>
            </Link>
        </div>
    );
}

export default VisitComponent;
