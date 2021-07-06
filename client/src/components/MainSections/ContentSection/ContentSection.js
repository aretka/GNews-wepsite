import React, { Component } from 'react'
import axios from 'axios'
import { Container, Row, Col, Jumbotron, Button, Form } from 'react-bootstrap'

import './ContentSection.scss'
import Article from '../../UI/Card/Card'
import NoArticlesModal from '../../UI/NoArticlesModal/NoArticlesModal'
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage'

class ContentSection extends Component {
    state = {
        enteredArticleTitle: '',
        articleArray: [],
        showErrorMessage: false,
        errorMessageText: '',
        showNoArticlesFound: false
    }

    componentDidMount() { 
        const url = `https://gnews.io/api/v4/search?q=a&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        axios.get(url)
            .then(response => {
                const jsonData = response.data;
                this.setState({ articleArray: [] })
                for(let i = 0; i < jsonData.articles.length; i++) {
                    const article = {
                        id: i,
                        image: jsonData.articles[i].image,
                        title: jsonData.articles[i].title,
                        description: jsonData.articles[i].description,
                        publishedAt: jsonData.articles[i].publishedAt,
                        url: jsonData.articles[i].url
                    }
                    this.setState(state => ({
                        articleArray: [...state.articleArray, article]
                    }))
                }
            })
            .catch(error => console.error('There was an error', error))
    }

    articleTitleChangedHandler = (event) => {
        this.setState({enteredArticleTitle: event.target.value})
    }

    checkValidation = () => {
        if(this.state.enteredArticleTitle === '') {
            this.setState({
                showErrorMessage: true,
                showNoArticlesFound: true,
                errorMessageText: "Empty input"
            })
            return false
        }

        const spaceCount = this.state.enteredArticleTitle.split(' ').length - 1
        if(spaceCount > 40) {
            this.setState({
                showErrorMessage: true,
                showNoArticlesFound: true,
                errorMessageText: "Invalid input (max 40 spaces)",
            })
            return false
        }

        let regEx = /^[0-9a-zA-Z\s]+$/
        if(!this.state.enteredArticleTitle.match(regEx)) {
            this.setState({
                showErrorMessage: true,
                showNoArticlesFound: true,
                errorMessageText: "Please enter letters and numbers only",
            })
            return false
        }
        return true
    }

    sendPostOfSearchedKeywords = () => {
        const articleTitleInfo = {
            searchedKeywords: `${this.state.enteredArticleTitle}`
        }
        axios.post('http://localhost:9000/articles', JSON.stringify(articleTitleInfo))
            .then(() => console.log('Article title sent'))
            .catch(error => {})
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.sendPostOfSearchedKeywords()

        if(this.checkValidation()) {
            
            const url = `https://gnews.io/api/v4/search?q=${this.state.enteredArticleTitle}&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;

            axios.get(url)
                .then(response => {
                    const jsonData = response.data;
                    if(jsonData.articles.length === 0) {
                        this.setState({
                            showNoArticlesFound: true
                        })
                    } else {
                        this.setState({ 
                            articleArray: [],
                            showErrorMessage: false,
                            showNoArticlesFound: false
                        })
                        for(let i = 0; i < jsonData.articles.length; i++) {
                            const article = {
                                id: i,
                                image: jsonData.articles[i].image,
                                title: jsonData.articles[i].title,
                                description: jsonData.articles[i].description,
                                publishedAt: jsonData.articles[i].publishedAt,
                                url: jsonData.articles[i].url
                            }
                            this.setState(state => ({
                                articleArray: [...state.articleArray, article]
                            }))
                        }
                    }
                })
                .catch(error => console.error('There was an error', error))
        }
    }

    render () {
        let articles = this.state.articleArray ? (
            <Container>
                <Row>
                    {this.state.articleArray.map((article) => (
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

        let invalidInputMessage = this.state.showErrorMessage ? <ErrorMessage message={this.state.errorMessageText}/> : null

        return (
            <>
                <Jumbotron>
                    <Container>
                        <h1>GNews search engine</h1>
                        <p>
                            This is simple GNews search engine which prints up to 9 articles for searching title from GNews API.
                        </p>
                        {invalidInputMessage}
                        <Form onSubmit={this.onSubmitHandler}>
                            <Form.Group>
                                <Form.Control 
                                    type="text" 
                                    className={this.state.showErrorMessage ? `ErrorInput` : ``} 
                                    onChange={this.articleTitleChangedHandler}
                                    placeholder="Enter article title" />
                                <Form.Text className="text-muted">Please enter searching title</Form.Text>
                            </Form.Group>
                            <Row className="justify-content-sm-center">
                                <Col xs="3">
                                    <Button className='ButtonStyle' type="submit">Search</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Jumbotron>
                {this.state.showNoArticlesFound ? <NoArticlesModal message='No articles found'/> : null}
                {articles}
            </>
        )
    }
}

export default ContentSection;