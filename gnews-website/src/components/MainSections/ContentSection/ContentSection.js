import React, { Component, useState } from 'react'

import SearchButton from '../../UI/SearchButton/SearchButton'
import classes from './ContentSection.module.css'
import Card from '../../UI/Card/Card'

class ContentSection extends Component {
    state = {
        enteredArticleTitle: '',
        articleArray: [],
        showErrorMessage: null
    }

    articleTitleChangedHandler = (event) => {
        this.setState({enteredArticleTitle: event.target.value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        const spaceCount = this.state.enteredArticleTitle.split(' ').length - 1

        if(spaceCount > 40) {

        }

        const url = `https://gnews.io/api/v4/search?q=${this.state.enteredArticleTitle}&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
            this.setState({ articleArray: [] })
            
            if(jsonData.articles.length == 0) {
                this.setState({ articleArray: null })
            } else {
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
        ) : (
            <div>
                <h1 className={classes.NotFoundTitle}>No articles found</h1>
            </div>
        )

        return (
            
            <div>
                {/* <div className={classes.SearchContainer}>

                </div> */}
                <div className={classes.SearchContainer}>
                    <input className={classes.Input} placeholder="Enter article title..." onChange={this.articleTitleChangedHandler}></input>
                </div>
                <div className={classes.SearchContainer}>
                    <SearchButton onClicked={this.onSubmitHandler}>Search</SearchButton>
                </div>
                {articles}
            </div>
        )
    }
}

export default ContentSection;