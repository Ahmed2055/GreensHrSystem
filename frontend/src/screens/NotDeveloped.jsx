import React from 'react'
import { Link , useHistory} from 'react-router-dom'

function NotDeveloped() {

    const history = useHistory();

    const goBackHome  = () =>{
        history.push('/home')
    }
    return (
        <div className="n">
            <div className='notDeveloped'>
                This page is still Under Development
                <button className="wcfc__btnSubmit" onClick={()=>goBackHome()}>Go Back to Home Page</button>
            </div>
            
        </div>
    )
}

export default NotDeveloped;
