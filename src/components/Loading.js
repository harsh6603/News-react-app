import React from 'react'
import { Component } from 'react';
import lodingImage from './Loading_icon.gif'

export class Loading extends Component{
    render(){
        return(
            <div className='text-center'>
                <img src={lodingImage} alt="loading" />
            </div>
        )
    }
}