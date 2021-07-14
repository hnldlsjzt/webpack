'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.css'
import './index.less'
import { a } from './tree-shaking'
class Search extends React.Component {
    render() {
        const text = a()
        return <div className="search-text">{text}我是search,clean1</div>
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)