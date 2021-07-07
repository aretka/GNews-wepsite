import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Row, Col, Jumbotron, Button, Form } from 'react-bootstrap'

import './ContentSection.scss'
import Article from '../../UI/Card/Card'
import NoArticlesModal from '../../UI/NoArticlesModal/NoArticlesModal'
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage'

const ContentSection = () => {
    const [enteredArticleTitle, setEnteredArticleTitle] = useState('')
    const [articleArray, setArticleArray] = useState([])
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState('')
    const [showNoArticlesFound, setShowNoArticleFound] = useState(false)

    useEffect(() => {
        const url = `https://gnews.io/api/v4/search?q=a&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        axios.get(url)
            .then(response => {
                const jsonData = response.data;
                for(let i = 0; i < jsonData.articles.length; i++) {
                    const article = {
                        id: i,
                        image: jsonData.articles[i].image,
                        title: jsonData.articles[i].title,
                        description: jsonData.articles[i].description,
                        publishedAt: jsonData.articles[i].publishedAt,
                        url: jsonData.articles[i].url
                    }
                    setArticleArray(prevArticles => [...prevArticles, article])
                }
            })
            .catch(error => console.error('There was an error', error))
    }, []) 

    const articleTitleChangedHandler = (event) => {
        setEnteredArticleTitle(event.target.value)
    }

    const checkValidation = () => {
        if(enteredArticleTitle.trim().length === 0) {
            setShowErrorMessage(true)
            setErrorMessageText('Empty input')
            setEnteredArticleTitle('')
            return false
        }

        const spaceCount = enteredArticleTitle.split(' ').length - 1
        if(spaceCount > 40) {
            setShowErrorMessage(true)
            setErrorMessageText('Invalid input (max 40 spaces)')
            setEnteredArticleTitle('')
            return false
        }

        let regEx = /^[0-9a-zA-Z\s]+$/
        if(!enteredArticleTitle.match(regEx)) {
            setShowErrorMessage(true)
            setErrorMessageText('Please enter letters and numbers only')
            setEnteredArticleTitle('')
            return false
        }
        return true
    }

    const sendPostOfSearchedKeywords = () => {
        const articleTitleInfo = {
            searchedKeywords: `${enteredArticleTitle}`
        }
        axios.post('http://localhost:9000/articles', JSON.stringify(articleTitleInfo))
            .then(() => console.log('Article title sent'))
            .catch(error => {})
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        sendPostOfSearchedKeywords()

        if(checkValidation()) {
            const url = `https://gnews.io/api/v4/search?q=${enteredArticleTitle}&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
            setEnteredArticleTitle('')

            axios.get(url)
                .then(response => {
                    const jsonData = response.data;
                    if(jsonData.articles.length === 0) {
                        setShowNoArticleFound(true)
                    } else {
                        setArticleArray([])
                        setShowErrorMessage(false)
                        setShowNoArticleFound(false)
                        for(let i = 0; i < jsonData.articles.length; i++) {
                            const article = {
                                id: i,
                                image: jsonData.articles[i].image,
                                title: jsonData.articles[i].title,
                                description: jsonData.articles[i].description,
                                publishedAt: jsonData.articles[i].publishedAt,
                                url: jsonData.articles[i].url
                            }
                            setArticleArray(prevArticles => [...prevArticles, article])
                        }
                    }
                })
                .catch(error => {
                    setShowNoArticleFound(true)
                    console.error('There was an error', error)
                })
        }
    }

    let articles = articleArray ? (
        <Container>
            <Row>
                {articleArray.map((article) => (
                    <Article 
                        key={article.id}
                        image={article.image}
                        title={article.title}
                        description={article.description}
                        publishedAt={article.publishedAt}
                        url={article.url}
                    />
                ))}
            </Row>
        </Container>
    ) : null

    let invalidInputMessage = showErrorMessage ? <ErrorMessage message={errorMessageText}/> : null

    return (
        <>
            <Jumbotron>
                <Container>
                    <h1>GNews search engine</h1>
                    <p>
                        This is simple GNews search engine which prints up to 9 articles for searching title from GNews API.
                    </p>
                    {invalidInputMessage}
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                className={showErrorMessage ? `ErrorInput` : ``} 
                                value={enteredArticleTitle}
                                onChange={articleTitleChangedHandler}
                                placeholder="Enter article title" />
                            <Form.Text className="text-muted">Please enter searching title</Form.Text>
                        </Form.Group>
                        <div className="Center">
                            <Button className='ButtonStyle' type="submit">Search</Button>
                        </div>
                    </Form>
                </Container>
            </Jumbotron>
            {showNoArticlesFound ? <NoArticlesModal message='No articles found'/> : null}
            {articles}
        </>
    )
};

export default ContentSection;