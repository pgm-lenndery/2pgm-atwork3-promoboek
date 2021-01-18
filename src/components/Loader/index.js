import React from 'react';
import Loader from 'react-loader-spinner'

export default ({ size = 60 }) => {
    return (
        <Loader type="Oval" color="#7f47dd" height={ size } width={ size } className="react-loader d-flex align-items-center justify-content-center"/>
    )
}