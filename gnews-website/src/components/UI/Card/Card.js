import React from 'react'
// import { Image } from 'react-native'

import classes from './Card.module.css'

const Card = (props) => {
    const articleClickedListener = () => {

    }

    return(
        <div className={classes.Card} onClick={articleClickedListener}>
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
        </div>
    )
}

export default Card;