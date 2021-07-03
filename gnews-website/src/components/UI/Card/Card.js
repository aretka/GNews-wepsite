import React from 'react'

import classes from './Card.module.css'

const Card = (props) => {
    return(
        <div className={classes.Card}> 
            <a className={classes.Link} rel="noopener noreferrer" target="_blank" href={props.url}>
                <div className={classes.ImageContainer}>
                    <img  className={classes.Image} src={props.image}/>
                </div>
                <div className={classes.TitleContainer}>
                    <h3>{props.title}</h3>
                </div>
                <div className={classes.TextContainer}>
                    <p className={classes.Text}>{props.description}</p>
                </div>
                <div className={classes.TextContainer}>
                    <p className={classes.Published}>{props.publishedAt}</p>
                </div>
            </a>
        </div>
    )
}

export default Card;