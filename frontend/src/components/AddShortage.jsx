import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import axios from "../store/axios";

function AddShortage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const [shortageUPC, setShortageUPC] = useState("");
    const [shortageName, setShortageName] = useState("");
    const [shortagePrice, setShortagePrice] = useState("");
    const [shortagePicLink, setShortagePicLink] = useState("");

    const addANewShortage = () => {
        const newShortage = {
            shortageUPC,
            shortageName,
            shortagePrice: parseFloat(shortagePrice),
            shortagePicLink,
            shortageRegisterers: {
                name: user.shortestName,
                phName: user.currentPharmacy,
                timeDone: new Date().toLocaleDateString(),
            },
        };
        console.log(newShortage);

        axios.post("/api/trendingShortages/addATrendingShortage", newShortage).then((response) => {
            console.log(response);
            if(response.status === 200){history.push('/')}
        });
    };

    return (
        <div className="addShortage">
            <div className="addShortage__Line">
                <p className="addShortage__title">Shortage UPC </p>
                <input className="addShortage__input" value={shortageUPC} onChange={(e) => setShortageUPC(e.target.value)} />
            </div>
            <div className="addShortage__Line">
                <p className="addShortage__title">Shortage Name </p>
                <input className="addShortage__input" value={shortageName} onChange={(e) => setShortageName(e.target.value)} />
            </div>
            <div className="addShortage__Line">
                <p className="addShortage__title">Shortage Price </p>
                <input className="addShortage__input" value={shortagePrice} onChange={(e) => setShortagePrice(e.target.value)} />
            </div>
            <div className="addShortage__Line">
                <p className="addShortage__title">Shortage Pic Link </p>
                <input className="addShortage__input" value={shortagePicLink} onChange={(e) => setShortagePicLink(e.target.value)} />
            </div>

            <button className="wcfc__btnSubmit addShortage__btn" onClick={(e) => addANewShortage()}>
                Add A Shortage
            </button>
        </div>
    );
}

export default AddShortage;
