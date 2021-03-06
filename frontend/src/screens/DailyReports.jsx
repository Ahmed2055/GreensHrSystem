import React from 'react'
import LocationHeader from '../components/LocationHeader'
import MainHeader from '../components/MainHeader'
import SecondHeader from '../components/SecondHeader'
import { useSelector, useDispatch } from "react-redux";
import {selectUser} from '../features/auth/authSlice';
import {useHistory} from 'react-router-dom'
import AddDailyReport from './AddDailyReport';

function DailyReports() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const history = useHistory();


    return (
        <div className='dailyReports'>
            <MainHeader />
            <SecondHeader />
            <LocationHeader  location='Daily Reports' />

            <AddDailyReport  />


        </div>
    )
}

export default DailyReports
