import React from 'react'
import axios from 'axios'
import { Card, Col } from 'react-bootstrap'

import './Card.scss'

const Article = (props) => {
    const sendPostOfClickedArticle = async () => {
        const article = {
            title: props.title,
            description: props.description,
            publishedAt: props.publishedAt,
            imageURL: props.image,
            originalLink: props.url
        }
        axios.post('http://localhost:9000/articles', JSON.stringify(article))
            .then(() => console.log('Article title sent'))
            .catch(() => {})
    }
    
    return(
        <Col md={4} className='Card'>
            <a 
                className='LinkToOriginalSite' 
                rel="noopener noreferrer" 
                target="_blank" 
                href={props.url}
                onClick={sendPostOfClickedArticle}
            >
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