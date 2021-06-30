import React, { Component } from 'react'

import classes from './Layout.module.css'
import Header from '../../components/MainSections/Header/Header'
import ContentSection from '../../components/MainSections/ContentSection/ContentSection'
import Footer from '../../components/MainSections/Footer/Footer'

class Layout extends Component {
    render () {
        return (
            <div>
                <Header />
                <ContentSection />
                <Footer />
            </div>
        )
    }
}

export default Layout;