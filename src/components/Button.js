import React from 'react'

const Button = ({ color, onClick, text }) => {

    return (
        <div>
            <button className="btn" onClick={onClick} style={{backgroundColor: color}}>{text}</button>
        </div>
    )
}

Button.defaultProps = {
    color: "blue"
}

export default Button
