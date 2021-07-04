import React from 'react'
import { Card, Col } from 'react-bootstrap'

import './Card.scss'

const Article = (props) => {
    return(
        <Col md={4} className='Card'>
            <a className='LinkToOriginalSite' rel="noopener noreferrer" target="_blank" href={props.url}>
                <Card>               
                    <Card.Body>
                        <Card.Img src={props.image}/>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text className='Text'>{props.description}</Card.Text>
                        <p>{props.publishedAt}</p>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    )
}

export default Article;