import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Container, Row } from 'react-bootstrap'

import { ArticleContext } from '../../../articleContext/ArticleContext'
import './ContentSection.scss'
import Article from '../../UI/Card/Card'
import NoArticlesModal from '../../UI/NoArticlesModal/NoArticlesModal'

const ContentSection = () => {
    const {articleArray, showNoArticlesFound, setArticleArray} = useContext(ArticleContext)

    useEffect(() => {
        const url = `https://gnews.io/api/v4/search?q=a&token=96ee5b7acb258b56ea47bb823edd4f44&max=9`;
        const fetchFromApi = async () => {
            axios.get(url)
                .then(response => {
                    const jsonData = response.data;
                    console.log(jsonData)
                    for(let i = 0; i < jsonData.articles.length; i+-1) {
                        const article = {
                            id: i,
                            image: jsonData.articles[i].image,
                            title: jsonData.articles[i].title,
                            description: jsonData.articles[i].description,
                            publishedAt: jsonData.articles[i].publishedAt,
                            url: jsonData.articles[i].url
                        }
                        console.log("this is working")
                        setArticleArray(prevArticles => [...prevArticles, article])
                    }
                })
                .catch(() => {})
        }
        fetchFromApi()
    }, []) 

    const articles = articleArray ? (
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