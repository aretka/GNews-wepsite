import React, { Component, useState } from 'react'

import SearchButton from '../../UI/SearchButton/SearchButton'
import classes from './ContentSection.module.css'
import Card from '../../UI/Card/Card'

class ContentSection extends Component {
    state = {
        enteredArticleTitle: '',
        articleArray: []
    }

    articleTitleChangedHandler = (event) => {
        this.setState({enteredArticleTitle: event.target.value})
    }

    onSubmitHandler = (event) => {
        event.preventDefault()

        const url = `https://gnews.io/api/v4/search?q=${this.state.enteredArticleTitle}%20iphone&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        fetch(url)
        .then(response => response.json())
        .then((jsonData) => {
            console.log(jsonData.articles)
            let numberOfArticles = 9
            this.setState({ articleArray: [] })
            for(let i = 0; i < numberOfArticles; i++) {
                const article = {
                    id: i,
                    image: jsonData.articles[i].image,
                    title: jsonData.articles[i].title,
                    description: jsonData.articles[i].description,
                    publishedAt: jsonData.articles[i].publishedAt
                }
                this.setState(state => ({
                    articleArray: [...state.articleArray, article]
                }))
            }
        })
    }

    

    render () {
        let articles = (
            <div className={classes.ArticleContainer}>
                {this.state.articleArray.map((article) => (
                    <Card 
                        key={article.id}
                        image={article.image} 
                        title={article.title}
                        description={article.description}
                        publishedAt={article.publishedAt}
                    />
                ))}
            </div>
        )
        return (
            
            <div>
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