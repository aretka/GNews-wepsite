import React from 'react'

import './ErrorMessage.scss'

const ErrorMessage = (props) => {
    return (
        <>
            <p className='ErrorStyle'>{props.message}</p>            
        </>
    )
}

export default ErrorMessage