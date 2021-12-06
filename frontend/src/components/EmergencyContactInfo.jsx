import React, { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Link, useHistory } from "react-router-dom";
import axios from "../store/axios";
import Cookies from "js-cookie";
import { setUser } from "../features/auth/authSlice";

function EmergencyContactInfo() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();

    const [emergencyActive, setEmergencyActive] = useState(true);
    const [addContactActive, setAddContactActive] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactRelation, setContactRelation] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const handleAddContact = (e) => {
        e.preventDefault();

        const contactDetails = { contactName, contactRelation, contactNo, contactEmail };
        const editedUser = JSON.parse(JSON.stringify(user));
        console.log(user);
        editedUser.contacts.push(contactDetails);
        console.log(editedUser);

        axios.post(`api/users/editUserDetails/${user._id}`, editedUser).then((response) => {
            const data = response.data;
            console.log(response);
            dispatch(setUser(data));
            Cookies.set("greensUserInfo", `${JSON.stringify(data)}`, { expires: 7, path: "/" });
            setAddContactActive(false)
        });
    };

    return (
        <div className="emergencyContactInfo">
            <div className="emergencyContactInfo__title">
                <div className="emergencyContactInfo__titleLeft">
                    <AddIcCallIcon color="inherit" />
                    <h3 className="emergencyContactInfo__titleText">Emergency Contact(s) Information</h3>
                </div>
                <div className="emergencyContactInfo__btnExpand">
                    <ExpandMoreIcon color="inherit" fontSize="large" onClick={() => setEmergencyActive(!emergencyActive)} />
                </div>
            </div>
            {emergencyActive ? (
                <div className="emergencyContactInfo__content">
                    <table className="emergencyContactInfo__contentTable">
                        <thead className="emergencyContactInfo__tHead">
                            <tr className="emergencyContactInfo__tr">
                                <td className="emergencyContactInfo__td eCHead">Contact Name</td>
                                <td className="emergencyContactInfo__td eCHead">Relation</td>
                                <td className="emergencyContactInfo__td eCHead">Contact No</td>
                                <td className="emergencyContactInfo__td eCHead">Email</td>
                            </tr>
                        </thead>
                        {user ? (
                            <tbody className="emergencyContactInfo__tBody">
                                {user.contacts.map((contact, index) => (
                                    <tr className="emergencyContactInfo__tr" key={index}>
                                        <td className="emergencyContactInfo__td">{contact.contactName}</td>
                                        <td className="emergencyContactInfo__td">{contact.contactRelation}</td>
                                        <td className="emergencyContactInfo__td">{contact.contactNo}</td>
                                        <td className="emergencyContactInfo__td">{contact.contactEmail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            ""
                        )}
                    </table>
                    {!addContactActive && (
                        <button className="wcfc__btnSubmit" onClick={() => setAddContactActive(!addContactActive)}>
                            Add a new Contact
                        </button>
                    )}
                    {addContactActive ? (
                        <div className="emergencyContactInfo__contentInputs">
                            <div className="emergencyContactInfo__Line">
                                <p className="emergencyContactInfo__title">Contact Name </p>
                                <input className="emergencyContactInfo__input" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                            </div>
                            <div className="emergencyContactInfo__Line">
                                <p className="emergencyContactInfo__title">Contact Relation </p>
                                <input className="emergencyContactInfo__input" value={contactRelation} onChange={(e) => setContactRelation(e.target.value)} />
                            </div>
                            <div className="emergencyContactInfo__Line">
                                <p className="emergencyContactInfo__title">Contact No </p>
                                <input className="emergencyContactInfo__input" value={contactNo} onChange={(e) => setContactNo(e.target.value)} />
                            </div>
                            <div className="emergencyContactInfo__Line">
                                <p className="emergencyContactInfo__title">Contact Email </p>
                                <input className="emergencyContactInfo__input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                            </div>
                            <button className="wcfc__btnSubmit" onClick={(e) => handleAddContact(e)}>
                                Add Contact
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default EmergencyContactInfo;
