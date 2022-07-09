import React from 'react'
import lodingImage from './Loading_icon.gif'

const Loading = () => {
    return (
        <div className='text-center'>
            <img src={lodingImage} alt="loading" />
        </div>
    )
}

export default Loading
