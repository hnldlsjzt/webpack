'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.css'
import './index.less'

class Search extends React.Component {
    render() {
        return <div className="search-text">我是search</div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)