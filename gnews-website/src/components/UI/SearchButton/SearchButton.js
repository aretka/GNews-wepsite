import React from 'react'

import classes from './SearchButton.module.css'

const SearchButton = props => {
    return <button className={classes.button}>{props.children}</button>
}

export default SearchButton;