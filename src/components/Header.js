import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title, onAdd, showForm }) => {
    
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={showForm ? 'red' : 'green'} onClick={onAdd} text={showForm ? 'Close' : 'Add'}/>
        </header>
    )
}

Header.defaultProps = {
    title: "Title from Default props"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
