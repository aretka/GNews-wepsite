import React, { useState } from 'react'

export const ArticleContext = React.createContext()

const ArticleProvider = (props) => {
    const [enteredArticleTitle, setEnteredArticleTitle] = useState('')
    const [articleArray, setArticleArray] = useState([])
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [errorMessageText, setErrorMessageText] = useState('')
    const [showNoArticlesFound, setShowNoArticleFound] = useState(false)

    return (
        <ArticleContext.Provider value={{
            enteredArticleTitle, setEnteredArticleTitle,
            articleArray, setArticleArray,
            showErrorMessage, setShowErrorMessage,
            errorMessageText, setErrorMessageText,
            showNoArticlesFound, setShowNoArticleFound}}
        >
            {props.children}
        </ArticleContext.Provider>
    )
}

export default ArticleProvider;