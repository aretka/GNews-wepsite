import React from 'react'

import './NoArticleModal.scss'

const NoArticlesModal = () => {
    return (
        <div className='Container'>
            <h3 className='NoArticleMessage'>No articles found with these keywords</h3>
        </div>
    )
}

export default NoArticlesModal;