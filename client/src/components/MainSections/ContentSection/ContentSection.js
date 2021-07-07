import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ArticleContext } from '../../../articleContext/ArticleContext'
import { Container, Row } from 'react-bootstrap'

import './ContentSection.scss'
import Article from '../../UI/Card/Card'
import NoArticlesModal from '../../UI/NoArticlesModal/NoArticlesModal'

const ContentSection = () => {
    const {articleArray, showNoArticlesFound, setArticleArray} = useContext(ArticleContext)

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

    return (
        <>
            {showNoArticlesFound ? <NoArticlesModal message='No articles found'/> : null}
            {articles}
        </>
    )
};

export default React.memo(ContentSection);