import React from 'react'

import classes from './ErrorMessage.module.css'

const ErrorMessage = (props) => {
    return (
        <div className={classes.Container}>
            <p className={classes.ErrorStyle}>{props.message}</p>            
        </div>
    )
}

export default ErrorMessage