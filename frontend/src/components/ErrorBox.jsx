import React from 'react'
import ErrorIcon from "@mui/icons-material/Error";

function ErrorBox({errorMessage}) {
    return (
        <div className='errorBox'>
            <ErrorIcon className='red' />
            <p className='errorBox__message' > <span className='red  bold'>ERROR :</span> Network Error </p>
        </div>
    )
}

export default ErrorBox
