import React, { Component } from 'react'

import SearchButton from '../../UI/SearchButton/SearchButton'
import classes from './ContentSection.module.css'
import Card from '../../UI/Card/Card'
import NoArticlesModal from '../../UI/NoArticlesModal/NoArticlesModal'
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage'

class ContentSection extends Component {
    state = {
        enteredArticleTitle: '',
        articleArray: [],
        showErrorMessage: false,
        errorMessageText: ''
    }

    componentDidMount() { 
        // const url = `https://gnews.io/api/v4/search?q=a&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        // fetch(url)
        // .then(response => response.json())
        // .then((jsonData) => {
        //         this.setState({ articleArray: [] })
        //         for(let i = 0; i < jsonData.articles.length; i++) {
        //             const article = {
        //                 id: i,
        //                 image: jsonData.articles[i].image,
        //                 title: jsonData.articles[i].title,
        //                 description: jsonData.articles[i].description,
        //                 publishedAt: jsonData.articles[i].publishedAt,
        //                 url: jsonData.articles[i].url
        //             }
        //             this.setState(state => ({
        //                 articleArray: [...state.articleArray, article]
        //             }))

        //     }
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }

    articleTitleChangedHandler = (event) => {
        this.setState({enteredArticleTitle: event.target.value})
    }

    checkValidation = () => {
        const spaceCount = this.state.enteredArticleTitle.split(' ').length - 1
        if(spaceCount > 5) {
            this.setState({
                showErrorMessage: true,
                errorMessageText: "Invalid input (max 40 spaces)"
            })
            return false
        }

        let regEx = /^[0-9a-zA-Z]+$/
        if(!this.state.enteredArticleTitle.match(regEx)) {
            this.setState({
                showErrorMessage: true,
                errorMessageText: "Please enter letters and numbers only"
            })
            return false
        }

        return true
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        if(this.checkValidation()) {
            const url = `https://gnews.io/api/v4/search?q=${this.state.enteredArticleTitle}&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
            fetch(url)
            .then(response => response.json())
            .then((jsonData) => {
                if(jsonData.articles.length === 0) {
                    this.setState({ 
                        articleArray: null, 
                        showErrorMessage: false
                    })
                } else {
                    this.setState({ 
                        articleArray: [],
                        showErrorMessage: false
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
            .catch(error => {
                console.log(error)
            })
        }
    }

    render () {
        let articles = this.state.articleArray ? (
            <div className={classes.ArticleContainer}>
                {this.state.articleArray.map((article) => (
                    <Card 
                        key={article.id}
                        image={article.image}
                        title={article.title}
                        description={article.description}
                        publishedAt={article.publishedAt}
                        url={article.url}
                    />
                ))}
            </div>
        ) : <NoArticlesModal />

        let invalidInputMessage = this.state.showErrorMessage ? <ErrorMessage message={this.state.errorMessageText}/> : null

        return (
            <>
                <div className={classes.SearchContainer}>
                    {invalidInputMessage}
                    <input 
                        className={this.state.showErrorMessage ? `${classes.Input} ${classes.ErrorInput}` : `${classes.Input}`} 
                        placeholder="Enter article title..." 
                        onChange={this.articleTitleChangedHandler}></input>
                </div>
                <div className={classes.ButtonContainer}>
                    <SearchButton onClicked={this.onSubmitHandler}>Search</SearchButton>
                </div>
                {articles}
            </>
        )
    }
}

export default ContentSection;